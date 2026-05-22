import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";

export const AgeGate = () => {
  const [show, setShow] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const location = useLocation();

  const isLegalPage = ["/terms", "/privacy", "/shipping"].includes(location.pathname);

  useEffect(() => {
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      setShow(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAgree = () => {
    if (!confirmed) return;
    localStorage.setItem("age-verified", "true");
    setShow(false);
    document.body.style.overflow = "unset";
  };

  const handleDisagree = () => {
    setRejected(true);
  };

  if (!show || isLegalPage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-border/50 bg-card p-10 shadow-elegant"
        >
          <div className="absolute inset-0 grid-bg opacity-[0.03]" />
          
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary p-0.5 shadow-glow">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
                 <Logo className="scale-75" showText={false} />
              </div>
            </div>

            {!rejected ? (
              <>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  Age Verification Required
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground font-light">
                  You must be at least <span className="font-semibold text-foreground">21 years of age</span> to enter this site.
                </p>

                <button
                  onClick={() => setConfirmed(!confirmed)}
                  className={`mt-8 flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                    confirmed 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border/60 bg-surface/50 hover:border-primary/40"
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    confirmed ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}>
                    {confirmed && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <span className="text-[15px] font-medium text-foreground">
                    I confirm I am at least 21 years of age
                  </span>
                </button>

                <p className="mt-8 text-[12px] leading-relaxed text-muted-foreground font-light">
                  By clicking "I Agree," you confirm you have read and agree to our{" "}
                  <Link to="/terms" className="text-primary hover:underline font-medium">Terms & Conditions</Link> and{" "}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>. All products are sold strictly for in-vitro research use only.
                </p>

                <div className="mt-10 flex w-full flex-col gap-4">
                  <Button
                    onClick={handleAgree}
                    disabled={!confirmed}
                    size="lg"
                    className="h-14 w-full rounded-2xl bg-gradient-primary text-base font-semibold shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                  >
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    I Agree & Enter
                  </Button>
                  <button
                    onClick={handleDisagree}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    I Do Not Agree
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="mb-6 rounded-full bg-destructive/10 p-4 text-destructive">
                  <XCircle className="h-10 w-10" />
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  Access Denied
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground font-light">
                  You must be at least 21 years of age to access Peptideology.
                </p>
                <p className="mt-2 text-[14px] text-muted-foreground/80 font-light italic">
                  If you are 21 or older, please return to the previous page and confirm your age.
                </p>
                <Button
                  onClick={() => setRejected(false)}
                  variant="outline"
                  className="mt-8 h-12 rounded-xl px-8"
                >
                  Return to Verification
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
