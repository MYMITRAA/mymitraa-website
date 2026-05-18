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
import { CertificatePreview, EarningsSummaryCard, PayoutTableRow, DocumentRow, VaultSummaryCard, DocVaultCard, VaultActionBtn, SecurityPill, SettingsField, SectionHeader, MiniStatCard, LeadTableRow, EnhancedClientCard, EnhancedProjectRow, PipelineColumn, PipelineCard, FinanceCard, PayoutRow, DocCard, SupportCard, AIFeature, NavLink, PremiumMiniStatusCard, SidebarItem, GlassWidget, PremiumStatCard, QuickActionCard, AlertRow, ResourceCard, SupportBadge, SupportQuickCard, TicketRow, HistoryTimelineItem, KBCard, PremiumLeadRow, LuxuryActionCard, AchievementBlock, PowerBar, IconButton, CustomDropdown, ProgressStatus, SettingsCard, SettingsTab } from '../Components';
import { DocumentPreviewModal, LeadModal, ClientModal, OrderModal, MapPickerModal } from '../Modals';

export const CertificateSection = ({ data }) => {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const certId = `MIT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  const verifiedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`MiTRAA-Verification-Certificate-${data.profile.businessName || 'Partner'}.pdf`);
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12">
      <SectionHeader title="Official Verification" sub="Download and share your institutional partnership credentials" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 overflow-x-auto p-4 bg-[#F9FAFB] rounded-[32px] border border-[#F3F4F6]">
           <div className="min-w-[800px]">
             <CertificatePreview ref={certificateRef} data={data} certId={certId} verifiedDate={verifiedDate} />
           </div>
        </div>
        
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[40px] p-10 border border-[#F3F4F6] shadow-xl space-y-8">
             <div className="flex items-center gap-5">
               <div className="w-16 h-16 bg-[#ECFDF3] rounded-2xl flex items-center justify-center text-[#12B76A]">
                 <ShieldCheck size={32} />
               </div>
               <div className="text-left">
                 <h4 className="text-xl font-bold text-[#111827]">Partner Verified</h4>
                 <p className="text-sm font-medium text-[#6B7280]">Credential ID: {certId}</p>
               </div>
             </div>

             <div className="space-y-4">
               <button 
                 onClick={handleDownload}
                 disabled={isGenerating}
                 className="w-full py-5 bg-[#111827] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1f2937] transition-all shadow-xl shadow-[#111827]/10 disabled:opacity-50"
               >
                 {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Download size={18} />}
                 {isGenerating ? 'Generating PDF...' : 'Download Certificate'}
               </button>
               
               <button className="w-full py-5 bg-white border border-[#E4E7EC] text-[#111827] rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#F9FAFB] transition-all">
                 <Share2 size={18} /> Share Credential
               </button>
             </div>
             
             <div className="pt-8 border-t border-[#F3F4F6]">
               <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Scan to Verify</p>
               <div className="p-4 bg-white border border-[#E4E7EC] rounded-2xl w-fit mx-auto shadow-sm">
                 <QRCodeSVG value={`https://mitraa.com/verify/${certId}`} size={120} />
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- SECTION COMPONENTS ---


export const DashboardSection = ({ data, setActiveTab, onOpenLeadModal, onOpenClientModal, onOpenOrderModal, completionPercent, isProfileComplete, isVerified }) => (
  <div className="flex flex-col gap-12">
    {/* Profile Completion Card - New Premium Feature */}
    <div className="bg-white rounded-[40px] p-10 border border-[#E5E7EB] shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B4BFF]/5 rounded-bl-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 w-full">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-[#111827] tracking-tight">Profile Completion</h3>
              <p className="text-sm font-medium text-[#6B7280]">Complete your institutional identity to unlock priority payouts and verified status.</p>
            </div>
            <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest ${isProfileComplete ? 'bg-[#ECFDF3] text-[#12B76A] border border-[#12B76A]/20' : 'bg-[#FFF9F5] text-[#F79009] border border-[#F79009]/20'}`}>
              {isProfileComplete ? <><CheckCircle2 size={16} /> Verified ✅</> : <><AlertOctagon size={16} /> Unverified ⚠️</>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Overall Progress</span>
              <span className="text-2xl font-black text-[#5B4BFF]">{completionPercent}%</span>
            </div>
            <div className="h-4 w-full bg-[#F3F4F6] rounded-full overflow-hidden p-1 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercent}%` }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] rounded-full relative shadow-[0_0_15px_rgba(91,75,255,0.4)]"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
            <ProgressStatus
              label="Business Details"
              completed={!!data.profile.businessName && !!data.bank.gstNumber}
              missing={!data.bank.gstNumber && "GST Missing"}
            />
            <ProgressStatus
              label="Address Details"
              completed={!!data.profile.addressLine1 && !!data.profile.city && !!data.profile.pincode}
              missing={!data.profile.pincode && "Pincode Missing"}
            />
            <ProgressStatus
              label="Bank Details"
              completed={!!data.bank.accountNumber && !!data.bank.ifscCode}
              missing={!data.bank.ifscCode && "IFSC Missing"}
            />
            <ProgressStatus
              label="Documents"
              completed={REQUIRED_DOCS.every(d => data.documents.some(doc => doc.type === d.id))}
              missing={REQUIRED_DOCS.some(d => !data.documents.some(doc => doc.type === d.id)) && "Upload Docs"}
            />
            <ProgressStatus
              label="Contact Info"
              completed={!!data.profile.email && !!data.profile.mobile && !!data.profile.name}
              missing={!data.profile.email && "Email Missing"}
            />
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-6">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#F3F4F6]" />
              <motion.circle
                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray="364.4"
                initial={{ strokeDashoffset: 364.4 }}
                animate={{ strokeDashoffset: 364.4 - (364.4 * completionPercent) / 100 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="text-[#5B4BFF]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black text-[#1F1F2E]">{completionPercent}%</span>
            </div>
          </div>
          <button
            onClick={() => isProfileComplete ? setActiveTab('Dashboard') : setActiveTab('Settings')}
            className={`w-full px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl ${isProfileComplete ? 'bg-[#111827] text-white hover:bg-[#5B4BFF]' : 'bg-[#5B4BFF] text-white hover:shadow-[#5B4BFF]/40 hover:-translate-y-1'}`}
          >
            {isProfileComplete ? "Go to Dashboard" : "Complete Profile"}
          </button>
        </div>
      </div>
    </div>

    {/* Verification Certificate Unlock CTA */}
    <div className={`rounded-[40px] p-12 relative overflow-hidden shadow-2xl transition-all duration-700 ${isVerified ? 'bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#111827] text-white' : 'bg-white border border-[#F3F4F6] grayscale opacity-60'}`}>
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <Award size={200} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-8">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl ${isVerified ? 'bg-gradient-to-br from-[#5B4BFF] to-[#8B7CFF] text-white animate-bounce' : 'bg-[#F9FAFB] text-[#D1D5DB]'}`}>
            <Award size={44} />
          </div>
          <div className="text-left">
            <h3 className="text-3xl font-black tracking-tight">{isVerified ? 'Verification Complete!' : 'Institutional Certification'}</h3>
            <p className={`text-lg font-medium mt-1 ${isVerified ? 'text-white/60' : 'text-[#6B7280]'}`}>
              {isVerified ? 'Your official MiTRAA Partner Certificate is now ready for download.' : 'Complete 100% profile and document verification to unlock your certificate.'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => isVerified ? setActiveTab('Certificate') : setActiveTab('Documents')}
          className={`px-12 py-5 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-2xl transition-all ${isVerified ? 'bg-white text-[#111827] hover:scale-105 active:scale-95' : 'bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed'}`}
        >
          {isVerified ? 'View My Certificate' : 'Complete Verification'}
        </button>
      </div>
    </div>

    {/* Executive Luxury Hero Banner */}
    <section className="relative rounded-[40px] overflow-hidden p-12 xl:p-16 text-white shadow-2xl hero-gradient">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
        <div className="flex-1 space-y-10 min-w-0">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-xl border border-white/10 backdrop-blur-md">
            <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_15px_#22C55E]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Institutional Business Core</span>
          </div>
          <div className="space-y-6">
            <h1 className="text-6xl xl:text-8xl font-black tracking-tightest leading-[0.9]">
              Elevate Your <br />
              <span className="text-[#A5B4FC]">Business Core</span>
            </h1>
            <p className="text-white/60 text-lg xl:text-xl font-medium max-w-2xl leading-relaxed">
              Welcome back, <span className="text-white font-bold">{data.profile.name.split(' ')[0]}</span>. Your network has surged by <span className="text-white font-bold">{data.growth.percentage}</span>. <br />
              Ready to manage your <span className="text-white font-bold">₹{(parseInt(data.kpis.monthEarnings || 0) * 1.5 / 100000).toFixed(1)}L</span> active pipeline?
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <button
              onClick={onOpenLeadModal}
              className="bg-[#5B4BFF] hover:bg-[#6C63FF] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl shadow-[#5B4BFF]/40 flex items-center gap-3 active:scale-95"
            >
              <Plus size={22} strokeWidth={3} /> INITIATE STRATEGIC LEAD
            </button>
            <button
              onClick={() => setActiveTab('Analytics')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-bold border border-white/20 transition-all flex items-center gap-3"
            >
              GLOBAL ANALYTICS <ArrowUpRight size={22} />
            </button>
          </div>
        </div>

        {/* Right Side Status */}
        <div className="hidden xl:block shrink-0 opacity-20">
          <Zap size={300} strokeWidth={0.5} />
        </div>
      </div>
    </section>

    {/* Top 3 Premium Status Cards */}
    <div className="grid grid-cols-3 gap-8 w-full">
      <PremiumMiniStatusCard label="Partner Rank" value={data.profile.rank} sub={data.profile.subRank} icon={<Award size={24} className="text-[#5B4BFF]" />} />
      <PremiumMiniStatusCard label="Growth" value={data.growth.percentage} sub={data.growth.status} icon={<TrendingUp size={24} className="text-[#22C55E]" />} />
      <PremiumMiniStatusCard label="Position" value={data.growth.rank} sub={data.growth.region} icon={<Target size={24} className="text-[#6366F1]" />} />
    </div>

    {/* Luxury KPI Ecosystem */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
      <PremiumStatCard label="Today's Leads" value={data.kpis.todayLeads} growth="+15%" sub="Pipeline Pulse" icon={<Users size={28} />} color="#5B4BFF" badge="ACTIVE" />
      <PremiumStatCard label="Pending Payment" value={`₹${data.kpis.pendingPayment.toLocaleString()}`} growth="+₹5K" sub="Next Payout: May 5" icon={<IndianRupee size={28} />} color="#F59E0B" badge="DUE" />
      <PremiumStatCard label="Month Earnings" value={`₹${data.kpis.monthEarnings.toLocaleString()}`} growth="+22%" sub="Net Growth" icon={<TrendingUp size={28} />} color="#22C55E" badge="PAID" />
      <PremiumStatCard label="Target Progress" value={`${data.kpis.targetProgress}%`} growth="On Track" sub="Q2 Milestone" icon={<Target size={28} />} color="#6366F1" progress={data.kpis.targetProgress} />
    </div>

    {/* Operational Command - High Fidelity Quick Actions */}
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-[#111827] tracking-tight ml-2">Operational Command</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        <QuickActionCard
          icon={<Users size={24} />}
          label="Add New Client"
          color="#5B4BFF"
          onClick={onOpenClientModal}
        />
        <QuickActionCard
          icon={<Plus size={24} />}
          label="Submit Lead"
          color="#12B76A"
          onClick={onOpenLeadModal}
        />
        <QuickActionCard
          icon={<ShoppingBag size={24} />}
          label="Add New Order"
          color="#F79009"
          onClick={onOpenOrderModal}
        />
        <QuickActionCard
          icon={<Clock size={24} />}
          label="Track Projects"
          color="#8B7CFF"
          onClick={() => setActiveTab('Orders')}
        />
        <QuickActionCard
          icon={<FileText size={24} />}
          label="Download Invoice"
          color="#6366F1"
          onClick={() => setActiveTab('Earnings')}
        />
        <QuickActionCard
          icon={<ShieldCheck size={24} />}
          label="Raise Ticket"
          color="#EF4444"
          onClick={() => setActiveTab('Raise Ticket')}
        />
        <QuickActionCard
          icon={<Settings size={24} />}
          label="Update Profile"
          color="#9CA3AF"
          onClick={() => setActiveTab('Settings')}
        />
      </div>
    </div>

    {/* Aligned CRM & Achievements */}
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-12 xl:col-span-8 flex flex-col gap-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-[#1F1F2E]">Active Pipeline Ecosystem</h2>
          <button onClick={() => setActiveTab('Leads')} className="text-[#5B4BFF] font-bold text-xs hover:underline uppercase tracking-widest">OPEN CRM HUB</button>
        </div>
        <div className="flex flex-col gap-4">
          {data.leads.length > 0 ? data.leads.slice(0, 3).map(lead => (
            <PremiumLeadRow key={lead.id} name={lead.name} industry={lead.industry} value={lead.value} status={lead.status} time={lead.time} revenue={lead.revenue} />
          )) : (
            <div className="p-12 bg-white rounded-3xl border border-dashed border-[#E4E7EC] text-center">
              <p className="text-[#9CA3AF] font-bold">No active leads. Use Quick Actions to add your first lead!</p>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-[#1F1F2E] px-2">Achievement Vault</h2>
        <div className="executive-card p-10 flex flex-col gap-10 bg-white">
          <AchievementBlock title="Deal Closer Elite" sub={data.profile.rank === 'Elite' ? "Active Tier" : "Reach Elite Rank"} points="+1,200" icon="👑" />
          <AchievementBlock title="Revenue Catalyst" sub={`₹${data.kpis.monthEarnings.toLocaleString()}+ Pipeline`} points="+850" icon="💎" />
          <AchievementBlock title="Loyalty Legend" sub={data.profile.verified ? "Verified Status" : "Pending Audit"} points="+500" icon="🌟" />
          <button className="w-full py-5 bg-[#F4F2FF] text-[#5B4BFF] rounded-2xl font-bold text-sm hover:bg-[#5B4BFF] hover:text-white transition-all shadow-sm uppercase tracking-widest">
            UNLOCK REWARDS HUD
          </button>
        </div>
      </div>
    </div>
  </div>
);


export const LeadsSection = ({ data, onOpenModal, onMoveLead }) => (
  <div className="flex flex-col gap-12">
    <div className="flex items-end justify-between">
      <SectionHeader title="Lead Management CRM" sub="Track and convert your active business opportunities in real-time" />
      <button
        onClick={onOpenModal}
        className="bg-[#5B4BFF] hover:bg-[#6C63FF] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-[#5B4BFF]/30 flex items-center gap-3"
      >
        <Plus size={20} strokeWidth={3} /> NEW OPPORTUNITY
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-4">
      <MiniStatCard label="New Pipeline" value={data.leads.filter(l => l.status === 'NEW').length} color="#5B4BFF" />
      <MiniStatCard label="In Progress" value={data.leads.filter(l => l.status === 'IN_PROGRESS').length} color="#F79009" />
      <MiniStatCard label="Converted" value={data.leads.filter(l => l.status === 'CONVERTED').length} color="#12B76A" />
      <MiniStatCard label="Rejected" value={data.leads.filter(l => l.status === 'REJECTED').length} color="#EF4444" />
    </div>
    {/* Kanban CRM Board */}
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <PipelineColumn
        title="New Leads"
        status="NEW"
        count={data.leads.filter(l => l.status === 'NEW').length}
        color="#5B4BFF"
        onDropLead={onMoveLead}
      >
        {data.leads.filter(l => l.status === 'NEW').map(l => (
          <PipelineCard key={l.id} lead={l} onMove={onMoveLead} />
        ))}
      </PipelineColumn>

      <PipelineColumn
        title="In Progress"
        status="IN_PROGRESS"
        count={data.leads.filter(l => l.status === 'IN_PROGRESS').length}
        color="#F79009"
        onDropLead={onMoveLead}
      >
        {data.leads.filter(l => l.status === 'IN_PROGRESS').map(l => (
          <PipelineCard key={l.id} lead={l} onMove={onMoveLead} />
        ))}
      </PipelineColumn>

      <PipelineColumn
        title="Converted"
        status="CONVERTED"
        count={data.leads.filter(l => l.status === 'CONVERTED').length}
        color="#12B76A"
        onDropLead={onMoveLead}
      >
        {data.leads.filter(l => l.status === 'CONVERTED').map(l => (
          <PipelineCard key={l.id} lead={l} onMove={onMoveLead} />
        ))}
      </PipelineColumn>

      <PipelineColumn
        title="Rejected"
        status="REJECTED"
        count={data.leads.filter(l => l.status === 'REJECTED').length}
        color="#EF4444"
        onDropLead={onMoveLead}
      >
        {data.leads.filter(l => l.status === 'REJECTED').map(l => (
          <PipelineCard key={l.id} lead={l} onMove={onMoveLead} />
        ))}
      </PipelineColumn>
    </div>
  </div>
);


export const ClientsSection = ({ data, addClient, onOpenModal }) => (
  <div className="space-y-12">
    <div className="flex items-end justify-between">
      <SectionHeader title="Institutional Client Base" sub="Manage your verified enterprise and SME relationships" />
      <div className="flex items-center gap-4">
        <div className="bg-white p-4 px-8 rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center gap-6">
          <div>
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Total Clients</p>
            <p className="text-2xl font-bold text-[#1F1F2E]">{data.clients.length}</p>
          </div>
          <div className="w-px h-8 bg-[#E5E7EB]"></div>
          <div>
            <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Repeat Rate</p>
            <p className="text-2xl font-bold text-[#12B76A]">{data.clients.filter(c => c.repeat).length > 0 ? Math.round((data.clients.filter(c => c.repeat).length / data.clients.length) * 100) : 0}%</p>
          </div>
        </div>
        <button
          onClick={() => onOpenModal()}
          className="bg-[#111827] text-white h-full px-8 rounded-2xl font-bold shadow-xl hover:bg-[#5B4BFF] transition-all"
        >
          + ADD CLIENT
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.clients.length > 0 ? data.clients.map(client => (
        <EnhancedClientCard key={client.id} name={client.name} contact={client.contact} status={client.status} revenue={client.revenue} repeat={client.repeat} notes={client.notes} />
      )) : (
        <div className="col-span-full p-20 bg-white rounded-[40px] border border-dashed border-[#E4E7EC] text-center">
          <p className="text-[#9CA3AF] font-bold">Your client database is empty. Add your first institutional client!</p>
        </div>
      )}
    </div>
  </div>
);