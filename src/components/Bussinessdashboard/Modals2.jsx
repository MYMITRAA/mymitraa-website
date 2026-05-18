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

export const OrderModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    strategicValue: '',
    paymentStatus: 'Pending',
    clientEntity: '',
    deliveryDate: '',
    projectStatus: 'Scheduled'
  });

  const paymentOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Partial', value: 'Partial' }
  ];

  const projectStatusOptions = [
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  const isValid = formData.projectName && formData.strategicValue && formData.clientEntity && formData.deliveryDate;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#111827]/30 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
      >
        {/* Premium Gradient Header */}
        <div className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-10 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all border border-white/10 backdrop-blur-md group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-xl">
              <Package size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Initiate Order</h2>
              <p className="text-white/60 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Strategic Project Pipeline Core</p>
            </div>
          </div>
        </div>

        {/* High-Performance Form Body */}
        <div className="p-10 lg:p-12 space-y-10">
          <div className="grid grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Website Development"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-4 px-6 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Strategic Value</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg font-bold text-[#9CA3AF]">₹</span>
                  <input
                    type="text"
                    placeholder="e.g. 1,50,000"
                    value={formData.strategicValue}
                    onChange={(e) => setFormData({ ...formData, strategicValue: e.target.value })}
                    className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-4 pl-12 pr-6 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                  />
                </div>
              </div>

              <CustomDropdown
                label="Payment Status"
                value={formData.paymentStatus}
                options={paymentOptions}
                onChange={(val) => setFormData({ ...formData, paymentStatus: val })}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Client Entity</label>
                <input
                  type="text"
                  placeholder="e.g. ABC Pvt Ltd"
                  value={formData.clientEntity}
                  onChange={(e) => setFormData({ ...formData, clientEntity: e.target.value })}
                  className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-4 px-6 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#1F1F2E] uppercase tracking-widest ml-1">Delivery Date</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full bg-[#F5F7FB] border-2 border-[#F3F4F6] rounded-[18px] py-4 px-6 text-sm font-bold focus:border-[#4F46E5] focus:bg-white focus:ring-[12px] ring-[#4F46E5]/5 outline-none transition-all"
                />
              </div>

              <CustomDropdown
                label="Project Status"
                value={formData.projectStatus}
                options={projectStatusOptions}
                onChange={(val) => setFormData({ ...formData, projectStatus: val })}
              />
            </div>
          </div>

          {/* Luxury Footer Actions */}
          <div className="flex gap-6 pt-6">
            <button
              onClick={onClose}
              className="flex-1 py-5 border-2 border-[#E5E7EB] text-[#6B7280] rounded-full font-black text-sm hover:bg-[#F9FAFB] transition-all uppercase tracking-[0.15em]"
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              onClick={() => onSubmit(formData)}
              className="flex-[2] py-5 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white rounded-full font-black text-sm shadow-2xl shadow-[#4F46E5]/40 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] active:scale-[0.98] disabled:opacity-50 transition-all uppercase tracking-[0.15em] relative overflow-hidden"
            >
              <span className="relative z-10">Confirm Strategic Order</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


export const MapPickerModal = ({ onClose, onSave }) => (
  <div className="fixed inset-0 bg-[#111827]/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
    >
      <div className="p-8 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]">
        <div>
          <h3 className="text-xl font-black text-[#111827]">Pin Business Location</h3>
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mt-1">Select your precise operational coordinate</p>
        </div>
        <button onClick={onClose} className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#E5E7EB] hover:bg-red-50 hover:text-red-500 transition-all">
          <X size={20} />
        </button>
      </div>
      <div className="h-[400px] bg-[#EEF2F6] flex items-center justify-center relative group">
        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=13&size=600x400&key=MOCK_KEY')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col items-center gap-4 text-center p-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <MapPin size={32} className="text-[#EF4444]" />
          </div>
          <p className="text-sm font-black text-[#111827] bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white">28.6139° N, 77.2090° E</p>
        </div>
      </div>
      <div className="p-8 flex justify-end gap-4">
        <button onClick={onClose} className="px-8 py-4 font-black text-[11px] uppercase tracking-widest text-[#6B7280]">Cancel</button>
        <button
          onClick={() => {
            onSave({ lat: 28.6139, lng: 77.2090 });
            onClose();
          }}
          className="bg-[#5B4BFF] text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-[#5B4BFF]/20"
        >
          Confirm Location
        </button>
      </div>
    </motion.div>
  </div>
);