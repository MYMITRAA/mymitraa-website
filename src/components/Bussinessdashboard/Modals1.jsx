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

export const DocumentPreviewModal = ({ doc, onClose }) => {
  const [fileUrl, setFileUrl] = useState(null);

  React.useEffect(() => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [doc.file]);

  const isImage = doc.file && doc.file.type.startsWith('image/');
  const isPdf = doc.file && doc.file.type === 'application/pdf';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#111827]/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[85vh]"
      >
        <div className="p-8 border-b border-[#F3F4F6] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#F5F4FF] text-[#5B4BFF] rounded-2xl flex items-center justify-center">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1F1F2E]">{doc.name}</h3>
              <p className="text-xs font-semibold text-[#6B7280]">{doc.sub || 'Document'} • {doc.status}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-14 h-14 bg-[#F9FAFB] hover:bg-[#F0F2F5] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#111827] transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 bg-[#F9FAFB] custom-scrollbar">
          {fileUrl ? (
            <div className="w-full h-full min-h-[600px] bg-white rounded-3xl border border-[#E5EAF2] overflow-hidden flex items-center justify-center">
              {isImage ? (
                <img src={fileUrl} alt="preview" className="max-w-full max-h-full object-contain" />
              ) : isPdf ? (
                <iframe src={fileUrl} className="w-full h-full border-none" title="PDF Preview" />
              ) : (
                <div className="text-center p-20">
                  <FileText size={80} className="text-[#5B4BFF]/20 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-[#1F1F2E]">Preview Not Available</h4>
                  <p className="text-[#6B7280] mt-2">This file type cannot be previewed directly. Please download to view.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[32px] border border-[#E5EAF2] p-20 min-h-[1000px] shadow-sm relative">
              {/* Fallback Premium Placeholder */}
              <div className="absolute top-10 right-10 opacity-10">
                <ShieldCheck size={120} />
              </div>
              <div className="space-y-12 max-w-3xl mx-auto">
                <div className="flex justify-between items-start border-b-2 border-[#F3F4F6] pb-10">
                  <div>
                    <h1 className="text-4xl font-black text-[#111827] mb-2 uppercase tracking-tight">MiTRAA ENTERPRISE</h1>
                    <p className="text-sm font-bold text-[#5B4BFF] tracking-widest uppercase">Verified Business Credential</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Document Hash</p>
                    <p className="text-[11px] font-mono font-bold text-[#4B5563]">0x78a...b92c</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Entity Name</p>
                    <p className="text-lg font-bold text-[#1F1F2E]">Kumar Enterprises Pvt Ltd</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Verification ID</p>
                    <p className="text-lg font-bold text-[#1F1F2E]">MIT-VER-2026-09</p>
                  </div>
                </div>

                <div className="space-y-6 pt-10">
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-full"></div>
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-5/6"></div>
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-full"></div>
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-4/6"></div>
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-full"></div>
                  <div className="h-4 bg-[#F9FAFB] rounded-full w-3/4"></div>
                </div>

                <div className="pt-20 flex flex-col items-center">
                  <div className="w-32 h-32 border-4 border-[#F3F4F6] rounded-3xl mb-4 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#F9FAFB] rounded-xl flex items-center justify-center text-[#E5EAF2]">QR</div>
                  </div>
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Scan to Verify Authenticity</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-[#F3F4F6] bg-white flex justify-between items-center px-12">
          <p className="text-sm font-medium text-[#6B7280]">Securely encrypted with AES-256 Bit SSL Protocol</p>
          <button
            onClick={() => {
              if (fileUrl) {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = doc.name;
                link.click();
              }
            }}
            className="bg-[#5B4BFF] text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#5B4BFF]/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Download size={18} /> DOWNLOAD ORIGINAL
          </button>
        </div>
      </motion.div>
    </div>
  );
};


export const LeadModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    priority: 'HOT',
    industry: '',
    followUp: '',
    source: 'Website Form'
  });

  const priorityOptions = [
    { label: 'HOT (Immediate Focus)', value: 'HOT' },
    { label: 'MEDIUM', value: 'MEDIUM' },
    { label: 'LOW', value: 'LOW' }
  ];

  const sourceOptions = [
    { label: 'Website Form', value: 'Website Form' },
    { label: 'Referral', value: 'Referral' },
    { label: 'Cold Call', value: 'Cold Call' },
    { label: 'Campaign', value: 'Campaign' },
    { label: 'Other', value: 'Other' }
  ];

  const isValid = formData.name && formData.value;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#111827]/40 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#12B76A] to-[#32D583] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-3xl font-black tracking-tight">New Opportunity</h2>
          <p className="text-white/80 font-bold text-xs uppercase tracking-widest mt-1">Growth & Pipeline Core Engine</p>
        </div>

        {/* Form */}
        <div className="p-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. TechMart Solutions"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F9FAFB] border-2 border-[#F3F4F6] rounded-2xl py-4 px-6 text-sm font-medium focus:border-[#12B76A] focus:bg-white focus:ring-4 ring-[#12B76A]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Estimated Opportunity Value</label>
                <input
                  type="text"
                  placeholder="e.g. ₹5.2L"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full bg-[#F9FAFB] border-2 border-[#F3F4F6] rounded-2xl py-4 px-6 text-sm font-medium focus:border-[#12B76A] focus:bg-white focus:ring-4 ring-[#12B76A]/5 outline-none transition-all"
                />
              </div>

              <CustomDropdown
                label="Initial Priority"
                value={formData.priority}
                options={priorityOptions}
                onChange={(val) => setFormData({ ...formData, priority: val })}
              />
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Industry Sector</label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise SaaS"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-[#F9FAFB] border-2 border-[#F3F4F6] rounded-2xl py-4 px-6 text-sm font-medium focus:border-[#12B76A] focus:bg-white focus:ring-4 ring-[#12B76A]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Follow-up Strategy</label>
                <input
                  type="text"
                  placeholder="e.g. CEO Meet, Friday"
                  value={formData.followUp}
                  onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                  className="w-full bg-[#F9FAFB] border-2 border-[#F3F4F6] rounded-2xl py-4 px-6 text-sm font-medium focus:border-[#12B76A] focus:bg-white focus:ring-4 ring-[#12B76A]/5 outline-none transition-all"
                />
              </div>

              <CustomDropdown
                label="Lead Source"
                value={formData.source}
                options={sourceOptions}
                onChange={(val) => setFormData({ ...formData, source: val })}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 mt-12">
            <button
              onClick={onClose}
              className="flex-1 py-5 border-2 border-[#E5E7EB] text-[#6B7280] rounded-2xl font-black text-sm hover:bg-[#F9FAFB] transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              onClick={() => onSubmit(formData)}
              className="flex-[2] py-5 bg-gradient-to-r from-[#12B76A] to-[#32D583] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#12B76A]/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all uppercase tracking-widest"
            >
              Register Strategic Opportunity
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


export const ClientModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    primaryContact: '',
    category: 'Enterprise (Premium Tier)',
    repeatClient: false,
    priority: 'High',
    projectValue: '',
    notes: ''
  });

  const categoryOptions = [
    { label: 'Startup', value: 'Startup' },
    { label: 'SME', value: 'SME' },
    { label: 'Enterprise (Premium Tier)', value: 'Enterprise (Premium Tier)' },
    { label: 'Government', value: 'Government' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];

  const isValid = formData.clientName && formData.primaryContact && formData.projectValue;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#111827]/40 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
      >
        {/* Corporate High-Fidelity Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1d4ed8] p-10 text-white relative overflow-hidden">
          {/* Subtle Glossy Effect */}
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-11 h-11 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all border border-white/10 backdrop-blur-md group z-20"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>

          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-xl shadow-2xl">
              <Star size={28} className="text-white opacity-90" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight leading-none">Onboard Client</h2>
              <p className="text-white/40 font-bold text-[9px] uppercase tracking-[0.4em] mt-3">Institutional Relationship Hub</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-10 lg:p-12 space-y-10">
          <div className="grid grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Client Entity Name</label>
                <input
                  type="text"
                  placeholder="e.g. Reliance Industries"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-5 px-8 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Primary Contact</label>
                <input
                  type="text"
                  placeholder="e.g. Mukesh Ambani"
                  value={formData.primaryContact}
                  onChange={(e) => setFormData({ ...formData, primaryContact: e.target.value })}
                  className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-5 px-8 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                />
              </div>

              <CustomDropdown
                label="Account Category"
                value={formData.category}
                options={categoryOptions}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Project Value</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-bold text-[#9CA3AF]">₹</span>
                  <input
                    type="text"
                    placeholder="e.g. 12.5L"
                    value={formData.projectValue}
                    onChange={(e) => setFormData({ ...formData, projectValue: e.target.value })}
                    className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-5 pl-12 pr-8 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#F5F7FB] p-6 rounded-[24px] border-2 border-[#F3F4F6]">
                <div>
                  <p className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest">Repeat Client?</p>
                  <p className="text-[10px] font-bold text-[#9CA3AF] mt-0.5">Existing relationship</p>
                </div>
                <button
                  onClick={() => setFormData({ ...formData, repeatClient: !formData.repeatClient })}
                  className={`w-16 h-9 rounded-full p-1.5 transition-colors duration-500 flex items-center ${formData.repeatClient ? 'bg-[#4F46E5]' : 'bg-[#E5E7EB]'}`}
                >
                  <motion.div
                    animate={{ x: formData.repeatClient ? 28 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full shadow-lg"
                  />
                </button>
              </div>

              <CustomDropdown
                label="Priority Level"
                value={formData.priority}
                options={priorityOptions}
                onChange={(val) => setFormData({ ...formData, priority: val })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Strategic Notes</label>
            <textarea
              placeholder="Describe the strategic potential, key requirements, and growth roadmap for this relationship..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[24px] p-8 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all resize-none h-40 leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-6 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-5 border-2 border-[#E5E7EB] text-[#6B7280] rounded-full font-black text-sm hover:bg-[#F9FAFB] transition-all uppercase tracking-[0.2em]"
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              onClick={() => onSubmit(formData)}
              className="flex-[2] py-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-full font-black text-sm shadow-xl shadow-[#4F46E5]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all uppercase tracking-[0.2em] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="relative z-10">Verify & Onboard Client</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};