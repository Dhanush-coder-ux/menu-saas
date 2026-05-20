export const THEMES = {
  cyberNeon: {
    id: "cyberNeon",
    name: "Cyber Neon",

    // Main Background
    bodyClass:
      "bg-[#060816] text-slate-100",

    // Main Cards
    cardClass:
      "bg-[#0B1220]/80 backdrop-blur-xl border border-cyan-500/10 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.08)]",

    // Headings
    textClass:
      "text-slate-100",

    // Paragraphs / Secondary Text
    subtextClass:
      "text-slate-400",

    // Primary Buttons
    primaryClass:
      "bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 hover:from-cyan-500 hover:via-sky-600 hover:to-violet-600 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all duration-300",

    // Borders
    accentBorder:
      "border-cyan-500/10",

    // Badges
    badgeClass:
      "bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 backdrop-blur-md",

    // Secondary Buttons
    buttonSecondary:
      "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-500/20 transition-all duration-300",

    // Sidebar
    sidebarClass:
      "bg-[#070F1D] border-r border-cyan-500/10",

    // Sidebar Active Item
    sidebarActive:
      "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/20",

    // Sidebar Hover
    sidebarHover:
      "hover:bg-white/5 hover:text-cyan-300",

    // Inputs
    inputClass:
      "bg-[#0F172A] border border-slate-800 focus:border-cyan-400 text-slate-100 placeholder:text-slate-500 rounded-2xl",

    // Tables
    tableClass:
      "bg-[#0B1220]/70 border border-cyan-500/10 rounded-3xl overflow-hidden",

    // Table Header
    tableHeader:
      "bg-white/5 text-slate-300 border-b border-white/5",

    // Modal
    modalClass:
      "bg-[#0B1220]/95 backdrop-blur-2xl border border-cyan-500/10 rounded-3xl shadow-2xl",

    // Chart Background
    chartClass:
      "bg-gradient-to-br from-[#111827] to-[#0F172A]",

    // Navbar
    navbarClass:
      "bg-[#060816]/80 backdrop-blur-xl border-b border-cyan-500/10",

    // Notification
    notificationClass:
      "bg-[#0F172A] border border-cyan-500/20 text-slate-100",

    // Success
    successClass:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",

    // Warning
    warningClass:
      "bg-amber-500/10 text-amber-300 border border-amber-500/20",

    // Danger
    dangerClass:
      "bg-rose-500/10 text-rose-300 border border-rose-500/20",

    // Icons
    iconClass:
      "text-cyan-400",

    // Hover Card
    hoverCard:
      "hover:border-cyan-400/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)] transition-all duration-300",

    // Glass Effect
    glassClass:
      "bg-white/5 backdrop-blur-xl border border-white/10",

    // Gradient Text
    gradientText:
      "bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent",

    // Scrollbar
    scrollbarClass:
      "scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent",

    // Card Hover
    cardHover:
      "hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] transition-all duration-300",

    // Ring Focus
    focusRing:
      "focus:ring-2 focus:ring-cyan-400/40 focus:outline-none",

    // Overlay
    overlayClass:
      "bg-black/60 backdrop-blur-sm",

    // Divider
    dividerClass:
      "border-white/5",

    // Skeleton Loading
    skeletonClass:
      "animate-pulse bg-white/5",

    // Status Online
    onlineClass:
      "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]",

    // Status Offline
    offlineClass:
      "bg-slate-500",

    // Gradient Border
    gradientBorder:
      "border border-transparent bg-gradient-to-r from-cyan-500/20 to-violet-500/20",

    // Special Glow
    glowClass:
      "shadow-[0_0_60px_rgba(6,182,212,0.12)]",

    // Dashboard Widgets
    widgetClass:
      "bg-[#0B1220]/80 border border-cyan-500/10 rounded-3xl backdrop-blur-xl shadow-xl",

    // Analytics Card
    analyticsCard:
      "bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/10",

    // Premium Border
    premiumBorder:
      "border border-white/10",

    // Muted Background
    mutedBg:
      "bg-[#111827]/50",

    // Dropdown
    dropdownClass:
      "bg-[#0F172A] border border-cyan-500/10 backdrop-blur-xl rounded-2xl",

    // Tabs
    tabsClass:
      "bg-[#0F172A]/70 border border-white/5",

    // Active Tab
    activeTab:
      "bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg",

    // Inactive Tab
    inactiveTab:
      "text-slate-400 hover:text-white hover:bg-white/5",

    // Progress Bar
    progressClass:
      "bg-gradient-to-r from-cyan-400 to-violet-500",

    // Avatar
    avatarClass:
      "ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/20",

    // Tooltip
    tooltipClass:
      "bg-[#111827] text-white border border-cyan-500/10 rounded-xl shadow-xl",

    // Menu Item
    menuItem:
      "hover:bg-white/5 hover:text-cyan-300 rounded-xl transition-all duration-200",

    // Active Menu Item
    activeMenuItem:
      "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/10",

    // Empty State
    emptyState:
      "text-slate-500",

    // Blur Layer
    blurLayer:
      "backdrop-blur-2xl bg-black/20"
  },
  sunsetGold: {
    id: "sunsetGold",
    name: "Sunset Gold",

    bodyClass: "bg-[#0e0806] text-amber-50",
    cardClass: "bg-[#170e0a]/80 backdrop-blur-xl border border-amber-500/10 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.06)]",
    textClass: "text-amber-50",
    subtextClass: "text-amber-200/60",
    primaryClass: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:via-orange-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-amber-500/20 transition-all duration-300",
    accentBorder: "border-amber-500/10",
    badgeClass: "bg-amber-500/10 text-amber-300 border border-amber-400/20 backdrop-blur-md",
    buttonSecondary: "bg-white/5 border border-white/10 text-amber-200 hover:bg-white/10 hover:border-amber-500/20 transition-all duration-300",
    sidebarClass: "bg-[#100907] border-r border-amber-500/10",
    sidebarActive: "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-500/20",
    sidebarHover: "hover:bg-white/5 hover:text-amber-300",
    inputClass: "bg-[#180f0c] border border-amber-950 focus:border-amber-400 text-amber-50 placeholder:text-amber-700 rounded-2xl",
    tableClass: "bg-[#170e0a]/70 border border-amber-500/10 rounded-3xl overflow-hidden",
    tableHeader: "bg-white/5 text-amber-200 border-b border-white/5",
    modalClass: "bg-[#170e0a]/95 backdrop-blur-2xl border border-amber-500/10 rounded-3xl shadow-2xl",
    chartClass: "bg-gradient-to-br from-[#1c110c] to-[#120a07]",
    navbarClass: "bg-[#0e0806]/80 backdrop-blur-xl border-b border-amber-500/10",
    notificationClass: "bg-[#180f0c] border border-amber-500/20 text-amber-50",
    successClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    warningClass: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    dangerClass: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    iconClass: "text-amber-400",
    hoverCard: "hover:border-amber-400/20 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] transition-all duration-300",
    glassClass: "bg-white/5 backdrop-blur-xl border border-white/10",
    gradientText: "bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent",
    scrollbarClass: "scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent",
    cardHover: "hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(245,158,11,0.12)] transition-all duration-300",
    focusRing: "focus:ring-2 focus:ring-amber-400/40 focus:outline-none",
    overlayClass: "bg-black/60 backdrop-blur-sm",
    dividerClass: "border-white/5",
    skeletonClass: "animate-pulse bg-white/5",
    onlineClass: "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]",
    offlineClass: "bg-slate-500",
    gradientBorder: "border border-transparent bg-gradient-to-r from-amber-500/20 to-rose-500/20",
    glowClass: "shadow-[0_0_60px_rgba(245,158,11,0.10)]",
    widgetClass: "bg-[#170e0a]/80 border border-amber-500/10 rounded-3xl backdrop-blur-xl shadow-xl",
    analyticsCard: "bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/10",
    premiumBorder: "border border-white/10",
    mutedBg: "bg-[#1f130f]/50",
    dropdownClass: "bg-[#180f0c] border border-amber-500/10 backdrop-blur-xl rounded-2xl",
    tabsClass: "bg-[#180f0c]/70 border border-white/5",
    activeTab: "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg",
    inactiveTab: "text-amber-400 hover:text-white hover:bg-white/5",
    progressClass: "bg-gradient-to-r from-amber-400 to-rose-500",
    avatarClass: "ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/20",
    tooltipClass: "bg-[#120a07] text-white border border-amber-500/10 rounded-xl shadow-xl",
    menuItem: "hover:bg-white/5 hover:text-amber-300 rounded-xl transition-all duration-200",
    activeMenuItem: "bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/10",
    emptyState: "text-amber-600/50",
    blurLayer: "backdrop-blur-2xl bg-black/20"
  },
  emeraldAurora: {
    id: "emeraldAurora",
    name: "Emerald Aurora",

    bodyClass: "bg-[#040806] text-emerald-50",
    cardClass: "bg-[#08120d]/80 backdrop-blur-xl border border-emerald-500/10 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.06)]",
    textClass: "text-emerald-50",
    subtextClass: "text-emerald-200/60",
    primaryClass: "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-500 hover:via-teal-600 hover:to-cyan-600 text-slate-950 font-bold shadow-lg shadow-emerald-400/20 transition-all duration-300",
    accentBorder: "border-emerald-500/10",
    badgeClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 backdrop-blur-md",
    buttonSecondary: "bg-white/5 border border-white/10 text-emerald-200 hover:bg-white/10 hover:border-emerald-500/20 transition-all duration-300",
    sidebarClass: "bg-[#050b08] border-r border-emerald-500/10",
    sidebarActive: "bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20",
    sidebarHover: "hover:bg-white/5 hover:text-emerald-300",
    inputClass: "bg-[#0a1410] border border-emerald-950 focus:border-emerald-400 text-emerald-50 placeholder:text-emerald-700 rounded-2xl",
    tableClass: "bg-[#08120d]/70 border border-emerald-500/10 rounded-3xl overflow-hidden",
    tableHeader: "bg-white/5 text-emerald-200 border-b border-white/5",
    modalClass: "bg-[#08120d]/95 backdrop-blur-2xl border border-emerald-500/10 rounded-3xl shadow-2xl",
    chartClass: "bg-gradient-to-br from-[#0c1c14] to-[#060f0b]",
    navbarClass: "bg-[#040806]/80 backdrop-blur-xl border-b border-emerald-500/10",
    notificationClass: "bg-[#0a1410] border border-emerald-500/20 text-emerald-50",
    successClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    warningClass: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    dangerClass: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    iconClass: "text-emerald-400",
    hoverCard: "hover:border-emerald-400/20 hover:shadow-[0_0_40px_rgba(52,211,153,0.08)] transition-all duration-300",
    glassClass: "bg-white/5 backdrop-blur-xl border border-white/10",
    gradientText: "bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent",
    scrollbarClass: "scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent",
    cardHover: "hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(52,211,153,0.12)] transition-all duration-300",
    focusRing: "focus:ring-2 focus:ring-emerald-400/40 focus:outline-none",
    overlayClass: "bg-black/60 backdrop-blur-sm",
    dividerClass: "border-white/5",
    skeletonClass: "animate-pulse bg-white/5",
    onlineClass: "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.7)]",
    offlineClass: "bg-slate-500",
    gradientBorder: "border border-transparent bg-gradient-to-r from-emerald-500/20 to-cyan-500/20",
    glowClass: "shadow-[0_0_60px_rgba(16,185,129,0.10)]",
    widgetClass: "bg-[#08120d]/80 border border-emerald-500/10 rounded-3xl backdrop-blur-xl shadow-xl",
    analyticsCard: "bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/10",
    premiumBorder: "border border-white/10",
    mutedBg: "bg-[#0e2118]/50",
    dropdownClass: "bg-[#0a1410] border border-emerald-500/10 backdrop-blur-xl rounded-2xl",
    tabsClass: "bg-[#0a1410]/70 border border-white/5",
    activeTab: "bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-bold shadow-lg",
    inactiveTab: "text-emerald-400 hover:text-white hover:bg-white/5",
    progressClass: "bg-gradient-to-r from-emerald-400 to-cyan-500",
    avatarClass: "ring-2 ring-emerald-400/30 shadow-lg shadow-emerald-500/20",
    tooltipClass: "bg-[#060f0b] text-white border border-emerald-500/10 rounded-xl shadow-xl",
    menuItem: "hover:bg-white/5 hover:text-emerald-300 rounded-xl transition-all duration-200",
    activeMenuItem: "bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/10",
    emptyState: "text-emerald-600/50",
    blurLayer: "backdrop-blur-2xl bg-black/20"
  },
  sakuraBlossom: {
    id: "sakuraBlossom",
    name: "Sakura Blossom",

    bodyClass: "bg-[#FFF9FA] text-[#5C3E43]",
    cardClass: "bg-white/80 backdrop-blur-xl border border-rose-100 rounded-3xl shadow-[0_8px_30px_rgba(244,63,94,0.03)]",
    textClass: "text-[#5C3E43]",
    subtextClass: "text-[#8A6D71]",
    primaryClass: "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white font-semibold shadow-lg shadow-rose-400/10 transition-all duration-300",
    accentBorder: "border-rose-100",
    badgeClass: "bg-rose-50 text-rose-600 border border-rose-100 backdrop-blur-md",
    buttonSecondary: "bg-white border border-rose-100 text-[#5C3E43] hover:bg-rose-50 transition-all duration-300",
    sidebarClass: "bg-[#FFF2F4] border-r border-rose-100",
    sidebarActive: "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg shadow-rose-400/20",
    sidebarHover: "hover:bg-rose-50 hover:text-rose-600",
    inputClass: "bg-white border border-rose-100 focus:border-rose-400 text-[#5C3E43] placeholder:text-rose-300 rounded-2xl",
    tableClass: "bg-white/70 border border-rose-100 rounded-3xl overflow-hidden",
    tableHeader: "bg-rose-50/50 text-[#5C3E43] border-b border-rose-100",
    modalClass: "bg-white backdrop-blur-2xl border border-rose-100 rounded-3xl shadow-2xl",
    chartClass: "bg-gradient-to-br from-white to-[#FFF2F4]",
    navbarClass: "bg-[#FFF9FA]/80 backdrop-blur-xl border-b border-rose-100",
    notificationClass: "bg-white border border-rose-200 text-[#5C3E43]",
    successClass: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    warningClass: "bg-amber-50 text-amber-600 border border-amber-100",
    dangerClass: "bg-rose-50 text-rose-600 border border-rose-100",
    iconClass: "text-rose-500",
    hoverCard: "hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.06)] transition-all duration-300",
    glassClass: "bg-white/70 backdrop-blur-xl border border-white/40",
    gradientText: "bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent",
    scrollbarClass: "scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent",
    cardHover: "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(244,63,94,0.08)] transition-all duration-300",
    focusRing: "focus:ring-2 focus:ring-rose-400/40 focus:outline-none",
    overlayClass: "bg-[#5C3E43]/20 backdrop-blur-sm",
    dividerClass: "border-rose-100/50",
    skeletonClass: "animate-pulse bg-[#FFF2F4]",
    onlineClass: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]",
    offlineClass: "bg-slate-400",
    gradientBorder: "border border-rose-100/50 bg-gradient-to-r from-rose-400/10 to-pink-500/10",
    glowClass: "shadow-[0_8px_30px_rgba(244,63,94,0.04)]",
    widgetClass: "bg-white/80 border border-rose-100 rounded-3xl backdrop-blur-xl shadow-md",
    analyticsCard: "bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100",
    premiumBorder: "border border-rose-100",
    mutedBg: "bg-rose-50/30",
    dropdownClass: "bg-white border border-rose-100 backdrop-blur-xl rounded-2xl",
    tabsClass: "bg-rose-50/50 border border-rose-100",
    activeTab: "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md",
    inactiveTab: "text-[#8A6D71] hover:text-[#5C3E43] hover:bg-rose-50",
    progressClass: "bg-gradient-to-r from-rose-400 to-pink-500",
    avatarClass: "ring-2 ring-rose-300 shadow-md",
    tooltipClass: "bg-[#5C3E43] text-white rounded-xl shadow-xl",
    menuItem: "hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all duration-200",
    activeMenuItem: "bg-rose-50 text-rose-600 border border-rose-100",
    emptyState: "text-[#8A6D71]/50",
    blurLayer: "backdrop-blur-xl bg-white/40"
  },
  pearlObsidian: {
    id: "pearlObsidian",
    name: "Pearl Obsidian",

    bodyClass: "bg-[#F8FAFC] text-[#0F172A]",
    cardClass: "bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.02)]",
    textClass: "text-[#0F172A]",
    subtextClass: "text-[#64748B]",
    primaryClass: "bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-semibold shadow-lg shadow-slate-950/10 transition-all duration-300",
    accentBorder: "border-slate-200/60",
    badgeClass: "bg-slate-100 text-slate-700 border border-slate-200/80 backdrop-blur-md",
    buttonSecondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-300",
    sidebarClass: "bg-[#F1F5F9] border-r border-slate-200/60",
    sidebarActive: "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg",
    sidebarHover: "hover:bg-slate-100 hover:text-slate-900",
    inputClass: "bg-white border border-slate-200 focus:border-slate-500 text-[#0F172A] placeholder:text-slate-400 rounded-2xl",
    tableClass: "bg-white/70 border border-slate-200/60 rounded-3xl overflow-hidden",
    tableHeader: "bg-slate-50 text-[#0F172A] border-b border-slate-200",
    modalClass: "bg-white backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl",
    chartClass: "bg-gradient-to-br from-white to-[#F1F5F9]",
    navbarClass: "bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-slate-200/60",
    notificationClass: "bg-white border border-slate-200 text-[#0F172A]",
    successClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warningClass: "bg-amber-50 text-amber-700 border border-amber-200",
    dangerClass: "bg-rose-50 text-rose-700 border border-rose-200",
    iconClass: "text-slate-800",
    hoverCard: "hover:border-slate-400 hover:shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300",
    glassClass: "bg-white/70 backdrop-blur-xl border border-white/40",
    gradientText: "bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent",
    scrollbarClass: "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent",
    cardHover: "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300",
    focusRing: "focus:ring-2 focus:ring-slate-400/40 focus:outline-none",
    overlayClass: "bg-[#0F172A]/20 backdrop-blur-sm",
    dividerClass: "border-slate-200",
    skeletonClass: "animate-pulse bg-slate-100",
    onlineClass: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
    offlineClass: "bg-slate-400",
    gradientBorder: "border border-slate-200/50 bg-gradient-to-r from-slate-900/5 to-slate-800/5",
    glowClass: "shadow-[0_8px_30px_rgba(15,23,42,0.02)]",
    widgetClass: "bg-white/80 border border-slate-200/60 rounded-3xl backdrop-blur-xl shadow-md",
    analyticsCard: "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200",
    premiumBorder: "border border-slate-200",
    mutedBg: "bg-slate-50/50",
    dropdownClass: "bg-white border border-slate-200 backdrop-blur-xl rounded-2xl",
    tabsClass: "bg-slate-100 border border-slate-200",
    activeTab: "bg-white text-slate-900 shadow-sm",
    inactiveTab: "text-[#64748B] hover:text-[#0F172A]",
    progressClass: "bg-gradient-to-r from-slate-900 to-slate-800",
    avatarClass: "ring-2 ring-slate-200 shadow-md",
    tooltipClass: "bg-[#0F172A] text-white rounded-xl shadow-xl",
    menuItem: "hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-all duration-200",
    activeMenuItem: "bg-slate-100 text-slate-900 border border-slate-200/60",
    emptyState: "text-[#64748B]/50",
    blurLayer: "backdrop-blur-xl bg-white/40"
  }
};