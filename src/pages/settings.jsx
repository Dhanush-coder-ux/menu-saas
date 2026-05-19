import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Shield, Sliders, Smartphone, UserPlus, Trash2, Award } from "lucide-react";
import { TEAM_MEMBERS } from "../constants/mock-data";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useThemeStore } from "../store/use-theme-store";

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [shopName, setShopName] = useState("Cafe Aroma");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("owner@cafe-aroma.com");
  const [staff, setStaff] = useState(TEAM_MEMBERS);

  // Form states for new staff
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("Waiter / Server Manager");
  const [staffEmail, setStaffEmail] = useState("");

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!staffName || !staffEmail) return;
    setStaff([
      ...staff,
      {
        name: staffName,
        role: staffRole,
        avatar: staffName.split(" ").map(w => w[0]).join("").toUpperCase(),
        email: staffEmail
      }
    ]);
    setStaffName("");
    setStaffEmail("");
    setShowAddStaff(false);
  };

  return (
    <div className="space-y-6 text-left page-enter">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left col: profile settings & theme customize */}
        <div className="md:col-span-2 space-y-6">
          {/* Shop Profile settings card */}
          <Card className="p-6">
            <h3 className="text-sm font-bold tracking-tight mb-1">Shop Profile & Coordination</h3>
            <p className="text-[10px] text-slate-500 mb-6">Manage global contact channels and table coordinate values</p>
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert("Profile successfully saved!"); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Outlet Business Name</label>
                  <input value={shopName} onChange={e => setShopName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" required />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Support Contact</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" required />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Corporate billing email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" required />
              </div>
              <div className="flex justify-end pt-3">
                <Button type="submit" className="bg-gradient-to-r from-violet-600 to-pink-600">Save Profile</Button>
              </div>
            </form>
          </Card>

          {/* Theme customizer configuration parameters */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight mb-1">Visual Theme Customization</h3>
                <p className="text-[10px] text-slate-500">Inject styling codes to match the physical business branding</p>
              </div>
              <Sliders className="w-5 h-5 text-violet-400" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: "cafe", name: "Luxury Cafe", desc: "Viol-pink, high blur" },
                { id: "minimal", name: "Minimal Slate", desc: "Zesty slate, clean white" },
                { id: "dark", name: "Cyberpunk Dark", desc: "Matte surface, neons" },
                { id: "traditional", name: "Warm Traditional", desc: "Warm ochres, elegant" }
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    theme.id === th.id
                      ? "border-violet-500 bg-violet-950/20 shadow-md shadow-violet-500/10 scale-102"
                      : "border-white/5 bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold">{th.name}</span>
                  <span className="text-[8px] text-slate-500 font-semibold">{th.desc}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column: Staff lists & Subscriptions */}
        <div className="space-y-6">
          {/* Subscriptions cards */}
          <Card className="p-6 text-left relative overflow-hidden bg-gradient-to-b from-violet-950/20 to-slate-900/60 border-violet-500/40">
            <div className="absolute top-0 right-0 p-4">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
            <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest block mb-1">Subscription Plan</span>
            <h3 className="text-base font-black text-slate-200">Growth Partner Plan</h3>
            <p className="text-[10px] text-slate-500 mt-1">Renews automatically on June 19, 2026 for ₹1,200/mo</p>
            <div className="border-t border-white/5 my-4" />
            <div className="space-y-2 text-[10px] text-slate-400 font-semibold">
              <div className="flex items-center gap-2">✓ Table-wise dynamic scans active</div>
              <div className="flex items-center gap-2">✓ Advanced hourly analytical dashboard</div>
              <div className="flex items-center gap-2">✓ Real-time multi-terminal kitchens</div>
            </div>
            <Button className="w-full mt-5 py-2 text-xs bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 flex justify-center">
              Manage billing portal
            </Button>
          </Card>

          {/* Reusable staff directories list */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight mb-1">Staff Directory</h3>
                <p className="text-[10px] text-slate-500">{staff.length} active roles</p>
              </div>
              <UserPlus className="w-4 h-4 text-violet-400 cursor-pointer" onClick={() => setShowAddStaff(true)} />
            </div>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              {staff.map((t) => (
                <div key={t.email} className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center font-bold text-xs text-white">
                    {t.avatar}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 truncate">{t.name}</div>
                    <div className="text-[9px] text-slate-500 font-semibold truncate">{t.role}</div>
                  </div>
                  <button 
                    onClick={() => setStaff(staff.filter(st => st.email !== t.email))}
                    className="p-1 rounded bg-white/5 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {showAddStaff && (
              <div className="border border-white/5 rounded-2xl p-4 bg-slate-900/60 mt-4 text-left">
                <form onSubmit={handleAddStaffSubmit} className="space-y-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Staff Name</label>
                    <input placeholder="e.g. Ramesh" value={staffName} onChange={e => setStaffName(e.target.value)} className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" required />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Role Title</label>
                    <select value={staffRole} onChange={e => setStaffRole(e.target.value)} className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/8 text-xs text-white outline-none">
                      <option>Waiter / Server Manager</option>
                      <option>Kitchen Chef</option>
                      <option>Counter Cashier</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Email</label>
                    <input type="email" placeholder="ramesh@cafe-aroma.com" value={staffEmail} onChange={e => setStaffEmail(e.target.value)} className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" required />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <Button variant="secondary" className="px-3.5 py-1 text-[10px]" onClick={() => setShowAddStaff(false)}>Cancel</Button>
                    <Button type="submit" className="px-3.5 py-1 text-[10px] bg-gradient-to-r from-violet-600 to-pink-600">Save Member</Button>
                  </div>
                </form>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
