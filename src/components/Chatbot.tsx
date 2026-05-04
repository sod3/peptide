import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

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
    return "For metabolic research, customers most commonly explore **Semaglutide** and **Tesamorelin**. Both ship with a third-party HPLC Certificate of Analysis (≥99% purity).";
  if (t.includes("test") || t.includes("lab") || t.includes("coa"))
    return "Yes — every batch is independently tested by an ISO-accredited lab using HPLC and mass spectrometry. The COA is downloadable on every product page.";
  if (t.includes("ship") || t.includes("delivery"))
    return "Orders ship same-day from our Delaware facility via USPS Priority. Free shipping over $200, with full tracking included.";
  if (t.includes("recover") || t.includes("heal"))
    return "**BPC-157** and **TB-500** are the most-researched recovery peptides in our catalog. Many labs purchase them as a pair.";
  if (t.includes("safe") || t.includes("legal"))
    return "All Aevum Bio products are sold strictly for in-vitro laboratory research and are not for human consumption.";
  return "Great question — I can help with product selection, lab testing, dosage research notes, or shipping. Try one of the suggestions below.";
};

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi, I'm **Aevum AI** — your research assistant. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => { scroller.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, { role: "bot", text: reply(t) }]), 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-transform hover:scale-110 animate-pulse-glow ${open ? "scale-0" : ""}`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elegant animate-fade-up">
          <div className="flex items-center justify-between bg-gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-base font-semibold leading-tight">Aevum AI</div>
                <div className="flex items-center gap-1.5 text-[11px] opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · avg reply 4s
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-primary-foreground/10" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scroller} className="flex max-h-[420px] min-h-[280px] flex-col gap-2 overflow-y-auto bg-surface p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-card border border-border text-foreground"}`}
                dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 pt-3">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-border bg-card p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about peptides…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90" aria-label="Send">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
