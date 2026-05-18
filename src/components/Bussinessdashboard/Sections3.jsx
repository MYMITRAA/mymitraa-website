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

export const SettingsSection = ({ data, updateDbData, setActiveTab }) => {
  const [activeSubTab, setActiveSubTab] = useState('Profile Details');
  const [profile, setProfile] = useState({ ...data.profile });
  const [bank, setBank] = useState({ ...data.bank });
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate GET /partner/profile
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length <= 10) setProfile(prev => ({ ...prev, [name]: onlyNums }));
      return;
    }
    if (name === 'description' && value.length > 250) return;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    if (name === 'accountNumber') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      setBank(prev => ({ ...prev, [name]: onlyNums }));
      return;
    }
    let finalValue = value;
    if (['ifscCode', 'gstNumber', 'panNumber'].includes(name)) {
      finalValue = value.toUpperCase();
    }
    setBank(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSave = () => {
    // Simulate PUT /partner/profile
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      updateDbData({ profile });
      alert("Profile updated successfully! 🚀");
    }, 1500);
  };

  const renderSubContent = () => {
    switch (activeSubTab) {
      case 'Profile Details':
        if (isLoading) {
          return (
            <div className="space-y-10 animate-pulse">
              <div className="bg-white rounded-[32px] p-12 h-[400px] border border-[#F3F4F6]"></div>
              <div className="bg-white rounded-[32px] p-12 h-[300px] border border-[#F3F4F6]"></div>
            </div>
          );
        }
        return (
          <div className="space-y-10">
            {/* Section 1: Business Profile */}
            <SettingsCard
              title="Business Profile"
              sub="Define your business identity and legal structure"
              icon={<Briefcase />}
              accentColor="linear-gradient(to right, #5B4BFF, #8B7CFF)"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SettingsField label="Company Name" name="businessName" value={profile.businessName} onChange={handleProfileChange} placeholder="e.g. Kumar Enterprises" />
                <SettingsField label="Professional Email" name="email" value={profile.email} onChange={() => { }} disabled placeholder="business@mitraa.com" />
                <SettingsField label="Industry Sector" name="industry" value={profile.industry} onChange={handleProfileChange} placeholder="e.g. Fintech, Technology" />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-4">Business Type</label>
                  <select name="businessType" value={profile.businessType} onChange={handleProfileChange} className="w-full bg-[#F9FAFB] border-none p-5 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20">
                    <option value="">Select Type</option>
                    <option>Sole Proprietor</option>
                    <option>Partnership</option>
                    <option>Pvt Ltd Company</option>
                    <option>LLP</option>
                    <option>Startup (Registered)</option>
                    <option>Freelancer</option>
                  </select>
                </div>
                <SettingsField label="Year Established" name="establishedYear" value={profile.establishedYear} onChange={handleProfileChange} type="number" placeholder="e.g. 2020" />
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex justify-between items-center ml-4">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Business Description</label>
                  <span className={`text-[10px] font-bold ${profile.description?.length >= 250 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>{profile.description?.length || 0} / 250</span>
                </div>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleProfileChange}
                  placeholder="Describe your business in 2–4 lines..."
                  className="w-full bg-[#F9FAFB] border-none p-6 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20 min-h-[120px] transition-all focus:bg-white resize-none"
                />
              </div>
            </SettingsCard>

            {/* Section 2: Address & Contact Details */}
            <SettingsCard
              title="Address & Contact Details"
              sub="Provide your business location and contact info"
              icon={<MapPin />}
              accentColor="linear-gradient(to right, #12B76A, #32D583)"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SettingsField label="Owner Full Name" name="name" value={profile.name} onChange={handleProfileChange} placeholder="e.g. Rajesh Kumar" />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-4">Mobile Number</label>
                  <div className="flex gap-3">
                    <select className="bg-[#F9FAFB] border-none px-4 rounded-2xl font-bold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20">
                      <option>🇮🇳 IN +91</option>
                      <option>🇺🇸 US +1</option>
                      <option>🇬🇧 GB +44</option>
                      <option>🇨🇦 CA +1</option>
                      <option>🇦🇺 AU +61</option>
                      <option>🇸🇬 SG +65</option>
                      <option>🇦🇪 AE +971</option>
                      <option>🇩🇪 DE +49</option>
                      <option>🇫🇷 FR +33</option>
                      <option>🇯🇵 JP +81</option>
                      <option>🇸🇦 SA +966</option>
                      <option>🇧🇷 BR +55</option>
                      <option>🇿🇦 ZA +27</option>
                      <option>🇳🇿 NZ +64</option>
                    </select>
                    <input
                      name="mobile"
                      value={profile.mobile}
                      onChange={handleProfileChange}
                      placeholder="9876543210"
                      className="flex-1 bg-[#F9FAFB] border-none p-5 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20 transition-all focus:bg-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-4">Business Address</label>
                  <textarea
                    name="addressLine1"
                    value={profile.addressLine1}
                    onChange={handleProfileChange}
                    placeholder="Street, area, landmark"
                    className="w-full bg-[#F9FAFB] border-none p-6 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#5B4BFF]/20 min-h-[100px] transition-all focus:bg-white resize-none"
                  />
                </div>
                <SettingsField label="PIN Code" name="pincode" value={profile.pincode} onChange={handleProfileChange} placeholder="e.g. 110001" />
                <SettingsField label="City" name="city" value={profile.city} onChange={handleProfileChange} placeholder="e.g. New Delhi" />
              </div>

              <div className="mt-10 p-8 bg-[#F8FAFF] rounded-[32px] border border-[#5B4BFF]/10 flex flex-col md:flex-row items-center justify-between gap-6 group hover:shadow-xl transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Navigation className="text-[#5B4BFF]" size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#111827]">Geospatial Positioning</h4>
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">Pin your office location for logistics & audits</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="bg-white text-[#5B4BFF] border border-[#5B4BFF]/30 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-sm hover:bg-[#5B4BFF] hover:text-white transition-all flex items-center gap-3"
                >
                  <MapPin size={18} /> Pin Location on Map
                </button>
              </div>
            </SettingsCard>

            <div className="flex justify-between items-center pt-10 border-t border-[#F3F4F6]">
              <button onClick={() => setActiveTab('Dashboard')} className="px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-[#6B7280] hover:bg-[#F9FAFB] transition-all">Back to Dashboard</button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-[#5B4BFF] to-[#8B7CFF] text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-[#5B4BFF]/30 hover:shadow-[#5B4BFF]/50 hover:-translate-y-1 transition-all min-w-[240px] flex items-center justify-center ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Updating Profile...</span>
                  </div>
                ) : (
                  'Save Configuration'
                )}
              </button>
            </div>

            <AnimatePresence>
              {isMapModalOpen && (
                <MapPickerModal
                  onClose={() => setIsMapModalOpen(false)}
                  onSave={(coords) => {
                    setProfile(prev => ({ ...prev, location: coords }));
                    alert(`Location pinned: ${coords.lat}, ${coords.lng}`);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        );
      case 'Bank & Financials':
        return (
          <div className="space-y-10">
            <SettingsCard
              title="Bank & Financials"
              sub="Securely manage your settlement accounts and tax credentials"
              icon={<IndianRupee />}
              accentColor="linear-gradient(to right, #16a34a, #22c55e)"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SettingsField label="Account Holder Name" name="holderName" value={bank.holderName} onChange={handleBankChange} placeholder="e.g. Rajesh Kumar" />
                <SettingsField label="Bank Name" name="bankName" value={bank.bankName} onChange={handleBankChange} placeholder="e.g. HDFC Bank" />
                <SettingsField label="Account Number" name="accountNumber" value={bank.accountNumber} onChange={handleBankChange} placeholder="e.g. 50100422319088" />
                <SettingsField label="IFSC Code" name="ifscCode" value={bank.ifscCode} onChange={handleBankChange} placeholder="e.g. HDFC0001234" />
                <SettingsField label="Branch Name" name="branchName" value={bank.branchName} onChange={handleBankChange} placeholder="e.g. Gurgaon Sector 43" />
                <SettingsField label="UPI ID" name="upiId" value={bank.upiId} onChange={handleBankChange} placeholder="e.g. name@bank" />
                <SettingsField label="GST Number" name="gstNumber" value={bank.gstNumber} onChange={handleBankChange} placeholder="e.g. 27AAACK1234A1Z1" />
                <SettingsField label="PAN Number" name="panNumber" value={bank.panNumber} onChange={handleBankChange} placeholder="e.g. ABCDE1234F" />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-4">Payout Preference</label>
                  <select name="payoutPreference" value={bank.payoutPreference} onChange={handleBankChange} className="w-full bg-[#F9FAFB] border-none p-5 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#16a34a]/20">
                    <option>Direct Bank Transfer</option>
                    <option>UPI Instant Settlement</option>
                    <option>Wallet Payout</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-4">Primary Payment Method</label>
                  <select name="primaryPaymentMethod" value={bank.primaryPaymentMethod} onChange={handleBankChange} className="w-full bg-[#F9FAFB] border-none p-5 rounded-2xl font-semibold text-[#111827] outline-none focus:ring-2 ring-[#16a34a]/20">
                    <option>Bank Account</option>
                    <option>UPI</option>
                    <option>Business Debit Card</option>
                  </select>
                </div>
              </div>

              <div className="mt-12 flex justify-end">
                <button
                  onClick={() => {
                    updateDbData({ bank });
                    alert("Financial details updated successfully! 💸");
                  }}
                  className="bg-[#16a34a] text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#16a34a]/30 hover:shadow-[#16a34a]/50 hover:-translate-y-1 transition-all"
                >
                  Update Financials
                </button>
              </div>
            </SettingsCard>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
            <div className="w-24 h-24 bg-[#F9FAFB] rounded-full flex items-center justify-center text-[#D1D5DB]">
              <Settings size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1F1F2E]">{activeSubTab}</h3>
              <p className="text-sm font-medium text-[#6B7280] max-w-sm">This section is currently being optimized for your enterprise profile. Detailed configuration will be available shortly.</p>
            </div>
            <button onClick={() => setActiveSubTab('Profile Details')} className="text-[#5B4BFF] font-bold text-xs uppercase tracking-widest">Return to Profile</button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F6F8FC] -m-12 p-12 min-h-screen">
      <SectionHeader title="Portal Customization" sub="Manage your professional credentials, security, and platform experience" />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-80 shrink-0 space-y-2">
          {['Profile Details', 'Security & Password', 'Bank & Financials'].map(tab => (
            <SettingsTab key={tab} label={tab} active={activeSubTab === tab} onClick={() => setActiveSubTab(tab)} />
          ))}
        </div>
        <div className="flex-1 min-h-[600px]">
          {renderSubContent()}
        </div>
      </div>
    </div>
  );
};