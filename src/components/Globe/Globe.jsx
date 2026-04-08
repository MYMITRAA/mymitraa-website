import React, { useEffect, useRef, useCallback } from "react";
import "./Globe.css";

/* ─────────────────────────────────────────────────────────────────
   GLSL  —  GLOBE SPHERE
───────────────────────────────────────────────────────────────────*/
const GLOBE_VS = `
  attribute vec3 aPos;
  attribute vec2 aUV;
  uniform   mat4 uMVP;
  varying   vec2 vUV;
  varying   vec3 vNorm;
  void main(){
    vUV = aUV;
    vNorm = normalize(aPos);
    gl_Position = uMVP * vec4(aPos, 1.0);
  }
`;
const GLOBE_FS = `
  precision highp float;
  varying vec2 vUV;
  varying vec3 vNorm;
  uniform float     uTime;
  uniform sampler2D uLand;
  void main(){
    float isLand = texture2D(uLand, vUV).r;
    vec3  light  = normalize(vec3(1.2, 0.8, 1.5));
    float diff   = dot(vNorm, light) * 0.5 + 0.5;
    vec3  ocean  = mix(vec3(0.01,0.05,0.20), vec3(0.04,0.15,0.45), diff);
    vec3  cont   = mix(vec3(0.04,0.12,0.34), vec3(0.10,0.30,0.68), diff);
    vec3  col    = mix(ocean, cont, isLand);
    float latG   = abs(fract(vUV.y * 12.0) - 0.5);
    float lonG   = abs(fract((vUV.x + uTime * 0.000018) * 24.0) - 0.5);
    float grid   = 1.0 - smoothstep(0.0, 0.04, min(latG, lonG));
    col += vec3(0.0, 0.55, 0.95) * grid * 0.14;
    float rim    = pow(1.0 - max(dot(vNorm, vec3(0,0,1)), 0.0), 3.2);
    col += vec3(0.0, 0.85, 1.0) * rim * 0.75;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ─────────────────────────────────────────────────────────────────
   GLSL  —  NETWORK EDGES / TRIANGLES / POINTS
───────────────────────────────────────────────────────────────────*/
const LINE_VS = `
  attribute vec3 aPos;
  uniform   mat4 uMVP;
  void main(){
    gl_Position  = uMVP * vec4(aPos, 1.0);
    gl_PointSize = 6.0;
  }
`;
const LINE_FS = `
  precision mediump float;
  uniform vec4 uColor;
  void main(){ gl_FragColor = uColor; }
`;
const PT_FS = `
  precision mediump float;
  uniform vec4 uColor;
  void main(){
    vec2  c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor.rgb, uColor.a * (1.0 - smoothstep(0.0, 0.5, d)));
  }
`;

/* ─────────────────────────────────────────────────────────────────
   NETWORK NODE POSITIONS
───────────────────────────────────────────────────────────────────*/
const NODES_LL = [
  [40.71,-74],[51.51,-0.13],[48.86,2.35],[35.68,139.69],[22.32,114.17],
  [1.35,103.82],[19.08,72.88],[28.61,77.21],[-33.87,151.21],[55.76,37.62],
  [-23.55,-46.63],[31.23,121.47],[25.20,55.27],[52.52,13.40],[37.57,126.98],
  [13.75,100.52],[30.06,31.25],[37.77,-122.42],[-34.61,-58.38],[41.9,12.5],
  [60,25],[65,15],[55,10],[45,2],[50,30],[35,35],[20,78],[5,80],
  [-25,25],[-10,20],[10,8],[20,-10],[30,-5],[45,-5],[50,50],[60,60],
  [-30,150],[-15,130],[25,110],[15,105],[-5,35],[10,38],[20,55],
];

function ll2v(lat, lon, r = 1.018) {
  const phi   = (90 - lat)  * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ];
}

/* ─────────────────────────────────────────────────────────────────
   GL UTILITIES
───────────────────────────────────────────────────────────────────*/
function mkShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s); return s;
}
function mkProg(gl, vs, fs) {
  const p = gl.createProgram();
  gl.attachShader(p, mkShader(gl, gl.VERTEX_SHADER,   vs));
  gl.attachShader(p, mkShader(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p); return p;
}
function uploadBuf(gl, flat) {
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(flat), gl.STATIC_DRAW);
  return b;
}

/* ─────────────────────────────────────────────────────────────────
   SPHERE GEOMETRY
───────────────────────────────────────────────────────────────────*/
function buildSphere(R, segs) {
  const pos = [], uv = [], idx = [];
  for (let la = 0; la <= segs; la++) {
    const th = la * Math.PI / segs;
    for (let lo = 0; lo <= segs; lo++) {
      const ph = lo * 2 * Math.PI / segs;
      pos.push(-R*Math.sin(th)*Math.cos(ph), R*Math.cos(th), R*Math.sin(th)*Math.sin(ph));
      uv.push(lo / segs, la / segs);
    }
  }
  for (let la = 0; la < segs; la++) {
    for (let lo = 0; lo < segs; lo++) {
      const a = la*(segs+1)+lo, b = a+segs+1;
      idx.push(a,b,a+1, b,b+1,a+1);
    }
  }
  return { pos: new Float32Array(pos), uv: new Float32Array(uv), idx: new Uint16Array(idx) };
}

/* ─────────────────────────────────────────────────────────────────
   LAND TEXTURE  (procedural canvas → WebGL)
───────────────────────────────────────────────────────────────────*/
function makeLandTex(gl) {
  const TW=1024, TH=512;
  const cv=document.createElement("canvas"); cv.width=TW; cv.height=TH;
  const c=cv.getContext("2d");
  c.fillStyle="#000"; c.fillRect(0,0,TW,TH);
  c.fillStyle="#fff";
  const S=(lon,lat)=>[(lon+180)/360*TW,(90-lat)/180*TH];
  const poly=(pts)=>{
    c.beginPath();
    pts.forEach(([lon,lat],i)=>{ const [px,py]=S(lon,lat); i===0?c.moveTo(px,py):c.lineTo(px,py); });
    c.closePath(); c.fill();
  };
  poly([[-140,70],[-60,70],[-55,47],[-80,45],[-75,25],[-90,20],[-115,30],[-125,50],[-140,60]]);
  poly([[-85,10],[-77,8],[-75,10],[-83,15],[-90,16],[-88,12]]);
  poly([[-75,83],[-20,83],[-18,72],[-25,68],[-45,60],[-65,62],[-70,70]]);
  poly([[-80,12],[-62,12],[-50,3],[-35,-8],[-35,-25],[-52,-33],[-65,-55],[-68,-55],[-75,-42],[-80,-28],[-78,-10],[-78,0]]);
  poly([[0,60],[-10,36],[15,36],[30,46],[30,60],[20,65],[10,58],[0,60]]);
  poly([[15,65],[30,72],[28,60],[22,57],[15,65]]);
  poly([[-8,62],[0,58],[-5,55],[-10,54],[-8,62]]);
  poly([[-18,15],[52,15],[52,-10],[42,-12],[30,0],[10,-5],[-18,0]]);
  poly([[30,-10],[40,-12],[35,-20],[28,-35],[17,-35],[12,-22],[25,-5],[30,-10]]);
  poly([[30,72],[180,72],[180,20],[120,10],[100,5],[75,8],[60,20],[50,25],[40,38],[30,46],[30,72]]);
  poly([[65,22],[90,22],[80,8],[70,8],[65,22]]);
  poly([[130,46],[145,44],[140,33],[130,33],[130,46]]);
  poly([[95,28],[110,15],[108,0],[98,3],[90,20],[95,28]]);
  poly([[100,5],[108,0],[106,-6],[102,0],[100,5]]);
  poly([[115,-20],[155,-20],[152,-38],[140,-38],[130,-32],[115,-28],[115,-20]]);
  poly([[-5,50],[2,51],[1,58],[-2,59],[-5,57],[-4,52],[-5,50]]);
  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,cv);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  return tex;
}

/* ─────────────────────────────────────────────────────────────────
   MATRIX HELPERS
───────────────────────────────────────────────────────────────────*/
const m4=()=>new Float32Array(16);
const ident=(m)=>{m.fill(0);m[0]=m[5]=m[10]=m[15]=1;return m;};
const rotY=(m,a)=>{const c=Math.cos(a),s=Math.sin(a);ident(m);m[0]=c;m[2]=s;m[8]=-s;m[10]=c;return m;};
const persp=(m,fov,asp,n,f)=>{
  const t=1/Math.tan(fov/2);ident(m);m[0]=t/asp;m[5]=t;
  m[10]=(f+n)/(n-f);m[11]=-1;m[14]=2*f*n/(n-f);m[15]=0;return m;
};
const transl=(m,x,y,z)=>{ident(m);m[12]=x;m[13]=y;m[14]=z;return m;};
const mul=(o,a,b)=>{
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){
    o[i*4+j]=0;for(let k=0;k<4;k++)o[i*4+j]+=a[i*4+k]*b[k*4+j];
  }return o;
};

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────*/
export default function Globe() {
  const mountRef = useRef(null);
  const ovRef    = useRef(null);
  const s        = useRef({ frameId:null, rot:0, vel:0, drag:false, lastX:0, time:0 });

  const cleanup = useCallback(() => {
    if (s.current.frameId) cancelAnimationFrame(s.current.frameId);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const ov    = ovRef.current;
    if (!mount || !ov) return;
    const st = s.current;

    const W = mount.clientWidth  || 480;
    const H = mount.clientHeight || 480;

    /* WebGL canvas */
    const gc = document.createElement("canvas");
    gc.width=W; gc.height=H;
    gc.style.cssText="position:absolute;inset:0;width:100%;height:100%;border-radius:50%;";
    mount.appendChild(gc);
    const gl = gc.getContext("webgl") || gc.getContext("experimental-webgl");
    if (!gl) return;

    /* Programs */
    const gProg = mkProg(gl, GLOBE_VS, GLOBE_FS);
    const lProg = mkProg(gl, LINE_VS, LINE_FS);
    const pProg = mkProg(gl, LINE_VS, PT_FS);

    /* Sphere */
    const sp = buildSphere(1.0, 64);
    const pBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,pBuf);
    gl.bufferData(gl.ARRAY_BUFFER,sp.pos,gl.STATIC_DRAW);
    const uBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,uBuf);
    gl.bufferData(gl.ARRAY_BUFFER,sp.uv,gl.STATIC_DRAW);
    const iBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,sp.idx,gl.STATIC_DRAW);

    /* Land texture */
    const lTex = makeLandTex(gl);

    /* Network */
    const NODES = NODES_LL.map(([la,lo])=>ll2v(la,lo));
    const EDGES=[],TRIS=[];
    for(let i=0;i<NODES.length;i++){
      for(let j=i+1;j<NODES.length;j++){
        const a=NODES[i],b=NODES[j];
        const d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
        if(d>0.82&&d<0.99){
          EDGES.push(i,j);
          for(let k=j+1;k<NODES.length;k++){
            const c=NODES[k];
            const dac=a[0]*c[0]+a[1]*c[1]+a[2]*c[2];
            const dbc=b[0]*c[0]+b[1]*c[1]+b[2]*c[2];
            if(dac>0.85&&dac<0.99&&dbc>0.85&&dbc<0.99)TRIS.push(i,j,k);
          }
        }
      }
    }
    const nBuf=uploadBuf(gl,NODES.flat());
    const ePts=EDGES.map(i=>NODES[i]).flat();
    const eBuf=uploadBuf(gl,ePts);
    const tPts=TRIS.map(i=>NODES[i]).flat();
    const tBuf=uploadBuf(gl,tPts);

    /* Matrices */
    const proj=m4(),view=m4(),model=m4(),mvp=m4(),tmp=m4();

    /* 2-D overlay */
    const oc=ov.getContext("2d");
    const drawAtmo=(cx,cy,r)=>{
      const g=oc.createRadialGradient(cx,cy,r*0.88,cx,cy,r*1.14);
      g.addColorStop(0,"rgba(0,200,255,0)");
      g.addColorStop(0.50,"rgba(0,200,255,0.15)");
      g.addColorStop(0.82,"rgba(0,220,255,0.48)");
      g.addColorStop(1,"rgba(0,150,200,0)");
      oc.clearRect(0,0,ov.width,ov.height);
      oc.beginPath();oc.arc(cx,cy,r*1.14,0,Math.PI*2);
      oc.fillStyle=g;oc.fill();
    };

    /* Resize */
    const onResize=()=>{
      const w=mount.clientWidth,h=mount.clientHeight;
      gc.width=w;gc.height=h;
      ov.width=w;ov.height=h;
      gl.viewport(0,0,w,h);
    };
    window.addEventListener("resize",onResize);

    /* Drag */
    const dStart=(x)=>{st.drag=true;st.lastX=x;};
    const dMove=(x)=>{if(!st.drag)return;st.vel=(x-st.lastX)*0.012;st.lastX=x;};
    const dEnd=()=>{st.drag=false;};
    mount.addEventListener("mousedown",(e)=>dStart(e.clientX));
    window.addEventListener("mousemove",(e)=>dMove(e.clientX));
    window.addEventListener("mouseup",dEnd);
    mount.addEventListener("touchstart",(e)=>dStart(e.touches[0].clientX),{passive:true});
    mount.addEventListener("touchmove",(e)=>dMove(e.touches[0].clientX),{passive:true});
    mount.addEventListener("touchend",dEnd);

    /* Render */
    const tick=()=>{
      st.frameId=requestAnimationFrame(tick);
      st.time+=0.016;
      if(!st.drag){st.rot+=0.004+st.vel;st.vel*=0.92;}else st.rot+=st.vel;

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

      persp(proj,0.72,gc.width/gc.height,0.1,20);
      transl(view,0,0,-2.55);
      rotY(model,st.rot);
      mul(tmp,view,model);mul(mvp,proj,tmp);

      /* globe */
      gl.useProgram(gProg);
      gl.uniformMatrix4fv(gl.getUniformLocation(gProg,"uMVP"),false,mvp);
      gl.uniform1f(gl.getUniformLocation(gProg,"uTime"),st.time*60);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D,lTex);
      gl.uniform1i(gl.getUniformLocation(gProg,"uLand"),0);
      gl.bindBuffer(gl.ARRAY_BUFFER,pBuf);
      const aP=gl.getAttribLocation(gProg,"aPos");
      gl.enableVertexAttribArray(aP);gl.vertexAttribPointer(aP,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,uBuf);
      const aU=gl.getAttribLocation(gProg,"aUV");
      gl.enableVertexAttribArray(aU);gl.vertexAttribPointer(aU,2,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuf);
      gl.drawElements(gl.TRIANGLES,sp.idx.length,gl.UNSIGNED_SHORT,0);

      /* tris */
      gl.useProgram(lProg);
      gl.uniformMatrix4fv(gl.getUniformLocation(lProg,"uMVP"),false,mvp);
      gl.bindBuffer(gl.ARRAY_BUFFER,tBuf);
      const aL=gl.getAttribLocation(lProg,"aPos");
      gl.enableVertexAttribArray(aL);gl.vertexAttribPointer(aL,3,gl.FLOAT,false,0,0);
      gl.uniform4f(gl.getUniformLocation(lProg,"uColor"),0.0,0.7,1.0,0.055);
      gl.drawArrays(gl.TRIANGLES,0,tPts.length/3);

      /* edges */
      gl.bindBuffer(gl.ARRAY_BUFFER,eBuf);
      gl.vertexAttribPointer(aL,3,gl.FLOAT,false,0,0);
      const pulse=0.5+0.5*Math.sin(st.time*1.4);
      gl.uniform4f(gl.getUniformLocation(lProg,"uColor"),0.55,0.92,1.0,0.35+0.10*pulse);
      gl.drawArrays(gl.LINES,0,ePts.length/3);

      /* points */
      gl.useProgram(pProg);
      gl.uniformMatrix4fv(gl.getUniformLocation(pProg,"uMVP"),false,mvp);
      gl.bindBuffer(gl.ARRAY_BUFFER,nBuf);
      const aPt=gl.getAttribLocation(pProg,"aPos");
      gl.enableVertexAttribArray(aPt);gl.vertexAttribPointer(aPt,3,gl.FLOAT,false,0,0);
      gl.uniform4f(gl.getUniformLocation(pProg,"uColor"),0.0,1.0,1.0,0.92);
      gl.drawArrays(gl.POINTS,0,NODES.length);

      /* atmosphere overlay */
      const bcr=gc.getBoundingClientRect();
      drawAtmo(bcr.left+bcr.width/2, bcr.top+bcr.height/2, bcr.width/2);
    };
    tick();

    return ()=>{
      cleanup();
      window.removeEventListener("resize",onResize);
      window.removeEventListener("mousemove",(e)=>dMove(e.clientX));
      window.removeEventListener("mouseup",dEnd);
      try{if(mount.contains(gc))mount.removeChild(gc);}catch(e){}
    };
  },[cleanup]);

  return (
    <div className="globe-root">
      <div className="globe-ring globe-ring-1"/>
      <div className="globe-ring globe-ring-2"/>
      <div className="globe-ring globe-ring-3"/>

      <div ref={mountRef} className="globe-canvas-mount" style={{cursor:"grab",position:"relative"}}/>
      <canvas ref={ovRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:"50%",pointerEvents:"none",zIndex:3}}/>

      <div className="globe-card globe-card-tr">
        <span className="gcd gcd-cyan"/><span className="gc-label">12 global nodes</span>
      </div>
      <div className="globe-card globe-card-mr">
        <span className="gcd gcd-green"/><span className="gc-label">Real-time sync</span>
      </div>
      <div className="globe-card globe-card-bl">
        <span className="gcd gcd-purple"/><span className="gc-label">AI active</span>
      </div>

      <div className="globe-platform"/>
      <div className="globe-platform-core"/>
    </div>
  );
}
