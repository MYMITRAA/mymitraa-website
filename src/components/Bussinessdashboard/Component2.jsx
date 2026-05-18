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

export const AIFeature = ({ icon, title, desc }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] hover:bg-white/10 transition-all group cursor-pointer">
    <div className="text-4xl mb-6 group-hover:scale-125 transition-transform inline-block">{icon}</div>
    <h4 className="text-2xl font-bold mb-2">{title}</h4>
    <p className="text-white/60 font-medium leading-relaxed">{desc}</p>
  </div>
);


export const NavLink = ({ label, active, onClick }) => (
  <span
    onClick={onClick}
    className={`text-sm font-bold cursor-pointer transition-all relative py-2 ${active ? 'text-[#5B4BFF]' : 'text-[#667085] hover:text-[#5B4BFF]'}`}
  >
    {label}
    {active && <span className="absolute bottom-0 left-0 w-full h-1 bg-[#5B4BFF] rounded-full shadow-[0_0_10px_#5B4BFF]"></span>}
  </span>
);


export const PremiumMiniStatusCard = ({ label, value, sub, icon }) => (
  <div className="bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:border-[#5B4BFF]/30 transition-all group cursor-pointer flex items-center gap-8">
    <div className="w-16 h-16 rounded-2xl bg-[#F4F2FF] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-1">{label}</p>
      <h4 className="text-3xl font-bold text-[#1F1F2E] mb-1">{value}</h4>
      <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest opacity-60">{sub}</p>
    </div>
  </div>
);


export const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`sidebar-btn-premium ${active ? 'active' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);


export const GlassWidget = ({ label, value, sub, icon }) => (
  <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/15 transition-all group">
    <div className="flex items-center gap-4 mb-4 opacity-70">
      {icon}
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{label}</p>
    </div>
    <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
    <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">{sub}</p>
  </div>
);


export const PremiumStatCard = ({ label, value, growth, sub, icon, color, badge, progress }) => (
  <div className="executive-card p-10 group relative overflow-hidden">
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${color}15`, color }}>
        {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="bg-[#F3F4F6] text-[#6B7280] px-3 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">{badge}</span>
        <div className={`flex items-center gap-1 font-bold text-xs text-[#12B76A]`}>
          <ArrowUpRight size={14} /> {growth}
        </div>
      </div>
    </div>
    <div className="space-y-1">
      <h4 className="text-4xl font-bold text-[#1F1F2E] tracking-tight">{value}</h4>
      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">{label}</p>
    </div>
    {progress && (
      <div className="mt-6 h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
        <div className="h-full bg-[#5B4BFF]" style={{ width: `${progress}%` }} />
      </div>
    )}
    <p className="mt-4 text-[10px] font-medium text-[#D1D5DB]">{sub}</p>
  </div>
);


export const QuickActionCard = ({ icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white p-8 rounded-[32px] border border-[#E4E7EC] shadow-sm hover:shadow-2xl hover:border-[#5B4BFF]/40 transition-all duration-300 group flex flex-col items-center text-center gap-6"
  >
    <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" style={{ backgroundColor: `${color}10`, color }}>
      {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
    </div>
    <span className="text-[10px] font-black text-[#1F1F2E] uppercase tracking-[0.15em] leading-tight">{label}</span>
  </button>
);


export const AlertRow = ({ type, title, desc, time, isNew }) => (
  <div className="flex gap-6 p-6 rounded-3xl hover:bg-[#F9FAFB] border border-transparent hover:border-[#F3F4F6] transition-all group cursor-pointer relative">
    {isNew && <div className="absolute top-8 left-2 w-2 h-2 bg-[#5B4BFF] rounded-full shadow-[0_0_10px_#5B4BFF]"></div>}
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${type === 'Opportunity' ? 'bg-[#F4F2FF] text-[#5B4BFF] group-hover:bg-[#5B4BFF] group-hover:text-white' : type === 'Financial' ? 'bg-[#ECFDF3] text-[#12B76A] group-hover:bg-[#12B76A] group-hover:text-white' : 'bg-[#FFF9F5] text-[#F79009] group-hover:bg-[#F79009] group-hover:text-white'}`}>
      {type === 'Opportunity' ? <Zap size={20} /> : type === 'Financial' ? <IndianRupee size={20} /> : <Bell size={20} />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-1 gap-4">
        <h4 className="text-lg font-bold text-[#1F1F2E] truncate group-hover:text-[#5B4BFF] transition-colors">{title}</h4>
        <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest shrink-0">{time}</span>
      </div>
      <p className="text-sm font-medium text-[#6B7280] leading-relaxed line-clamp-2">{desc}</p>
    </div>
  </div>
);


export const ResourceCard = ({ category, title, type, size, icon, color = "#5B4BFF", url }) => (
  <div
    onClick={() => url && window.open(url, '_blank')}
    className="bg-white p-8 rounded-[32px] border border-[#E4E7EC] shadow-sm hover:shadow-xl hover:border-[#5B4BFF]/50 transition-all group flex flex-col cursor-pointer"
  >
    <div className="flex justify-between items-start mb-8">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: `${color}15`, color }}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <span className="bg-[#F9FAFB] px-3 py-1.5 rounded-lg text-[9px] font-bold text-[#6B7280] uppercase tracking-widest border border-[#F3F4F6]">{type}</span>
    </div>
    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{category}</p>
    <h3 className="text-xl font-bold text-[#1F1F2E] mb-6 group-hover:text-[#5B4BFF] transition-colors line-clamp-2">{title}</h3>
    <div className="mt-auto pt-6 border-t border-[#F3F4F6] flex justify-between items-center">
      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{size}</span>
      <button className="text-[#5B4BFF] bg-[#F5F4FF] w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#5B4BFF] hover:text-white transition-all shadow-sm">
        <ArrowUpRight size={18} />
      </button>
    </div>
  </div>
);



export const SupportBadge = ({ icon, title, desc, color }) => (
  <div className="bg-white p-4 lg:p-6 rounded-2xl border border-[#F3F4F6] flex flex-col xl:flex-row items-center xl:items-start gap-2 xl:gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 text-center xl:text-left">
    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: `${color}15`, color }}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h4 className="text-[12px] lg:text-[15px] font-bold text-[#1F1F2E] mb-1 leading-tight group-hover:text-[#5B4BFF] transition-colors">{title}</h4>
      <p className="text-[8px] lg:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-tight">{desc}</p>
    </div>
  </div>
);


export const SupportQuickCard = ({ icon, title, desc, cta, color, onClick }) => (
  <div className="bg-white p-5 md:p-6 lg:p-8 rounded-[32px] border border-[#F3F4F6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full">
    <div className="relative z-10 text-center lg:text-left flex flex-col lg:block items-center">
      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-[20px] flex items-center justify-center mb-4 lg:mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: `${color}15`, color }}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-sm md:text-base lg:text-xl font-bold text-[#1F1F2E] mb-1 lg:mb-2 group-hover:text-[#5B4BFF] transition-colors leading-tight">{title}</h3>
      <p className="text-[10px] md:text-[11px] lg:text-xs font-semibold text-[#6B7280] leading-tight">{desc}</p>
    </div>
    <button 
      onClick={onClick}
      className="mt-6 lg:mt-10 w-full bg-white text-[#1F1F2E] py-3 lg:py-4 rounded-xl font-bold text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-widest border border-[#E5E7EB] group-hover:bg-[#5B4BFF] group-hover:text-white group-hover:border-[#5B4BFF] transition-all shadow-sm line-clamp-1 px-2"
    >
      {cta}
    </button>
  </div>
);


export const TicketRow = ({ id, issue, created, priority, assignedTo, status, expected }) => {
  let statusClasses = 'bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]';
  if (status === 'In Progress') statusClasses = 'bg-[#EFF6FF] text-[#3B82F6] border-[#3B82F6]/20 shadow-[0_2px_10px_rgba(59,130,246,0.1)]';
  if (status === 'Open') statusClasses = 'bg-[#FFFBEB] text-[#F59E0B] border-[#F59E0B]/20 shadow-[0_2px_10px_rgba(245,158,11,0.1)]';
  if (status === 'Resolved') statusClasses = 'bg-[#ECFDF3] text-[#12B76A] border-[#12B76A]/20 shadow-[0_2px_10px_rgba(18,183,106,0.1)]';
  if (status === 'Escalated') statusClasses = 'bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]/20 shadow-[0_2px_10px_rgba(239,68,68,0.1)]';

  let priorityClasses = 'bg-[#F9FAFB] text-[#6B7280] border-[#F3F4F6]';
  if (priority === 'High') priorityClasses = 'bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]/20';
  if (priority === 'Medium') priorityClasses = 'bg-[#FFFBEB] text-[#F59E0B] border-[#F59E0B]/20';

  let actionText = 'Track';
  if (status === 'Resolved') actionText = 'View';
  else if (status === 'Escalated') actionText = 'Escalate';

  return (
    <tr className="hover:bg-[#F9FAFB] hover:shadow-inner transition-all group border-l-4 border-transparent hover:border-[#5B4BFF]">
      <td className="px-6 py-6 text-[11px] font-bold text-[#5B4BFF] uppercase tracking-widest group-hover:text-[#4A3AFF] transition-colors whitespace-nowrap">{id}</td>
      <td className="px-6 py-6 text-[14px] font-bold text-[#1F1F2E] whitespace-nowrap">{issue}</td>
      <td className="px-6 py-6 text-[12px] font-medium text-[#6B7280] whitespace-nowrap">{created}</td>
      <td className="px-6 py-6 whitespace-nowrap">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${priorityClasses}`}>
          {priority}
        </span>
      </td>
      <td className="px-6 py-6 text-[13px] font-semibold text-[#1F1F2E] whitespace-nowrap flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#EEF0FF] flex items-center justify-center text-[#5B4BFF] text-[9px]">{assignedTo.charAt(0)}</div>
        {assignedTo}
      </td>
      <td className="px-6 py-6 whitespace-nowrap">
        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-colors ${statusClasses}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-6 text-[12px] font-medium text-[#6B7280] whitespace-nowrap">{expected}</td>
      <td className="px-6 py-6 text-right whitespace-nowrap">
        <button className="text-[#1F1F2E] font-bold text-[10px] uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-[#F3F4F6] group-hover:bg-[#5B4BFF] group-hover:text-white group-hover:border-[#5B4BFF] group-hover:shadow-[0_4px_15px_rgba(91,75,255,0.3)] group-hover:-translate-y-0.5 transition-all shadow-sm">{actionText}</button>
      </td>
    </tr>
  );
};


export const HistoryTimelineItem = ({ title, date, status }) => (
  <div className="relative pl-12 pb-12 last:pb-0 group">
    {/* Connecting Line */}
    <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-[#F3F4F6] group-last:hidden"></div>
    {/* Timeline Dot/Icon */}
    <div className="absolute left-0 top-1 w-12 h-12 bg-white border-2 border-[#E5E7EB] rounded-full flex items-center justify-center shadow-md z-10 group-hover:border-[#5B4BFF] group-hover:scale-110 transition-all duration-300">
      <CheckCircle2 size={20} className="text-[#9CA3AF] group-hover:text-[#5B4BFF] transition-colors" />
    </div>
    <div className="bg-white border border-[#F3F4F6] p-6 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-[#5B4BFF]/30 transition-all duration-300 group-hover:-translate-y-1 ml-2">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-[17px] font-bold text-[#1F1F2E]">{title}</h4>
        <span className="inline-block bg-[#ECFDF3] text-[#12B76A] px-3 py-1 rounded-lg border border-[#12B76A]/20 text-[9px] font-bold uppercase tracking-widest shadow-sm">{status}</span>
      </div>
      <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">{date}</p>
      <p className="text-[13px] font-medium text-[#6B7280] mt-3 leading-relaxed">System logs reviewed and updated. Issue has been completely resolved and closed by the engineering team.</p>
    </div>
  </div>
);


export const KBCard = ({ title, desc, icon }) => (
  <div className="bg-white p-8 rounded-[32px] border border-[#F3F4F6] hover:border-[#5B4BFF]/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(91,75,255,0.08)] hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col items-start relative overflow-hidden">
    {/* Top accent line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5B4BFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 w-full">
      <div className="w-16 h-16 bg-[#F9FAFB] border border-[#F3F4F6] rounded-[20px] flex items-center justify-center text-[#9CA3AF] mb-8 shadow-sm group-hover:bg-gradient-to-br group-hover:from-[#5B4BFF] group-hover:to-[#8B7CFF] group-hover:text-white group-hover:border-transparent transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#5B4BFF]/30">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h4 className="text-[19px] font-bold text-[#1F1F2E] mb-2 group-hover:text-[#5B4BFF] transition-colors">{title}</h4>
      <p className="text-[13px] font-medium text-[#6B7280] leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest group-hover:text-[#5B4BFF] transition-colors">
        Read Article <ArrowUpRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </div>
  </div>
);

export const PremiumLeadRow = ({ name, industry, value, status, time, revenue }) => (
  <div className="bg-white p-7 rounded-3xl border border-[#E5E7EB] hover:border-[#5B4BFF] hover:shadow-xl transition-all duration-300 flex items-center justify-between group">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-[#F9FAFB] rounded-2xl flex items-center justify-center text-2xl font-bold text-[#5B4BFF] group-hover:bg-[#5B4BFF] group-hover:text-white transition-all shadow-sm">
        {name[0]}
      </div>
      <div>
        <h4 className="text-lg font-bold text-[#1F1F2E]">{name}</h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs font-semibold text-[#6B7280]">{industry}</span>
          <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
          <span className="text-xs font-medium text-[#9CA3AF]">{time}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-12 text-right">
      <div>
        <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Lead Value</p>
        <p className="text-lg font-bold text-[#1F1F2E]">{value}</p>
      </div>
      <div className="min-w-[110px] text-center">
        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${status === 'HOT' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
          {status}
        </span>
      </div>
      <button className="w-12 h-12 rounded-2xl bg-[#F9FAFB] text-[#D1D5DB] hover:text-[#5B4BFF] hover:bg-[#F4F2FF] transition-all flex items-center justify-center">
        <ExternalLink size={20} />
      </button>
    </div>
  </div>
);


export const LuxuryActionCard = ({ title, icon, desc, color = "#5B4BFF" }) => (
  <button className="executive-card p-10 group text-left relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#5B4BFF]/5 rounded-bl-[80px] group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ backgroundColor: `${color}15`, color: color }}>
      {React.cloneElement(icon, { size: 32, strokeWidth: 2.5 })}
    </div>
    <div>
      <p className="text-2xl font-bold text-[#111827] mb-2 group-hover:text-[#5B4BFF] transition-colors">{title}</p>
      <p className="text-sm font-medium text-[#667085] leading-relaxed">{desc}</p>
    </div>
  </button>
);


export const AchievementBlock = ({ title, sub, points, icon }) => (
  <div className="flex items-center justify-between group cursor-pointer hover:translate-x-2 transition-all duration-300">
    <div className="flex items-center gap-5">
      <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center text-3xl group-hover:bg-white group-hover:shadow-lg transition-all border border-[#F3F4F6]">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-[#1F1F2E]">{title}</p>
        <p className="text-sm font-semibold text-[#6B7280]">{sub}</p>
      </div>
    </div>
    <span className="bg-[#5B4BFF] text-white px-5 py-2 rounded-full text-[11px] font-bold shadow-lg shadow-[#5B4BFF]/20">{points}</span>
  </div>
);


export const PowerBar = ({ city, val, per, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <div>
        <p className="text-sm font-bold text-[#111827]">{city}</p>
        <p className="text-[10px] font-medium text-[#667085] uppercase tracking-[0.1em]">Region Market</p>
      </div>
      <p className="text-lg font-bold text-[#5B4BFF]">{val}</p>
    </div>
    <div className="h-3 w-full bg-[#F2F4F7] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${per}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full shadow-[0_0_10px_currentColor]"
        style={{ backgroundColor: color, color: color }}
      />
    </div>
  </div>
);


export const IconButton = ({ icon, count, onClick }) => (
  <div 
    onClick={onClick}
    className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-[#E4E7EC] hover:border-[#5B4BFF] hover:shadow-2xl transition-all cursor-pointer group"
  >
    <div className="text-[#667085] group-hover:text-[#5B4BFF] transition-colors">{icon}</div>
    {count && (
      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#F04438] border-4 border-white rounded-full text-[10px] flex items-center justify-center text-white font-bold shadow-lg">
        {count}
      </span>
    )}
  </div>
);


export const CustomDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="text-xs font-black text-[#1F1F2E] uppercase tracking-widest ml-1">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#F9FAFB] border-2 ${isOpen ? 'border-[#12B76A] bg-white ring-4 ring-[#12B76A]/5' : 'border-[#F3F4F6]'} rounded-2xl py-4 px-6 text-sm font-bold text-[#1F1F2E] cursor-pointer flex items-center justify-between transition-all`}
      >
        <span>{value}</span>
        <ChevronDown size={18} className={`text-[#9CA3AF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#F3F4F6] rounded-2xl shadow-2xl z-[110] overflow-hidden p-2"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${value === opt.value ? 'bg-[#ECFDF3] text-[#12B76A]' : 'text-[#4B5563] hover:bg-[#F9FAFB]'
                  }`}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const ProgressStatus = ({ label, completed, missing }) => (
  <div className="flex items-center gap-3">
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${completed ? 'bg-[#ECFDF3] text-[#12B76A] border-[#12B76A]/20' : 'bg-[#FFF9F5] text-[#F79009] border-[#F79009]/20'}`}>
      {completed ? <CheckCircle2 size={16} /> : <AlertOctagon size={16} />}
    </div>
    <div>
      <p className="text-[10px] font-black text-[#1F1F2E] uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className={`text-[9px] font-bold uppercase tracking-widest ${completed ? 'text-[#12B76A]' : 'text-[#F79009]'}`}>
        {completed ? "Completed ✅" : (missing || "Incomplete ⚠️")}
      </p>
    </div>
  </div>
);


export const SettingsCard = ({ title, sub, icon, accentColor, children }) => (
  <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1" style={{ background: accentColor }}></div>
    <div className="p-10">
      <div className="flex items-center gap-6 mb-10 pb-8 border-b border-[#F3F4F6]">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ backgroundColor: '#F5F3FF', color: '#5B4BFF' }}>
          {React.cloneElement(icon, { size: 28, strokeWidth: 2.5 })}
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#111827] tracking-tight">{title}</h3>
          <p className="text-sm font-semibold text-[#6B7280]">{sub}</p>
        </div>
      </div>
      {children}
    </div>
  </div>
);


export const SettingsTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-6 py-4 rounded-xl text-sm font-black transition-all flex items-center justify-between group ${active ? 'bg-[#5B4BFF] text-white shadow-xl shadow-[#5B4BFF]/20' : 'text-[#6B7280] hover:bg-[#F9FAFB]'
      }`}
  >
    {label}
    {!active && <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#5B4BFF] transition-all"></div>}
  </button>
);