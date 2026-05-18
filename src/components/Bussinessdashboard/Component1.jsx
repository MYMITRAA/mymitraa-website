import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { QRCodeSVG } from 'qrcode.react';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  IndianRupee,
  Share2,
  FileText,
  Settings,
  Headphones,
  LogOut,
  Zap,
  TrendingUp,
  Plus,
  Clock,
  ShieldCheck,
  MessageSquare,
  Bell,
  ArrowUpRight,
  Award,
  Target,
  ExternalLink,
  Download,
  Search,
  MapPin,
  CheckCircle2,
  Package,
  Star,
  Briefcase,
  RefreshCcw,
  PieChart,
  CreditCard,
  Folder,
  Navigation,
  Mail,
  Shield,
  AlertOctagon,
  ChevronDown,
  UploadCloud,
  History,
  HelpCircle,
  PlayCircle,
  Code,
  PhoneCall,
  Calendar,
  Info,
  Wrench,
  BookOpen,
  LifeBuoy,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { REQUIRED_DOCS } from '../constants';

export const CertificatePreview = React.forwardRef(({ data, certId, verifiedDate }, ref) => (
  <div 
    ref={ref}
    className="relative w-full aspect-[1.414/1] bg-white rounded-[16px] shadow-2xl p-16 flex flex-col items-center justify-between overflow-hidden border-[16px] border-[#5B4BFF]/5"
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {/* Decorative Border */}
    <div className="absolute inset-0 border-[2px] border-[#5B4BFF]/20 m-4 rounded-[8px]"></div>
    
    {/* Background Watermark */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
       <ShieldCheck size={500} className="text-[#5B4BFF]" />
    </div>

    {/* Header */}
    <div className="relative z-10 flex flex-col items-center gap-6">
      <img src="/mitraa-logo-premium.png" alt="MiTRAA Logo" className="h-24 object-contain" />
      <h4 className="text-[12px] font-black text-[#5B4BFF] uppercase tracking-[0.4em] mt-4">Verified Business Partner</h4>
    </div>

    {/* Content */}
    <div className="relative z-10 text-center space-y-8">
      <h1 className="text-6xl font-black text-[#111827] tracking-tight">Certificate of Verification</h1>
      <p className="text-xl font-medium text-[#6B7280]">This officially certifies that</p>
      
      <div className="space-y-3">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#111827] to-[#5B4BFF]">{data.profile.businessName || "Your Enterprise"}</h2>
        <div className="h-1 w-40 bg-gradient-to-r from-[#5B4BFF] to-transparent mx-auto rounded-full"></div>
      </div>

      <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
        has successfully completed the comprehensive institutional verification process and is an authorized business partner of the MiTRAA Enterprise Platform.
      </p>
    </div>

    {/* Footer */}
    <div className="relative z-10 w-full flex justify-between items-end">
      <div className="space-y-2 text-left">
        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Certificate ID</p>
        <p className="text-sm font-bold text-[#111827] font-mono">{certId}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-[1px] bg-[#E4E7EC]"></div>
        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">MiTRAA Verification Team</p>
      </div>

      <div className="space-y-2 text-right">
        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Issued On</p>
        <p className="text-sm font-bold text-[#111827]">{verifiedDate}</p>
      </div>
    </div>
  </div>
));


export const EarningsSummaryCard = ({ label, value, growth, color, icon }) => (
  <div className="executive-card p-10 relative overflow-hidden group">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.15em]">{label}</p>
    </div>
    <h4 className="text-4xl font-bold text-[#1F1F2E] mb-2">{value}</h4>
    <p className="text-xs font-bold" style={{ color }}>{growth}</p>
  </div>
);


export const PayoutTableRow = ({ date, refId, amount, category, method, status }) => (
  <tr className="hover:bg-[#F9FAFB] transition-colors">
    <td className="text-sm font-semibold text-[#1F1F2E]">{date}</td>
    <td className="text-[10px] font-bold text-[#9CA3AF] tracking-widest uppercase">{refId}</td>
    <td className="text-lg font-bold text-[#1F1F2E]">{amount}</td>
    <td className="text-sm font-medium text-[#6B7280]">{category}</td>
    <td className="text-sm font-medium text-[#6B7280]">{method}</td>
    <td><span className={`status-pill ${status === 'PAID' ? 'status-paid' : 'status-pending'}`}>{status}</span></td>
    <td><button className="text-[#5B4BFF] hover:underline text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">View <ExternalLink size={12} /></button></td>
  </tr>
);


export const DocumentRow = ({ doc, uploadedFile, onUpload }) => {
  const fileInputRef = useRef();
  const isUploaded = !!uploadedFile;

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#F3F4F6] hover:border-[#5B4BFF]/30 hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
      <div className="flex items-center gap-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${isUploaded ? 'bg-[#ECFDF3] text-[#12B76A]' : 'bg-[#F9FAFB] text-[#9CA3AF]'}`}>
          <FileText size={28} />
        </div>
        <div>
          <h4 className="text-[17px] font-bold text-[#1F1F2E]">{doc.name}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">{doc.desc}</span>
            <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isUploaded ? 'text-[#12B76A]' : 'text-[#EF4444]'}`}>
              {isUploaded ? '✅ Uploaded' : '❌ Not Uploaded'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isUploaded && (
          <div className="text-right mr-4 hidden md:block">
            <p className="text-[11px] font-bold text-[#1F1F2E] truncate max-w-[150px]">{uploadedFile.name}</p>
            <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">{uploadedFile.size} • {uploadedFile.date}</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => onUpload(e.target.files, doc.id)}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className={`px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${isUploaded
            ? 'bg-[#F5F4FF] text-[#5B4BFF] hover:bg-[#5B4BFF] hover:text-white'
            : 'bg-[#5B4BFF] text-white shadow-lg shadow-[#5B4BFF]/20 hover:scale-105'
            }`}
        >
          {isUploaded ? 'Replace File' : 'Upload File'}
        </button>
      </div>
    </div>
  );
};


export const VaultSummaryCard = ({ label, value, color, hideValue }) => (
  <div className="bg-white p-8 rounded-[32px] border border-[#E5E7EB] shadow-sm">
    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.2em] mb-4">{label}</p>
    {hideValue ? (
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-[#22C55E] rounded-full"></div>
        <span className="text-xl font-bold text-[#1F1F2E]">{value}</span>
      </div>
    ) : (
      <h4 className="text-3xl font-bold text-[#1F1F2E]" style={{ color }}>{value}</h4>
    )}
  </div>
);


export const DocVaultCard = ({ name, sub, date, status, onView }) => (
  <div className="executive-card p-10 group flex flex-col">
    <div className="flex justify-between items-start mb-8">
      <div className="w-16 h-16 bg-[#F4F2FF] text-[#5B4BFF] rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-[#5B4BFF] group-hover:text-white transition-all duration-500">
        <FileText size={32} />
      </div>
      <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${status === 'Verified' ? 'bg-green-50 text-green-600 border-green-100' :
        status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
          'bg-red-50 text-red-600 border-red-100'
        }`}>
        {status}
      </span>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-bold text-[#1F1F2E] mb-1">{name}</h3>
      <p className="text-xs font-semibold text-[#6B7280] mb-4">{sub}</p>
      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Updated: {date}</p>
    </div>
    <div className="mt-auto pt-8 border-t border-[#F3F4F6] grid grid-cols-3 gap-3">
      <VaultActionBtn icon={<ExternalLink size={16} />} label="View" onClick={onView} />
      <VaultActionBtn icon={<IndianRupee size={16} />} label="Fetch" isDownload />
      <VaultActionBtn icon={<Plus size={16} />} label="New" />
    </div>
  </div>
);


export const VaultActionBtn = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group/btn">
    <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#9CA3AF] group-hover/btn:bg-[#F4F2FF] group-hover/btn:text-[#5B4BFF] transition-all">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase group-hover/btn:text-[#1F1F2E]">{label}</span>
  </button>
);


export const SecurityPill = ({ label }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
    <div className="w-2 h-2 bg-[#22C55E] rounded-full shadow-[0_0_10px_#22C55E]"></div>
    <span className="text-[11px] font-bold tracking-widest uppercase opacity-80">{label}</span>
  </div>
);


export const SettingsField = ({ label, name, value, onChange, type = "text", placeholder, disabled }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest ml-4">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full bg-[#F9FAFB] border-none p-5 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20 transition-all focus:bg-white ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
  </div>
);


export const SectionHeader = ({ title, sub }) => (
  <div className="space-y-4">
    <h2 className="text-5xl font-bold text-[#111827] tracking-tight">{title}</h2>
    <p className="text-xl text-[#667085] font-medium leading-relaxed">{sub}</p>
  </div>
);


export const MiniStatCard = ({ label, value, color }) => (
  <div className="bg-white p-10 rounded-[40px] border border-[#E4E7EC] shadow-2xl shadow-black/5 group hover:border-[#5B4BFF] transition-all">
    <p className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-[0.2em] mb-4">{label}</p>
    <h4 className="text-4xl font-bold tracking-tight" style={{ color }}>{value}</h4>
  </div>
);


export const LeadTableRow = ({ name, value, status, source }) => (
  <tr className="group hover:bg-[#F9FAFB] transition-all">
    <td className="py-8 font-bold text-[#111827] text-lg">{name}</td>
    <td className="py-8 font-bold text-[#111827] text-lg">{value}</td>
    <td className="py-8"><span className="bg-[#5B4BFF]/10 text-[#5B4BFF] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border border-[#5B4BFF]/10">{status}</span></td>
    <td className="py-8 font-medium text-[#667085] text-sm">{source}</td>
    <td className="py-8 text-right"><button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D0D5DD] hover:text-[#5B4BFF] shadow-sm hover:shadow-xl transition-all border border-[#F2F4F7] ml-auto"><ExternalLink size={18} /></button></td>
  </tr>
);


export const EnhancedClientCard = ({ name, contact, status, revenue, repeat, notes }) => (
  <div className="executive-card p-10 group flex flex-col h-full">
    <div className="flex justify-between items-start mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-[#F5F4FF] to-[#E0E7FF] rounded-2xl flex items-center justify-center text-[#5B4BFF] font-bold text-2xl group-hover:bg-gradient-to-br group-hover:from-[#5B4BFF] group-hover:to-[#8B7CFF] group-hover:text-white transition-all duration-500 shadow-sm">
        {name[0]}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="bg-[#5B4BFF]/10 text-[#5B4BFF] px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-[#5B4BFF]/20">{status}</span>
        {repeat && <span className="text-[9px] font-bold text-[#12B76A] uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> Repeat</span>}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-[#111827] mb-2">{name}</h3>
    <p className="text-[#667085] font-semibold text-sm mb-6">Contact: <span className="text-[#111827]">{contact}</span></p>

    <div className="bg-[#F9FAFB] p-5 rounded-xl border border-[#E5E7EB] mb-8 flex-1">
      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 flex items-center gap-2"><FileText size={12} /> Executive Notes</p>
      <p className="text-xs font-medium text-[#6B7280] leading-relaxed italic">{notes}</p>
    </div>

    <div className="pt-6 border-t border-[#F2F4F7] flex justify-between items-center mt-auto">
      <div>
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Lifetime Value</p>
        <p className="text-xl font-bold text-[#5B4BFF]">{revenue}</p>
      </div>
      <button className="w-12 h-12 rounded-xl bg-[#F5F4FF] text-[#5B4BFF] flex items-center justify-center hover:bg-[#5B4BFF] hover:text-white transition-all shadow-sm">
        <ArrowUpRight size={20} />
      </button>
    </div>
  </div>
);


export const EnhancedProjectRow = ({ name, client, progress, status, date, delivery, payment, feedback }) => (
  <div className="flex flex-col xl:flex-row items-center justify-between group gap-8 p-6 hover:bg-[#F9FAFB] rounded-3xl transition-all border border-transparent hover:border-[#E5E7EB]">
    <div className="flex items-center gap-6 min-w-[300px]">
      <div className="w-14 h-14 rounded-2xl bg-[#F5F4FF] text-[#5B4BFF] flex items-center justify-center shadow-sm group-hover:bg-[#5B4BFF] group-hover:text-white transition-colors">
        <ShoppingBag size={24} />
      </div>
      <div>
        <p className="text-lg font-bold text-[#111827]">{name}</p>
        <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mt-1">{client}</p>
      </div>
    </div>
    <div className="flex-1 w-full max-w-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-[0.2em]">Delivery Progress</span>
        <span className="text-[11px] font-bold text-[#111827]">{progress}%</span>
      </div>
      <div className="h-2 bg-[#F2F4F7] rounded-full overflow-hidden">
        <div className="h-full bg-[#5B4BFF] rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
    <div className="flex items-center gap-8 text-right min-w-[350px] justify-end">
      <div>
        <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Delivery Status</p>
        <p className={`text-xs font-bold ${delivery === 'Delivered' ? 'text-[#12B76A]' : 'text-[#F79009]'}`}>{delivery}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Payment Status</p>
        <p className={`text-xs font-bold ${payment === 'Paid' ? 'text-[#12B76A]' : payment === 'Advance Paid' ? 'text-[#5B4BFF]' : 'text-[#EF4444]'}`}>{payment}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Client Feedback</p>
        <p className="text-sm font-bold text-[#F59E0B] flex items-center gap-1 justify-end"><Star size={14} fill="currentColor" /> {feedback}</p>
      </div>
    </div>
  </div>
);


export const PipelineColumn = ({ title, status, count, color, onDropLead, children }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const leadId = e.dataTransfer.getData("leadId");
        if (leadId) onDropLead(Number(leadId), status);
      }}
      className={`flex flex-col rounded-[32px] p-6 border-2 transition-all duration-300 min-h-[650px] ${isOver ? 'bg-[#ECFDF3] border-[#12B76A] shadow-2xl scale-[1.02]' : 'bg-[#F9FAFB] border-[#E4E7EC]'
        } hover:border-[#5B4BFF]/30 hover:shadow-xl cursor-default`}
    >
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
          <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest">{title}</h3>
        </div>
        <span className="bg-white px-4 py-1.5 rounded-xl text-xs font-black shadow-sm text-[#5B4BFF] border border-[#F3F4F6]">{count}</span>
      </div>
      <div className="flex flex-col gap-5">
        {children}
        {count === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
            <Plus size={32} className="text-[#9CA3AF] mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Drop Leads Here</p>
          </div>
        )}
      </div>
    </div>
  );
};


export const PipelineCard = ({ lead, onMove }) => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const statusOptions = [
    { label: 'New Lead', value: 'NEW' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Converted', value: 'CONVERTED' },
    { label: 'Rejected', value: 'REJECTED' }
  ];

  return (
    <div className="relative group">
      <motion.div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("leadId", lead.id);
          e.dataTransfer.effectAllowed = "move";
        }}
        onClick={() => setShowQuickMenu(!showQuickMenu)}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white p-6 rounded-[24px] border-2 border-[#E4E7EC] shadow-sm hover:shadow-2xl hover:border-[#5B4BFF] transition-all cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between items-start mb-5">
          <h4 className="text-[15px] font-black text-[#111827] group-hover:text-[#5B4BFF] transition-colors">{lead.name}</h4>
          <span className="text-[13px] font-black text-[#12B76A] bg-[#ECFDF3] px-3 py-1 rounded-lg shadow-sm">{lead.value}</span>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2">
            <Share2 size={12} strokeWidth={3} /> {lead.source || "Direct"}
          </p>

          <div className="flex items-center justify-between pt-5 border-t border-[#F3F4F6]">
            <div className="flex items-center gap-2 text-[9px] font-black text-[#F79009] uppercase tracking-widest bg-[#F79009]/10 px-3 py-2 rounded-xl border border-[#F79009]/10">
              <Clock size={12} strokeWidth={3} /> {lead.followUp || "TBD"}
            </div>
            <span className="text-[10px] font-bold text-[#9CA3AF] italic">{lead.time}</span>
          </div>
        </div>
      </motion.div>

      {/* Manual Status Quick Menu */}
      <AnimatePresence>
        {showQuickMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#111827] rounded-2xl shadow-2xl p-3 z-[110] border border-white/10 backdrop-blur-xl"
          >
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-3 ml-2">Move to Stage</p>
            <div className="space-y-1">
              {statusOptions.filter(o => o.value !== lead.status).map(opt => (
                <button
                  key={opt.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMove(lead.id, opt.value);
                    setShowQuickMenu(false);
                  }}
                  className="w-full text-left py-3 px-4 rounded-xl text-[11px] font-black text-white hover:bg-[#5B4BFF] transition-all uppercase tracking-widest"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const FinanceCard = ({ label, value, sub, color }) => (
  <div className="bg-white p-12 rounded-[50px] border border-[#E4E7EC] shadow-2xl shadow-black/5 relative overflow-hidden group hover:border-[#5B4BFF] transition-all">
    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-150 transition-all duration-700"><IndianRupee size={120} /></div>
    <p className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-[0.2em] mb-6">{label}</p>
    <h4 className="text-5xl font-bold tracking-tight mb-4" style={{ color }}>{value}</h4>
    <p className="text-sm font-medium text-[#667085]">{sub}</p>
  </div>
);


export const PayoutRow = ({ date, amount, method, status }) => (
  <div className="flex items-center justify-between p-8 rounded-[32px] border border-[#F2F4F7] hover:bg-[#F9FAFB] transition-all group">
    <div className="flex items-center gap-8">
      <div className="w-14 h-14 bg-[#F5F4FF] rounded-2xl flex items-center justify-center text-[#5B4BFF] group-hover:bg-[#5B4BFF] group-hover:text-white transition-all"><IndianRupee size={24} /></div>
      <div>
        <p className="text-lg font-bold text-[#111827]">{amount}</p>
        <p className="text-sm font-medium text-[#667085]">{date}</p>
      </div>
    </div>
    <div className="flex items-center gap-12 text-right">
      <div>
        <p className="text-xs font-bold text-[#111827] uppercase tracking-[0.1em]">{method}</p>
        <p className="text-[10px] font-bold text-[#12B76A]">{status}</p>
      </div>
      <button className="w-10 h-10 rounded-xl flex items-center justify-center text-[#D0D5DD] hover:text-[#5B4BFF]"><ArrowUpRight size={20} /></button>
    </div>
  </div>
);


export const DocCard = ({ title, date, type }) => (
  <div className="bg-white p-10 rounded-[50px] border border-[#E4E7EC] shadow-2xl shadow-black/5 hover:border-[#5B4BFF] transition-all group text-center flex flex-col items-center">
    <div className="w-20 h-20 bg-[#F5F4FF] rounded-3xl flex items-center justify-center text-[#5B4BFF] mb-8 group-hover:scale-110 transition-all shadow-xl"><FileText size={32} /></div>
    <h3 className="text-xl font-bold text-[#111827] mb-2">{title}</h3>
    <p className="text-sm font-medium text-[#667085] mb-8">{date}</p>
    <button className="w-full py-4 bg-[#F5F4FF] text-[#5B4BFF] rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#5B4BFF] hover:text-white transition-all">DOWNLOAD {type}</button>
  </div>
);


export const SupportCard = ({ icon, title, desc }) => (
  <div className="bg-white p-12 rounded-[50px] border border-[#E4E7EC] shadow-2xl shadow-black/5 hover:border-[#5B4BFF] transition-all group flex flex-col items-center text-center">
    <div className="w-20 h-20 bg-[#F5F4FF] text-[#5B4BFF] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#5B4BFF] group-hover:text-white transition-all shadow-xl">{React.cloneElement(icon, { size: 32 })}</div>
    <h3 className="text-2xl font-bold text-[#111827] mb-3">{title}</h3>
    <p className="text-sm font-medium text-[#667085] leading-relaxed">{desc}</p>
  </div>
);