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

export const OrdersSection = ({ data, onOpenModal }) => (
  <div className="space-y-12">
    <div className="flex items-end justify-between">
      <SectionHeader title="Project & Order Pipeline" sub="Real-time tracking of active deliveries, payments, and feedback" />
      <button
        onClick={onOpenModal}
        className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] text-white px-8 py-4 rounded-full font-black text-sm transition-all hover:-translate-y-1 active:scale-95 shadow-xl uppercase tracking-widest flex items-center gap-3"
      >
        <Plus size={18} strokeWidth={4} /> ADD ORDER
      </button>
    </div>
    <div className="bg-white rounded-[40px] p-8 border border-[#E4E7EC] shadow-xl shadow-black/5 flex flex-col gap-2">
      {data.orders.length > 0 ? data.orders.map(order => (
        <EnhancedProjectRow key={order.id} name={order.name} client={order.client} progress={order.progress} status={order.status} date={order.date} delivery={order.delivery} payment={order.payment} feedback={order.feedback} />
      )) : (
        <div className="p-20 text-center">
          <p className="text-[#9CA3AF] font-bold">No active orders found in your pipeline.</p>
        </div>
      )}
    </div>
  </div>
);


export const EarningsSection = ({ data }) => (
  <div className="flex flex-col gap-10">
    <SectionHeader title="Financial Intelligence Hub" sub="Track your enterprise earnings, payouts, and bonus intelligence" />

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <EarningsSummaryCard label="Total Commission" value={`₹${data.kpis.monthEarnings.toLocaleString()}`} growth="+12%" color="#5B4BFF" icon={<IndianRupee size={24} />} />
      <EarningsSummaryCard label="Pending Payout" value={`₹${data.kpis.pendingPayment.toLocaleString()}`} growth="Next: May 5" color="#F79009" icon={<Clock size={24} />} />
      <EarningsSummaryCard label="Incentive Bonuses" value="₹0" growth="Q2 Milestone Pending" color="#12B76A" icon={<Award size={24} />} />
      <EarningsSummaryCard label="Referral Rewards" value={data.referrals.earnings} growth={`From ${data.referrals.count} Partners`} color="#6366F1" icon={<Users size={24} />} />
    </div>

    <div className="executive-card overflow-hidden">
      <div className="p-10 border-b border-[#F3F4F6] flex justify-between items-center bg-white">
        <div>
          <h3 className="text-2xl font-bold text-[#1F1F2E]">Payout History</h3>
          <p className="text-sm font-medium text-[#6B7280] mt-1">Comprehensive ledger of all settled transactions</p>
        </div>
        <button className="text-[11px] font-bold text-[#5B4BFF] uppercase tracking-widest border border-[#5B4BFF] px-6 py-3 rounded-xl hover:bg-[#5B4BFF] hover:text-white transition-all shadow-sm">Download Report</button>
      </div>
      <div className="overflow-x-auto bg-white">
        <table className="w-full payout-table">
          <thead className="bg-[#F9FAFB]">
            <tr>
              <th className="py-6 text-left pl-10">Date</th>
              <th className="py-6 text-left">Reference ID</th>
              <th className="py-6 text-left">Amount</th>
              <th className="py-6 text-left">Category</th>
              <th className="py-6 text-left">Method</th>
              <th className="py-6 text-left">Status</th>
              <th className="py-6 text-left">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6]">
            {data.payouts.length > 0 ? data.payouts.map((p, idx) => (
              <PayoutTableRow key={idx} date={p.date} refId={p.refId} amount={p.amount} category={p.category} method={p.method} status={p.status} />
            )) : (
              <tr>
                <td colSpan="7" className="py-20 text-center text-[#9CA3AF] font-bold italic">No payout history available yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


export const ReferralsSection = ({ data }) => (
  <div className="space-y-12">
    <SectionHeader title="Strategic Referral Network" sub="Expand the ecosystem and earn exponential rewards for every verified partner" />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-lg">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Active Program</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Invite Partners, Earn ₹5,000</h2>
            <p className="text-white/70 text-lg leading-relaxed">For every verified enterprise partner you bring to MiTRAA, you get an instant referral bonus and 2% lifetime commission on their earnings.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between backdrop-blur-xl">
            <div>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Your Unique Link</p>
              <code className="text-lg font-bold tracking-wider">{data.referrals.link}</code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(data.referrals.link);
                alert("Link copied to clipboard!");
              }}
              className="bg-white text-[#111827] px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
            >
              COPY
            </button>
          </div>
          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-[#25D366] text-white px-6 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-widest border-none">
              <MessageSquare size={18} /> WhatsApp
            </button>
            <button className="flex-1 bg-white/10 text-white px-6 py-4 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
              <MessageSquare size={18} /> Email
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-[#E4E7EC] shadow-sm flex-1 flex flex-col justify-center items-center text-center group hover:border-[#5B4BFF] transition-all">
          <div className="w-16 h-16 bg-[#F5F4FF] text-[#5B4BFF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
            <Users size={32} />
          </div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">Total Referrals</p>
          <h4 className="text-5xl font-black text-[#1F1F2E]">{data.referrals.count}</h4>
          <p className="text-xs font-bold text-[#12B76A] mt-2">+{data.referrals.monthly} This Month</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-[#E4E7EC] shadow-sm flex-1 flex flex-col justify-center items-center text-center group hover:border-[#5B4BFF] transition-all">
          <div className="w-16 h-16 bg-[#ECFDF3] text-[#12B76A] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
            <IndianRupee size={32} />
          </div>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">Referral Earnings</p>
          <h4 className="text-4xl font-black text-[#1F1F2E]">{data.referrals.earnings}</h4>
          <p className="text-xs font-bold text-[#6B7280] mt-2">Lifetime Value</p>
        </div>
      </div>
    </div>
  </div>
);


export const DocumentsSection = ({ onUpload, files, data, onViewDoc, setActiveTab, updateDbData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadedTypes = files.map(f => f.type);
  const allUploaded = REQUIRED_DOCS.every(d => uploadedTypes.includes(d.id));
  const completionPercent = Math.round((REQUIRED_DOCS.filter(d => uploadedTypes.includes(d.id)).length / REQUIRED_DOCS.length) * 100);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files, 'Other');
    }
  };

  const handleSubmit = () => {
    if (!allUploaded || !termsAccepted || !consentGiven) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      updateDbData({
        profile: { ...data.profile, status: 'PENDING VERIFICATION' }
      });
      alert("Documents submitted successfully for verification! 🚀");
    }, 2500);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 bg-[#F8FAFC] -m-12 p-12 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#111827] tracking-tight">Documents & Verification</h2>
          <p className="text-lg font-medium text-[#6B7280] mt-1">Upload and manage your business verification documents</p>
        </div>
        <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border transition-colors ${data.profile.status === 'PENDING VERIFICATION' ? 'bg-[#ECFDF3] border-[#12B76A] text-[#12B76A]' : allUploaded ? 'bg-[#FFF9F5] border-[#F79009] text-[#F79009]' : 'bg-[#F9FAFB] border-[#E5EAF2] text-[#9CA3AF]'}`}>
          <div className={`w-2 h-2 rounded-full ${data.profile.status === 'PENDING VERIFICATION' ? 'bg-[#12B76A]' : allUploaded ? 'bg-[#F79009] animate-pulse' : 'bg-[#9CA3AF]'}`}></div>
          <span className="text-xs font-black uppercase tracking-widest">
            {data.profile.status === 'PENDING VERIFICATION' ? 'Verification In Progress' : allUploaded ? 'Pending Review' : 'Not Verified'}
          </span>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="executive-card p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-[#5B4BFF]" style={{ width: `${completionPercent}%`, transition: 'width 1s ease-in-out' }}></div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-[#111827]">Profile Completion</h3>
          <span className="text-2xl font-black text-[#5B4BFF]">{completionPercent}%</span>
        </div>
        <div className="w-full h-4 bg-[#F3F4F6] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            className="h-full bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF]"
          />
        </div>
        <p className="mt-4 text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">
          {allUploaded ? 'All required documents uploaded. Ready for verification.' : `Please upload ${REQUIRED_DOCS.length - REQUIRED_DOCS.filter(d => uploadedTypes.includes(d.id)).length} more document(s) to reach 100%.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-12 space-y-12">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('global-upload').click()}
            className={`w-full border-[3px] border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-500 group relative overflow-hidden ${isDragging ? 'bg-[#F5F3FF] border-[#5B4BFF] scale-[1.01]' : 'bg-white border-[#E5EAF2] hover:border-[#5B4BFF] hover:bg-[#F8FAFF]'
              }`}
          >
            <input id="global-upload" type="file" className="hidden" onChange={(e) => onUpload(e.target.files, 'Other')} />
            <div className="w-24 h-24 bg-[#F5F4FF] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 relative z-10 border border-[#E5EAF2]">
              <UploadCloud size={48} className="text-[#5B4BFF]" />
            </div>
            <div className="text-center relative z-10">
              <h4 className="text-2xl font-black text-[#111827] mb-2">Drop documents here or click to upload</h4>
              <p className="text-sm font-black text-[#9CA3AF] uppercase tracking-[0.2em]">Supported: PDF, JPG, PNG • Max 10MB</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#111827] ml-2">Required Business Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REQUIRED_DOCS.map(doc => (
                <DocumentRow
                  key={doc.id}
                  doc={doc}
                  uploadedFile={files.find(f => f.type === doc.id)}
                  onUpload={onUpload}
                />
              ))}
            </div>
          </div>

          {/* Final Verification & Consent Block */}
          <div className="bg-white p-10 rounded-[32px] border border-[#F3F4F6] shadow-xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4 bg-[#F0FDF4] p-6 rounded-2xl border border-[#BBF7D0]">
              <ShieldCheck className="text-[#16a34a]" size={24} />
              <p className="text-sm font-bold text-[#16a34a] uppercase tracking-wide">
                All uploaded documents are securely encrypted and stored with bank-grade security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-[#F9FAFB] transition-all">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-1 w-6 h-6 rounded-lg border-[#E5EAF2] text-[#5B4BFF] focus:ring-[#5B4BFF] transition-all cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-[#6B7280] leading-relaxed group-hover:text-[#111827] transition-colors">
                    I accept the <button className="text-[#5B4BFF] font-bold hover:underline">Terms & Conditions</button> and acknowledge that providing false documents will lead to account termination.
                  </span>
                </label>
                <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-[#F9FAFB] transition-all">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-6 h-6 rounded-lg border-[#E5EAF2] text-[#5B4BFF] focus:ring-[#5B4BFF] transition-all cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-[#6B7280] leading-relaxed group-hover:text-[#111827] transition-colors">
                    I give my consent for MiTRAA to verify these documents with respective government bodies.
                  </span>
                </label>
              </div>

              <div className="flex flex-col justify-end items-end gap-6">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setActiveTab('Dashboard')}
                    className="px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] text-[#6B7280] border-2 border-[#E5EAF2] hover:bg-[#F9FAFB] transition-all"
                  >
                    Back
                  </button>
                  <button
                    disabled={!allUploaded || !termsAccepted || !consentGiven || isSubmitting}
                    onClick={handleSubmit}
                    className={`px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl transition-all relative flex items-center justify-center min-w-[280px] ${allUploaded && termsAccepted && consentGiven && !isSubmitting
                      ? 'bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] text-white shadow-[#5B4BFF]/30 hover:shadow-[#5B4BFF]/50 hover:-translate-y-1'
                      : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed shadow-none'
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit for Verification'
                    )}
                  </button>
                </div>
                {!allUploaded && (
                  <p className="text-[10px] font-bold text-[#EF4444] uppercase tracking-widest animate-pulse">
                    ⚠️ Please upload all required documents to proceed
                  </p>
                )}
                {allUploaded && (!termsAccepted || !consentGiven) && (
                  <p className="text-[10px] font-bold text-[#F79009] uppercase tracking-widest">
                    ⚠️ Please accept terms and give consent to submit
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const AnalyticsSection = ({ data }) => (
  <div className="space-y-12">
    <SectionHeader title="Performance Intelligence" sub="Data-driven insights to scale your partner business" />
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-8 bg-white rounded-[50px] p-12 border border-[#E4E7EC] shadow-2xl shadow-black/5 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <TrendingUp size={80} className="text-[#5B4BFF]/20 mx-auto mb-6" />
          <p className="text-[#98A2B3] font-black text-xl">Interactive Performance Graph</p>
          <p className="text-[#6B7280] font-medium mt-2">Visualizing growth for {data.profile.businessName}</p>
        </div>
      </div>
      <div className="col-span-4 space-y-10">
        <MiniStatCard label="Conversion Rate" value={`${Math.round((data.kpis.monthEarnings / 50000) * 10)}%`} color="#12B76A" />
        <MiniStatCard label="Closure Speed" value="4.2 Days" color="#5B4BFF" />
        <MiniStatCard label="Avg Deal Value" value={`₹${(data.kpis.monthEarnings / (data.leads.length || 1)).toLocaleString()}`} color="#F79009" />
      </div>
    </div>
  </div>
);


export const AISection = ({ data }) => (
  <div className="space-y-12">
    <SectionHeader title="MiTRAA AI Business Core" sub="Next-generation business intelligence and lead forecasting" />
    <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-[60px] p-20 text-white relative overflow-hidden group min-h-[600px] flex flex-col justify-center">
      <div className="absolute top-0 right-0 p-20 opacity-20 group-hover:scale-125 transition-all duration-1000">
        <Zap size={300} fill="#5B4BFF" stroke="none" />
      </div>
      <div className="relative z-10 max-w-4xl space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#5B4BFF] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#5B4BFF]/50 animate-pulse">
            <Zap size={40} fill="white" stroke="none" />
          </div>
          <h2 className="text-5xl font-bold tracking-tight">AI Sales Intelligence</h2>
        </div>
        <p className="text-white/70 text-2xl font-medium leading-relaxed italic border-l-8 border-[#5B4BFF] pl-10">
          "Based on current market trends, {data.leads.length > 0 ? `the **${data.leads[0].name}** lead has a high closure probability` : "expanding your network"} if pitched the **Enterprise Cloud Package** within the next 48 hours."
        </p>
        <div className="grid grid-cols-2 gap-8 pt-10">
          <AIFeature icon="🚀" title="Lead Suggestions" desc="Best matching clients" />
          <AIFeature icon="📈" title="Revenue Forecast" desc="May 2026 Prediction" />
        </div>
      </div>
    </div>
  </div>
);