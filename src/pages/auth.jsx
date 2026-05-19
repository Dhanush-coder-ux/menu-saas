import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, Phone, Store, UserCheck, ShieldAlert } from "lucide-react";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/use-auth-store";

export default function AuthPage({ mode = "login", onNavigate }) {
  const { login, signup } = useAuthStore();
  const [step, setStep] = useState("form"); // form, otp
  const [roleSelection, setRoleSelection] = useState("owner"); // owner, customer
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const isLogin = mode === "login";

  const handleOtpChange = (val, idx) => {
    if (isNaN(val)) return;
    const nextOtp = [...otp];
    nextOtp[idx] = val;
    setOtp(nextOtp);

    // Auto-focus next input cell
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    if (isLogin) {
      // Simulate login
      login(email, roleSelection);
      onNavigate(roleSelection === "owner" ? "dashboard" : "customer");
    } else {
      // Sign up moves to OTP simulation
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    signup(businessName || "Cafe Aroma", email, phone);
    onNavigate("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-violet-600/10 top-0 left-0" />
      <div className="glow-orb w-[300px] h-[300px] bg-pink-500/5 bottom-0 right-0" />

      <button 
        onClick={() => onNavigate("landing")}
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to home
      </button>

      <div className="w-full max-w-[420px] rounded-3xl p-8 bg-white/5 border border-white/8 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-violet-500/20">M</div>
        </div>

        <AnimatePresence mode="wait">
          {step === "otp" ? (
            <motion.form
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleOtpSubmit}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight mb-1">Verify Your Number 📱</h2>
                <p className="text-xs text-slate-400">We simulated sending a 6-digit code to {phone || "+91 98765 43210"}</p>
              </div>

              <div className="flex gap-2.5 justify-center py-2">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !v && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="w-11 h-14 text-center text-xl font-black rounded-xl bg-white/5 border border-white/8 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                  />
                ))}
              </div>

              <Button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600">
                Verify & Continue
              </Button>
              <div className="text-center text-xs text-slate-500">
                Didn't receive code? <span className="text-violet-400 hover:underline cursor-pointer font-bold">Resend OTP</span>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="form-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleFormSubmit}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight mb-1">
                  {isLogin ? "Welcome Back 👋" : "Create Business Account"}
                </h2>
                <p className="text-xs text-slate-400">
                  {isLogin ? "Sign in to manage Cafe Aroma" : "Start your 14-day free growth plan trial"}
                </p>
              </div>

              {/* Role Select Buttons */}
              {isLogin && (
                <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/5 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setRoleSelection("owner")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${roleSelection === "owner" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <Store className="w-3.5 h-3.5" /> Shop Owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoleSelection("customer")}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${roleSelection === "customer" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Customer View
                  </button>
                </div>
              )}

              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1.5">Business Name</label>
                  <div className="relative">
                    <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      placeholder="Cafe Aroma, Chennai"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="owner@cafe-aroma.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1.5 flex justify-between items-center">
                  <span>Password</span>
                  {isLogin && <span className="text-[10px] text-violet-400 hover:underline cursor-pointer">Forgot?</span>}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600">
                {isLogin ? "Sign in" : "Create Account"}
              </Button>

              <div className="border-t border-white/5 my-4" />

              <p className="text-center text-xs text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span 
                  onClick={() => onNavigate(isLogin ? "signup" : "login")}
                  className="text-violet-400 hover:underline cursor-pointer font-bold"
                >
                  {isLogin ? "Sign up free" : "Sign in"}
                </span>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
