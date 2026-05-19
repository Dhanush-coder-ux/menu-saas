import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scan, Plus, Download, Palette, RefreshCw, Layers, Sliders, Smartphone } from "lucide-react";
import { useShopStore } from "../features/customer/store/use-shop-store";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function QRManagement() {
  const { currentShop } = useShopStore();
  const [tableCount, setTableCount] = useState(6);
  const [qrColor, setQrColor] = useState("#7C3AED"); // default primary
  const [selectedTable, setSelectedTable] = useState(1);
  const [showLogo, setShowLogo] = useState(true);

  const downloadQr = (num) => {
    alert(`Initiating download: QR_Code_Table_${num}.png (Formatted High-Resolution Print Ready PDF)`);
  };

  const tables = Array.from({ length: tableCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6 text-left page-enter">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left columns: QR customize panel */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight mb-1">Custom Styling & Branding</h3>
                <p className="text-[10px] text-slate-500">Tailor printable QR templates with color codes and custom logos</p>
              </div>
              <Palette className="w-5 h-5 text-violet-400" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">QR Code Color</label>
                <div className="flex gap-2">
                  {["#7C3AED", "#EC4899", "#10B981", "#F59E0B", "#1E293B"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setQrColor(c)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer border ${
                        qrColor === c ? "scale-110 border-white ring-2 ring-violet-500/30" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Center Logo Badge</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={showLogo ? "primary" : "secondary"}
                    className="px-3.5 py-1.5 text-xs"
                    onClick={() => setShowLogo(true)}
                  >
                    Display Logo
                  </Button>
                  <Button
                    variant={!showLogo ? "primary" : "secondary"}
                    className="px-3.5 py-1.5 text-xs"
                    onClick={() => setShowLogo(false)}
                  >
                    No Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 my-6" />

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-left space-y-0.5">
                <div className="text-xs font-bold">Configure Table Multipliers</div>
                <p className="text-[10px] text-slate-500">Currently generating print sheets for {tableCount} private tables</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="secondary" className="flex-1 sm:flex-initial" onClick={() => setTableCount(tableCount > 1 ? tableCount - 1 : 1)}>-</Button>
                <span className="px-4 py-2 border border-white/5 rounded-xl text-xs font-black min-w-10 text-center">{tableCount}</span>
                <Button variant="secondary" className="flex-1 sm:flex-initial" onClick={() => setTableCount(tableCount + 1)}>+</Button>
              </div>
            </div>
          </Card>

          {/* Tables QR Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {tables.map((num) => (
              <motion.div
                key={num}
                whileHover={{ y: -3 }}
                className={`p-5 rounded-3xl border text-center transition-all bg-white/5 ${
                  selectedTable === num ? "border-violet-500/40 bg-violet-950/10 shadow-lg" : "border-white/5 hover:border-white/10"
                }`}
              >
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Table {num}</span>
                
                {/* Simulated QR Code SVG Graphic */}
                <div 
                  onClick={() => setSelectedTable(num)}
                  className="w-24 h-24 bg-white p-2 rounded-2xl mx-auto mb-4 border border-slate-200 cursor-pointer flex items-center justify-center relative overflow-hidden"
                >
                  {/* QR Pattern Simulation using CSS grid elements */}
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-90">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="rounded-[2px]" 
                        style={{ 
                          backgroundColor: (i % 3 === 0 || i % 4 === 1) ? qrColor : "transparent",
                          // Make corners solid QR identifiers
                          border: (i === 0 || i === 4 || i === 20) ? `3px solid ${qrColor}` : "none",
                          background: (i === 0 || i === 4 || i === 20) ? "transparent" : ""
                        }} 
                      />
                    ))}
                  </div>
                  {showLogo && (
                    <div className="absolute w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-xs shadow-md select-none">
                      {currentShop.logo}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 py-1.5 text-[10px] justify-center" onClick={() => downloadQr(num)}>
                    <Download className="w-3.5 h-3.5 mr-1" /> Save
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column: Preview layout */}
        <div className="space-y-6">
          <Card className="p-6 text-center space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Active Scanner Routing</span>
            <div className="rounded-2xl border border-white/5 bg-slate-950/20 p-4 space-y-2 text-left">
              <div className="text-[10px] font-bold text-slate-400">Target Router Link:</div>
              <div className="font-mono text-[9px] text-violet-400 break-all select-all p-2 rounded-xl bg-slate-950 border border-white/5">
                https://menuqr.app/shop/{currentShop.shopSlug}?table={selectedTable}
              </div>
            </div>
            <div className="sep" />
            <div className="text-left space-y-3">
              {[["🛡 Encrypted Dynamic QR", "Ensures table tracking safety with token authentications."], ["🔄 Auto Routing", "Scan navigates directly into customer mobile-first menu interface."]].map(([t, d]) => (
                <div key={t}>
                  <div className="text-xs font-bold text-slate-200">{t}</div>
                  <div className="text-[10px] text-slate-500 leading-normal mt-0.5">{d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
