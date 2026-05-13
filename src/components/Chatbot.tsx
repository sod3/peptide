import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "Which peptide is best for fat loss?",
  "Are your products lab tested?",
  "How fast is US shipping?",
  "Do you provide a COA?",
];

const reply = (q: string): string => {
  const t = q.toLowerCase();
  if (t.includes("fat") || t.includes("loss") || t.includes("weight"))
    return "For metabolic research, we recommend exploring **Semaglutide** or **Tirzepatide**. Every batch is verified via HPLC for absolute precision.";
  if (t.includes("test") || t.includes("lab") || t.includes("coa"))
    return "Yes, transparency is our core value. Every lot is independently verified by US-based ISO 17025 labs. Certificates are available on each product page.";
  if (t.includes("ship") || t.includes("delivery"))
    return "We offer priority same-day shipping from our Wilmington facility. Orders over $250 qualify for complimentary priority handling.";
  return "Our technicians are currently processing lot #A-2026. I can assist with technical specs, purity verification, or logistics. Try one of my quick-start queries.";
};

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Welcome to Aevum Laboratories. I am your **AI Research Concierge**. How can I assist your laboratory today?" },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
    }
  }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(t) }]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-surface text-primary shadow-2xl transition-all hover:scale-110 active:scale-95 duration-500 border border-white/10 ${open ? "scale-0 opacity-0" : "scale-100 opacity-100 scale-110"}`}
        aria-label="Connect with AI"
      >
        <Zap className="h-6 w-6 fill-primary" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white"></span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[3rem] border border-border/40 bg-background/80 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-surface p-6 text-white border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold tracking-tight">Aevum Concierge</div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Neural Core Active
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-xl p-2 hover:bg-white/5 transition-colors">
                <X className="h-5 w-5 opacity-40 hover:opacity-100" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scroller} className="flex h-[450px] flex-col gap-4 overflow-y-auto p-6 scrollbar-hide">
              {msgs.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed ${
                    m.role === "user" 
                    ? "ml-auto bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "mr-auto bg-card border border-border/60 text-foreground"
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold'>$1</strong>") }}
                />
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-6 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button 
                  key={s} 
                  onClick={() => send(s)} 
                  className="rounded-full border border-border/60 bg-muted px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); send(input); }} 
              className="p-6 border-t border-border/40"
            >
              <div className="relative group">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire about synthesis..."
                  className="w-full h-14 rounded-2xl border border-border/60 bg-muted px-6 text-sm outline-none transition-all group-focus-within:bg-white group-focus-within:shadow-xl group-focus-within:shadow-primary/5 group-focus-within:border-primary/50"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
