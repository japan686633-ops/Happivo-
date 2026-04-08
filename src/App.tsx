import React, { useState, useEffect } from "react";
import { Sparkles, Wand2, BookOpen, ArrowRight, Twitter, Linkedin, Instagram, Facebook, Menu, Plus, X, Phone, Mail, MessageCircle, User, Globe, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const VIDEO_SRC = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";
const HERO_FLOWERS = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const [dashboardTab, setDashboardTab] = useState<"clients" | "messages">("clients");
  
  const plansRef = React.useRef<HTMLDivElement>(null);

  // Load data from localStorage
  const [clients, setClients] = useState<any[]>(() => {
    const saved = localStorage.getItem("happivo_clients");
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem("happivo_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCode === "sora@123$") {
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      setLoginCode("");
    } else {
      alert("Invalid secret code");
    }
  };

  const saveClient = (data: any) => {
    const newClients = [...clients, { ...data, id: Date.now(), date: new Date().toLocaleString() }];
    setClients(newClients);
    localStorage.setItem("happivo_clients", JSON.stringify(newClients));
  };

  const saveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      name: formData.name || "Anonymous",
      contact: formData.phone || formData.email || "No contact info",
      message: clientMessage,
      date: new Date().toLocaleString()
    };
    
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    localStorage.setItem("happivo_messages", JSON.stringify(newMessages));
    setClientMessage("");
    setIsMessagingOpen(false);
    alert("Message sent successfully!");
  };

  const togglePlans = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newShowPlans = !showPlans;
    setShowPlans(newShowPlans);
    
    if (newShowPlans) {
      setTimeout(() => {
        plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    saveClient(formData);
    setHasSubmitted(true);
    setStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHasSubmitted(false);
    setIsMessagingOpen(false);
    setStep(1);
  };

  const menuOptions = [
    { label: "Plans", icon: <Sparkles size={16} />, onClick: () => togglePlans() },
    { label: isLoggedIn ? "Logout" : "Sora", icon: <Sparkles size={16} />, onClick: () => {
      if (isLoggedIn) {
        setIsLoggedIn(false);
        setIsDashboardOpen(false);
      } else {
        setIsLoginModalOpen(true);
      }
    }},
    ...(isLoggedIn ? [{ label: "Dashboard", icon: <User size={16} />, onClick: () => setIsDashboardOpen(true) }] : []),
    { label: "Direct Contact", icon: <MessageCircle size={16} />, onClick: () => { setHasSubmitted(true); setIsModalOpen(true); } },
    { label: "Contact Now", icon: <Phone size={16} />, onClick: () => { setHasSubmitted(false); setIsModalOpen(true); } }
  ];

  return (
    <div 
      onClick={() => {
        if (showPlans) setShowPlans(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }}
      className="relative h-screen w-full overflow-y-auto overflow-x-hidden font-sans selection:bg-white/30 selection:text-white scroll-smooth bg-black"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover scale-105"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex w-full flex-col lg:min-h-screen lg:w-[52%]"
        >
          {/* Glass overlay */}
          <div className="absolute inset-4 lg:inset-6 rounded-3xl" />

          {/* Panel content */}
          <div className="relative z-10 flex flex-col min-h-[100svh] lg:h-full px-6 py-6 lg:px-12 lg:py-8">
            {/* Nav */}
            <nav className="flex items-center justify-between mb-8 lg:mb-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-semibold tracking-tighter text-white font-display">happivo</span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white/80 hover:scale-105 transition-transform cursor-pointer bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <span>{isMenuOpen ? "Close" : "Menu"}</span>
                  {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
                
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-2 z-50 shadow-2xl"
                    >
                      {menuOptions.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if ('onClick' in option && option.onClick) {
                              option.onClick();
                            }
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-left cursor-pointer"
                        >
                          <span className="text-white/40">{option.icon}</span>
                          <span className="font-display">{option.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Hero center */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 lg:gap-8 text-center py-10 lg:py-12">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.1] lg:leading-[1.05] font-display"
              >
                Not hard work<br />
                only{" "}
                <em className="font-serif not-italic italic text-white/80">smart</em>{" "}
                work
              </motion.h1>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-3 rounded-full px-6 py-3 lg:px-7 lg:py-3.5 text-sm font-medium text-white transition-transform cursor-pointer bg-white/10 backdrop-blur-md border border-white/20"
              >
                <span>Contact Now</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  <Phone size={14} />
                </span>
              </motion.button>
            </div>

            {/* Bottom quote */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex flex-col items-center gap-3 pb-6 lg:pb-8 text-center mt-auto"
            >
              {/* Social Icons above Visionary Design */}
              <div className="flex items-center gap-5 mb-2">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/happivo_wab?igsh=MTczOGtubXhwb2hyaA==" },
                  { Icon: Facebook, href: "#" },
                  { Icon: MessageCircle, href: "https://wa.me/917618705548" },
                  { Icon: Mail, href: "mailto:happivo68@gmail.com" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-white/50 hover:text-white transition-colors p-1"
                  >
                    <social.Icon size={22} />
                  </motion.a>
                ))}
              </div>
              
              <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/40 font-display">Visionary Design</span>
              <p className="max-w-xs sm:max-w-sm text-sm text-white/70 leading-relaxed px-4">
                <span className="font-display">"We imagined </span>
                <em className="font-serif italic text-white/80">a realm</em>
                <span className="font-display"> with no ending."</span>
              </p>
              <div className="flex items-center gap-4">
                <span className="h-px w-6 lg:w-8 bg-white/20" />
                <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-white/40">Marcus Aurelio</span>
                <span className="h-px w-6 lg:w-8 bg-white/20" />
              </div>

              {/* Check Plans Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlans}
                className="mt-6 flex items-center gap-2 rounded-full px-6 py-2.5 lg:px-7 lg:py-3 text-xs lg:text-sm font-medium text-white transition-all cursor-pointer bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <span>{showPlans ? "Hide Visionary Plans" : "Check Visionary Plans"}</span>
                <ArrowRight size={16} className={`transition-transform duration-500 ${showPlans ? 'rotate-90' : ''}`} />
              </motion.button>
            </motion.div>
          </div>

          {/* Dedicated Plans Section (Black Area at Bottom) */}
          <div ref={plansRef} className="w-full">
            <AnimatePresence>
              {showPlans && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto",
                    transition: {
                      height: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.4, delay: 0.2 }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    transition: {
                      height: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.3 }
                    }
                  }}
                  className="w-full bg-black/90 backdrop-blur-3xl border-t border-white/10"
                >
                  <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col items-center text-center mb-12 lg:mb-20">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 border border-white/10"
                      >
                        <Sparkles size={24} />
                      </motion.div>
                      <h2 className="text-3xl lg:text-5xl font-medium text-white font-display tracking-tight mb-4">Visionary Pricing</h2>
                      <p className="text-white/40 max-w-md text-sm lg:text-base">Transparent plans for hyper-level digital experiences.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {[
                        {
                          title: "3D Looking Website",
                          desc: "Immersive 3D experience with visionary depth.",
                          price: "$2000",
                          level: "Hyper Level"
                        },
                        {
                          title: "Premium 3D Feel",
                          desc: "Premium website or apps with high-end 3D field aesthetics.",
                          price: "$1500",
                          level: "Hyper Level"
                        },
                        {
                          title: "Customization",
                          desc: "Premium website for your customization starting from $1000.",
                          price: "$1000",
                          level: "Hyper Level"
                        }
                      ].map((plan, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                        >
                          <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-white/30 font-display mb-4">{plan.level}</span>
                          <h4 className="text-lg lg:text-xl font-medium text-white font-display tracking-tight mb-2">{plan.title}</h4>
                          <p className="text-xs text-white/40 leading-relaxed mb-8 flex-1">{plan.desc}</p>
                          <div className="pt-6 border-t border-white/10">
                            <span className="text-xl lg:text-2xl font-semibold text-white font-display tracking-tighter">{plan.price}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-16 text-center"
                    >
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-display"
                      >
                        <span>Ready to start? Contact us</span>
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex w-[48%] flex-col px-6 py-8"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 p-1.5 backdrop-blur-sm">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/happivo_wab?igsh=MTczOGtubXhwb2hyaA==", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: MessageCircle, href: "https://wa.me/917618705548", label: "WhatsApp" },
                { Icon: Mail, href: "mailto:happivo68@gmail.com", label: "Email" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  title={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110"
                >
                  <social.Icon size={16} />
                </a>
              ))}
              <div className="h-4 w-px bg-white/10 mx-1" />
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110">
                <ArrowRight size={16} />
              </a>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:scale-105 transition-transform cursor-pointer bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles size={16} />
            </button>
          </div>

          {/* Community card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 self-end"
          >
            <div className="w-56 rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-white mb-1.5 font-display">Enter our ecosystem</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Join a growing community of designers shaping the future of floral AI.
              </p>
            </div>
          </motion.div>

          {/* Bottom feature section */}
          <div className="mt-auto">
            <div className="rounded-[2.5rem] p-4 bg-white/5 border border-white/10 backdrop-blur-sm">
              {/* Two side-by-side cards */}
              <div className="flex gap-3 mb-3">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex-1 rounded-3xl p-5 bg-white/5 border border-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 mb-3">
                    <Wand2 size={14} className="text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1 font-display">Processing</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Real-time AI sculpting engine</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="flex-1 rounded-3xl p-5 bg-white/5 border border-white/10"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 mb-3">
                    <BookOpen size={14} className="text-white" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1 font-display">Growth Archive</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Curated botanical library</p>
                </motion.div>
              </div>

              {/* Bottom card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 rounded-3xl p-4 bg-white/5 border border-white/10"
              >
                <img
                  src={HERO_FLOWERS}
                  alt="Floral sculpture"
                  width={96}
                  height={64}
                  className="h-16 w-24 rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white mb-0.5 font-display">Advanced Plant Sculpting</h4>
                  <p className="text-xs text-white/50 leading-relaxed">Transform botanicals with neural precision</p>
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:scale-105 transition-transform shrink-0 cursor-pointer">
                  <Plus size={16} />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${hasSubmitted ? 'bg-transparent' : 'bg-black/60'}`}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/20 shadow-2xl ${hasSubmitted ? 'bg-white/5 backdrop-blur-xl' : 'bg-zinc-900'}`}
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="p-10 pt-14">
                {!hasSubmitted ? (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                  >
                    <h2 className="text-3xl font-medium text-white mb-2 font-display tracking-tight">Get in touch</h2>
                    <p className="text-sm text-white/50 mb-8">Fill in your details to continue</p>
                    
                    <form onSubmit={nextStep} className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input 
                          required
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full bg-white text-black font-semibold py-4.5 rounded-2xl mt-6 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                      >
                        <span>Submit Details</span>
                        <ArrowRight size={18} />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="flex flex-col items-center text-center mb-10">
                      <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center text-white mb-6 border border-white/20">
                        <Sparkles size={32} />
                      </div>
                      <h2 className="text-3xl font-medium text-white mb-2 font-display tracking-tight">Our Details</h2>
                      <p className="text-sm text-white/50">Visionary connection established</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                          <Mail size={20} />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-display mb-0.5">Email</p>
                          <p className="text-base text-white font-medium">happivo68@gmail.com</p>
                        </div>
                      </div>

                      <a 
                        href="https://wa.me/917618705548" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group"
                      >
                        <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 shrink-0 border border-green-500/20">
                          <MessageCircle size={20} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-green-400/50 font-display mb-0.5">WhatsApp</p>
                          <p className="text-base text-white font-medium">Direct Message</p>
                        </div>
                        <ArrowRight size={18} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </a>

                      {/* Send Message Option */}
                      <div className="mt-4">
                        {!isMessagingOpen ? (
                          <button 
                            onClick={() => setIsMessagingOpen(true)}
                            className="w-full flex items-center justify-center gap-3 p-5 rounded-3xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all font-display text-sm"
                          >
                            <Send size={18} />
                            <span>Send Message</span>
                          </button>
                        ) : (
                          <motion.form 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onSubmit={saveMessage} 
                            className="space-y-3"
                          >
                            <textarea 
                              required
                              placeholder="Type your message here..."
                              value={clientMessage}
                              onChange={(e) => setClientMessage(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all min-h-[100px] resize-none"
                            />
                            <div className="flex gap-2">
                              <button 
                                type="button"
                                onClick={() => setIsMessagingOpen(false)}
                                className="flex-1 bg-white/10 text-white py-3 rounded-xl text-sm hover:bg-white/20 transition-all"
                              >
                                Cancel
                              </button>
                              <button 
                                type="submit"
                                className="flex-[2] bg-white text-black font-semibold py-3 rounded-xl text-sm hover:scale-[1.02] transition-all"
                              >
                                Send Message
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={closeModal}
                      className="w-full bg-white text-black font-semibold py-4.5 rounded-2xl mt-10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-white/10"
                    >
                      Back to Vision
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/20 bg-zinc-900 p-8"
            >
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-medium text-white mb-6 font-display">Owner Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  required
                  type="password"
                  placeholder="Enter secret code"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                />
                <button 
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Sora Enter
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Modal */}
      <AnimatePresence>
        {isDashboardOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative w-full max-w-4xl h-[80vh] overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 flex flex-col"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium text-white font-display">Owner Dashboard</h2>
                  <p className="text-xs text-white/40 mt-1">Manage your hyper-level ecosystem</p>
                </div>
                <button 
                  onClick={() => setIsDashboardOpen(false)}
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex border-b border-white/10 px-8">
                  <button 
                    onClick={() => setDashboardTab("clients")}
                    className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${dashboardTab === "clients" ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/60"}`}
                  >
                    Clients
                  </button>
                  <button 
                    onClick={() => setDashboardTab("messages")}
                    className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${dashboardTab === "messages" ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/60"}`}
                  >
                    Messages
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {dashboardTab === "clients" ? (
                    <div className="space-y-4">
                      {clients.length === 0 ? (
                        <p className="text-center text-white/20 py-20">No clients registered yet.</p>
                      ) : (
                        clients.map((client) => (
                          <div key={client.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-white font-medium">{client.name}</h4>
                              <p className="text-xs text-white/40">{client.email} • {client.phone}</p>
                              <p className="text-[10px] text-white/20 mt-1 uppercase tracking-widest">{client.country}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-white/30 font-mono">{client.date}</span>
                            </div>
                          </div>
                        )).reverse()
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <p className="text-center text-white/20 py-20">No messages received yet.</p>
                      ) : (
                        messages.map((msg) => (
                          <div key={msg.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-white font-medium">{msg.name}</h4>
                                <p className="text-xs text-white/40">{msg.contact}</p>
                              </div>
                              <span className="text-[10px] text-white/30 font-mono">{msg.date}</span>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                              {msg.message}
                            </p>
                          </div>
                        )).reverse()
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
