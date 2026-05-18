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

export const SupportSection = ({ setActiveTab, data, isProfileComplete }) => (
  <div className="flex flex-col gap-12">
    {/* 1. Hero Header Section */}
    <div className="bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#111827] rounded-[40px] p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className={`backdrop-blur-md px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-2 ${isProfileComplete ? 'bg-[#12B76A]/10 border-[#12B76A]/20 text-[#12B76A]' : 'bg-[#F79009]/10 border-[#F79009]/20 text-[#F79009]'}`}>
              {isProfileComplete ? (
                <><CheckCircle2 size={16} /> Verified Partner</>
              ) : (
                <><AlertOctagon size={16} /> Pending Verification</>
              )}
            </span>
            <span className="bg-gradient-to-r from-[#F79009] to-[#F59E0B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg flex items-center gap-2">
              <Star size={14} fill="currentColor" /> {data.profile.membership} Member
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Priority Partner Support</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">Direct access to your dedicated account manager and lightning-fast technical resolutions. We guarantee a maximum 4-hour SLA for all priority infrastructure tickets.</p>
        </div>
        <div className="text-right hidden md:block bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2 flex items-center gap-2 justify-end"><Clock size={12} /> Last Secure Login</p>
          <p className="text-2xl font-bold text-white">{data.profile.lastLogin}</p>
        </div>
      </div>
    </div>

    {/* 8. Priority Support Badges */}
    <div className="flex flex-row flex-nowrap w-full gap-4 lg:gap-6 overflow-x-auto pb-4">
      <div className="flex-1 min-w-[200px] lg:min-w-0"><SupportBadge icon={<Clock />} title="4-Hour SLA" desc="Guaranteed Response" color="#F79009" /></div>
      <div className="flex-1 min-w-[200px] lg:min-w-0"><SupportBadge icon={<Zap />} title="24/7 Escalation" desc="Critical Issues Only" color="#EF4444" /></div>
      <div className="flex-1 min-w-[200px] lg:min-w-0"><SupportBadge icon={<Users />} title="1-on-1 Manager" desc="Dedicated Support" color="#5B4BFF" /></div>
      <div className="flex-1 min-w-[200px] lg:min-w-0"><SupportBadge icon={<ShieldCheck />} title="Global Plus" desc="Highest Tier Access" color="#12B76A" /></div>
    </div>

    {/* 2. Quick Access Cards */}
    <div className="flex flex-row flex-nowrap w-full gap-4 lg:gap-6 overflow-x-auto pb-4">
      <div className="flex-1 min-w-[220px] lg:min-w-0">
        <SupportQuickCard 
          icon={<MessageSquare />} 
          title="Internal Chat" 
          desc="Avg response: 5 mins" 
          cta="START CHAT" 
          color="#5B4BFF" 
          onClick={() => setActiveTab('Communication')}
        />
      </div>
      <div className="flex-1 min-w-[220px] lg:min-w-0">
        <SupportQuickCard 
          icon={<Headphones />} 
          title="Priority Call" 
          desc="Mon–Sat | 9 AM–7 PM" 
          cta="REQUEST CALL" 
          color="#12B76A" 
          onClick={() => window.location.href = 'tel:9938330784'}
        />
      </div>
      <div className="flex-1 min-w-[220px] lg:min-w-0">
        <SupportQuickCard 
          icon={<Users />} 
          title="Dedicated Manager" 
          desc="Assigned Account Manager" 
          cta="CONTACT MANAGER" 
          color="#F79009" 
          onClick={() => window.open('https://wa.me/919938330784?text=Hi Mahi, I need help with my account.', '_blank')}
        />
      </div>
      <div className="flex-1 min-w-[220px] lg:min-w-0">
        <SupportQuickCard 
          icon={<AlertOctagon />} 
          title="Emergency Alert" 
          desc="Critical System Failure" 
          cta="ESCALATE NOW" 
          color="#EF4444" 
          onClick={() => setActiveTab('Raise Ticket')}
        />
      </div>
    </div>

    {/* Contact Manager & Redirect to New Form */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-[40px] border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 flex flex-col items-center text-center h-full group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-[#F5F4FF] to-[#E0E7FF] rounded-3xl flex items-center justify-center text-[#5B4BFF] font-bold text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
            AM
          </div>
          <h3 className="text-2xl font-bold text-[#1F1F2E]">Mahi Bot</h3>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mt-2 mb-8 bg-[#F9FAFB] px-4 py-2 rounded-lg border border-[#F3F4F6]">Assigned Account Manager</p>
          <div className="w-full space-y-4 mt-auto">
            <button 
              onClick={() => window.location.href = 'tel:9938330784'}
              className="w-full py-4 bg-white hover:bg-[#F5F4FF] hover:text-[#5B4BFF] hover:border-[#5B4BFF]/30 text-[#4B5563] font-bold text-[11px] uppercase tracking-widest rounded-2xl transition-all border border-[#E5E7EB] flex justify-center items-center gap-2 shadow-sm"
            >
              <PhoneCall size={16} /> Direct Dial
            </button>
            <button 
              onClick={() => window.open('https://wa.me/919938330784?text=Hi Mahi, I would like to schedule a meeting regarding my MiTRAA Partner account.', '_blank')}
              className="w-full py-4 bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] text-white font-bold text-[11px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#5B4BFF]/20 hover:shadow-[#5B4BFF]/40 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
            >
              <Calendar size={16} /> Schedule Meeting
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white rounded-[40px] border border-[#F3F4F6] p-12 flex flex-col justify-center items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5B4BFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-24 h-24 bg-[#F5F4FF] rounded-[24px] flex items-center justify-center text-[#5B4BFF] mb-8 shadow-sm group-hover:scale-110 transition-all duration-500"><LifeBuoy size={40} /></div>
          <h3 className="text-3xl font-bold text-[#1F1F2E] mb-3 group-hover:text-[#5B4BFF] transition-colors">Submit a Technical Issue</h3>
          <p className="text-[#6B7280] font-medium mb-10 max-w-md leading-relaxed">Head over to the dedicated Raise Ticket portal to contact engineering and submit a bug report or support request.</p>
          <button onClick={() => setActiveTab('Raise Ticket')} className="bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] text-white px-10 py-5 rounded-2xl font-bold text-[12px] uppercase tracking-widest shadow-[0_10px_30px_rgba(91,75,255,0.3)] hover:shadow-[0_15px_40px_rgba(91,75,255,0.4)] hover:-translate-y-1 transition-all flex items-center gap-3">
            Go to Raise Ticket Portal <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>

    {/* 4. Active Tickets & 5. History */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Active Tickets */}
      <div className="bg-white rounded-[40px] border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-10 border-b border-[#F3F4F6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
          <div>
            <h3 className="text-2xl font-bold text-[#1F1F2E]">Active Tickets</h3>
            <p className="text-sm font-medium text-[#6B7280] mt-1">Track ongoing issue resolutions</p>
          </div>
          <button className="bg-white border border-[#E5E7EB] text-[#1F1F2E] px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-sm hover:text-[#5B4BFF] hover:border-[#5B4BFF] hover:shadow-[0_4px_15px_rgba(91,75,255,0.15)] hover:-translate-y-0.5 transition-all">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#F3F4F6]">
              <tr className="text-left">
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Ticket ID</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Issue</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Created Date</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Priority</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Assigned To</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest whitespace-nowrap">Expected Res.</th>
                <th className="px-6 py-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {data.tickets.length > 0 ? data.tickets.map(t => (
                <TicketRow key={t.id} id={t.id} issue={t.subject} created={t.date} priority={t.priority} assignedTo="Auto-Assign" status={t.status} expected="Within 4h" />
              )) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-[#9CA3AF] font-bold">No active support tickets.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support History */}
      <div className="bg-white p-12 rounded-[40px] border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
        <h3 className="text-2xl font-bold text-[#1F1F2E] mb-12 flex items-center gap-3"><History size={24} className="text-[#5B4BFF]" /> Resolution History</h3>
        <div className="space-y-0">
          <HistoryTimelineItem title="API Rate Limit Exceeded" date="24 April, 2026" status="Resolved" />
          <HistoryTimelineItem title="Payout Reconciliation Failed" date="15 April, 2026" status="Resolved" />
          <HistoryTimelineItem title="Password Reset Error" date="02 April, 2026" status="Resolved" />
        </div>
      </div>
    </div>

    {/* 6. Knowledge Base */}
    <div className="bg-white rounded-[40px] border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6">
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F2E]">Knowledge Base</h3>
          <p className="text-sm font-medium text-[#6B7280] mt-1">Self-serve resources and technical documentation</p>
        </div>
        <button className="bg-white text-[#1F1F2E] px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest border border-[#E5E7EB] hover:text-[#5B4BFF] hover:border-[#5B4BFF] hover:shadow-[0_4px_15px_rgba(91,75,255,0.15)] hover:-translate-y-0.5 shadow-sm transition-all">
          Browse All Docs
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <KBCard title="Platform FAQs" desc="Answers to common questions about partner tools" icon={<HelpCircle />} />
        <KBCard title="Video Tutorials" desc="Step-by-step visual guides for platform features" icon={<PlayCircle />} />
        <KBCard title="API Documentation" desc="Deep integration endpoints and developer webhooks" icon={<Code />} />
        <KBCard title="Billing Help" desc="Detailed payout logic and invoice generation guides" icon={<IndianRupee />} />
        <KBCard title="Troubleshooting" desc="Quick solutions for common connection errors" icon={<Wrench />} />
        <KBCard title="Technical Manuals" desc="Full PDFs detailing SLA standards and architecture" icon={<BookOpen />} />
      </div>
    </div>
  </div>
);


export const CommunicationSection = () => (
  <div className="space-y-12">
    <SectionHeader title="Communication Center" sub="Manage high-priority notifications, team chats, and system broadcasts" />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        <div className="bg-white p-10 rounded-[40px] border border-[#E4E7EC] shadow-xl shadow-black/5 flex flex-col gap-6 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-[#1F1F2E] flex items-center gap-3"><Bell size={24} className="text-[#5B4BFF]" /> High-Priority Alerts</h3>
            <span className="text-[10px] font-bold text-[#5B4BFF] uppercase tracking-widest bg-[#F4F2FF] px-4 py-2 rounded-xl">3 Unread</span>
          </div>
          <div className="space-y-4 flex-1">
            <AlertRow type="Opportunity" title="New Enterprise Lead Assigned" desc="Tata Consultancy Services requested a demo for the Cloud ERP suite." time="10 mins ago" isNew />
            <AlertRow type="Financial" title="Payout Processed" desc="Your commission of ₹78,000 for April has been credited to your bank." time="2 hours ago" />
            <AlertRow type="System" title="Platform Upgrade" desc="The AI forecasting module will be under maintenance on Sunday." time="1 day ago" />
          </div>
          <button className="w-full mt-4 py-4 bg-[#F9FAFB] text-[#6B7280] rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#F3F4F6] transition-all">View All Notifications</button>
        </div>
      </div>
      <div className="xl:col-span-1">
        <div className="bg-white p-8 rounded-[40px] border border-[#E4E7EC] shadow-xl shadow-black/5 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#F5F4FF] text-[#5B4BFF] flex items-center justify-center"><MessageSquare size={20} /></div>
            <h3 className="text-xl font-bold text-[#1F1F2E]">Direct Chat</h3>
          </div>
          <div className="flex-1 bg-[#F9FAFB] rounded-3xl p-6 border border-[#F3F4F6] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4"><Headphones size={32} className="text-[#9CA3AF]" /></div>
            <p className="text-lg font-bold text-[#1F1F2E]">Support Manager</p>
            <p className="text-[10px] font-bold text-[#12B76A] uppercase tracking-widest mt-2 mb-8 flex items-center justify-center gap-1.5"><span className="w-2 h-2 bg-[#12B76A] rounded-full animate-pulse"></span> Online Now</p>
            <button 
              onClick={() => window.open('https://wa.me/919938330784?text=Hi, I have a question regarding the MiTRAA platform.', '_blank')}
              className="w-full bg-[#5B4BFF] text-white py-5 rounded-2xl font-bold text-sm shadow-xl shadow-[#5B4BFF]/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} /> START CHAT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export const ResourcesSection = () => (
  <div className="space-y-12">
    <SectionHeader title="Training & Resources" sub="Equip yourself with premium sales materials, product brochures, and partner tutorials" />
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <ResourceCard category="Sales Materials" title="Enterprise Pitch Deck" type="PDF" size="290 KB" icon={<FileText />} url="/pdfss/MiTRAA Enterprise Pitch Deck request(1).pdf" />
      <ResourceCard category="Brochures" title="Cloud ERP Suite Brochure" type="PDF" size="140 KB" icon={<FileText />} url="/pdfss/MiTRAA Cloud ERP Suite brochure request(1).pdf" />
      <ResourceCard category="Pricing" title="Q2 Partner Rate Card" type="PDF" size="115 KB" icon={<TrendingUp />} url="/pdfss/MiTRAA Q2 Partner Rate Card document request.pdf" />
      <ResourceCard category="Playbook" title="SME Sales Playbook" type="PDF" size="548 KB" icon={<Clock />} color="#F79009" url="/pdfss/MiTRAA SME sales playbook request(1).pdf" />
      <ResourceCard category="Guides" title="Portal Walkthrough Guide" type="PDF" size="130 KB" icon={<Clock />} color="#F79009" url="/pdfss/MiTRAA partner portal walkthrough guide request.pdf" />
      <ResourceCard category="Support" title="Partner FAQs 2026" type="PDF" size="585 KB" icon={<ShieldCheck />} color="#12B76A" url="/pdfss/MiTRAA Partner FAQs 2026 document request.pdf" />
    </div>
  </div>
);

// --- HELPER UI COMPONENTS ---


export const RaiseTicketSection = ({ onUpload, files, addTicket }) => {
  const fileInputRef = useRef();
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Standard SLA (24h)');
  const [category, setCategory] = useState('Financial / Payouts');

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = () => {
    if (!subject || !desc) {
      alert("Please enter a subject and description.");
      return;
    }
    const newTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      status: "OPEN",
      priority: priority.split(' ')[0].toUpperCase(),
      date: "Just now"
    };
    addTicket(newTicket);
    alert(`Ticket ${newTicket.id} has been submitted successfully.`);
    setSubject('');
    setDesc('');
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-20">

      {/* Premium Header Card */}
      <div className="bg-white p-10 rounded-[32px] border border-[#E5E7EB] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#5B4BFF] opacity-80"></div>
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-20 h-20 bg-[#F5F3FF] text-[#5B4BFF] rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
            <LifeBuoy size={40} strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-[#111827] tracking-tight">Raise Technical Ticket</h2>
              <span className="bg-[#F5F3FF] text-[#5B4BFF] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#5B4BFF]/10">Priority Support</span>
            </div>
            <p className="text-lg font-medium text-[#6B7280]">Submit a bug or support request directly to engineering</p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-[40px] p-12 lg:p-16 border border-[#F3F4F6] shadow-2xl shadow-black/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5B4BFF] via-[#8B7CFF] to-[#5B4BFF]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10">

          {/* Row 1: Issue Category | Priority Level */}
          <div className="space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4">Issue Category</label>
            <div className="relative group">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-20 bg-[#F8FAFF] border border-[#E5EAF2] group-hover:border-[#5B4BFF]/40 focus:border-[#5B4BFF] focus:ring-[10px] focus:ring-[#5B4BFF]/5 focus:bg-white px-8 rounded-3xl font-bold text-[#111827] outline-none appearance-none transition-all text-lg cursor-pointer"
              >
                <option>Financial / Payouts</option>
                <option>Platform Bug</option>
                <option>Account Access</option>
                <option>Feature Request</option>
              </select>
              <ChevronDown size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none group-hover:text-[#5B4BFF] transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4">Priority Level</label>
            <div className="relative group">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-20 bg-[#F8FAFF] border border-[#E5EAF2] group-hover:border-[#5B4BFF]/40 focus:border-[#5B4BFF] focus:ring-[10px] focus:ring-[#5B4BFF]/5 focus:bg-white px-8 rounded-3xl font-bold text-[#111827] outline-none appearance-none transition-all text-lg cursor-pointer"
              >
                <option>Standard SLA (24h)</option>
                <option>Medium Priority (12h)</option>
                <option>High Priority (4h)</option>
              </select>
              <ChevronDown size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none group-hover:text-[#5B4BFF] transition-colors" />
            </div>
          </div>

          {/* Row 2: Preferred Contact Method | Subject Line */}
          <div className="space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4">Preferred Contact Method</label>
            <div className="relative group">
              <select className="w-full h-20 bg-[#F8FAFF] border border-[#E5EAF2] group-hover:border-[#5B4BFF]/40 focus:border-[#5B4BFF] focus:ring-[10px] focus:ring-[#5B4BFF]/5 focus:bg-white px-8 rounded-3xl font-bold text-[#111827] outline-none appearance-none transition-all text-lg cursor-pointer">
                <option>Email Notification</option>
                <option>Phone Call</option>
                <option>WhatsApp Message</option>
                <option>Slack / Discord</option>
              </select>
              <ChevronDown size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none group-hover:text-[#5B4BFF] transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4">Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Payout delayed for Order #742"
              className="w-full h-20 bg-[#F8FAFF] border border-[#E5EAF2] hover:border-[#5B4BFF]/40 focus:border-[#5B4BFF] focus:ring-[10px] focus:ring-[#5B4BFF]/5 focus:bg-white px-8 rounded-3xl font-bold text-[#111827] outline-none transition-all text-lg placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Row 3: Detailed Description (Full Width) */}
          <div className="md:col-span-2 space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4 flex items-center justify-between">
              Detailed Description
              <span className="text-[10px] font-black text-[#5B4BFF] uppercase tracking-widest">Provide as much detail as possible</span>
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-[#F8FAFF] border border-[#E5EAF2] hover:border-[#5B4BFF]/40 focus:border-[#5B4BFF] focus:ring-[10px] focus:ring-[#5B4BFF]/5 focus:bg-white p-8 rounded-[32px] font-bold text-[#111827] outline-none transition-all resize-none min-h-[180px] text-lg leading-relaxed placeholder:text-[#9CA3AF]"
              placeholder="Explain the technical issue or support request here..."
            ></textarea>
          </div>

          {/* Row 4: Attachment Upload Zone (Full Width) */}
          <div className="md:col-span-2 space-y-4">
            <label className="text-[14px] font-bold text-[#111827] uppercase tracking-widest ml-4">Attachment Upload Zone</label>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              onChange={(e) => onUpload(e.target.files)}
            />
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className="w-full border-[3px] border-dashed border-[#E5EAF2] hover:border-[#5B4BFF] bg-[#F8FAFF] hover:bg-[#F5F3FF] rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-500 group relative overflow-hidden"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10 border border-[#E5EAF2]">
                <UploadCloud size={48} className="text-[#5B4BFF]" />
              </div>
              <div className="text-center relative z-10">
                <h4 className="text-2xl font-black text-[#111827] mb-2 group-hover:text-[#5B4BFF] transition-colors">
                  {files.length > 0 ? `${files.length} file(s) ready` : "Drop files here or click to upload"}
                </h4>
                <p className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.2em]">
                  {files.length > 0 ? files.map(f => f.name).join(', ') : "PDF, JPG, PNG • Max 10MB"}
                </p>
              </div>
            </div>
          </div>

          {/* Row 5: Submit Button (Full Width) */}
          <div className="md:col-span-2 pt-10">
            <button
              onClick={handleSubmit}
              className="w-full h-24 bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] text-white rounded-[32px] font-black text-xl uppercase tracking-[0.4em] shadow-[0_25px_60px_rgba(91,75,255,0.35)] hover:shadow-[0_30px_80px_rgba(91,75,255,0.5)] hover:-translate-y-2 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-4 group"
            >
              SUBMIT RESOLUTION TICKET
              <ArrowUpRight size={32} strokeWidth={3} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};