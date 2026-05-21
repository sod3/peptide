import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Loader2, PackageCheck, Bitcoin, Landmark, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  });

  if (cart.length === 0 && !isProcessing) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
             <PackageCheck className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-display font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">You haven't added any research peptides to your order yet.</p>
          <Button asChild rounded-full className="rounded-full px-8 h-12">
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const items = cart.map((item) => ({
        productId: item.product._id || item.product.id,
        quantity: item.quantity,
      }));

      await api.post("/orders/checkout", {
        items,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        paymentMethod: selectedPayment,
      });

      toast.success("Order Placed Successfully!", {
        description: "Your research materials are being prepared for dispatch.",
      });
      clearCart();
      navigate("/");
    } catch (err: any) {
      toast.error("Order Failed", {
        description: err.response?.data?.message || "Please check your information and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: "card",
      title: "Credit / Debit Card",
      desc: "Secure checkout via AllayPay",
      icon: CreditCard,
      tag: "Secure",
    },
    {
      id: "crypto",
      title: "Crypto Payments",
      desc: "Pay with BTC, ETH, or USDT",
      icon: Bitcoin,
      tag: "Private",
    },
    {
      id: "interac",
      title: "Interac e-Transfer",
      desc: "Canadian researchers only",
      icon: Landmark,
      tag: "CA Only",
    },
  ];

  return (
    <Layout>
      <div className="container pt-32 pb-24">
        <div className="mb-8">
           <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to research shop
          </Link>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">Checkout</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-sm font-bold border border-primary/20">1</div>
                  <h3 className="text-xl font-semibold font-display italic">Contact Information</h3>
                </div>
                <div className="grid gap-4">
                   <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="researcher@institute.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-sm font-bold border border-primary/20">2</div>
                  <h3 className="text-xl font-semibold font-display italic">Shipping Destination</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">First Name</label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Last Name</label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Laboratory Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                   <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label htmlFor="state" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">State</label>
                        <input
                          required
                          type="text"
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="zip" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">ZIP</label>
                        <input
                          required
                          type="text"
                          name="zip"
                          id="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="h-12 rounded-xl border border-border/60 bg-white/50 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                   </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-sm font-bold border border-primary/20">3</div>
                  <h3 className="text-xl font-semibold font-display italic">Payment Method</h3>
                </div>
                <div className="grid gap-3">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedPayment(m.id)}
                      className={cn(
                        "group relative rounded-2xl border p-5 transition-all text-left flex items-center justify-between",
                        selectedPayment === m.id 
                          ? "border-primary bg-primary/[0.03] ring-1 ring-primary" 
                          : "border-border/60 bg-white hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-xl flex items-center justify-center transition-colors",
                          selectedPayment === m.id ? "bg-primary text-white" : "bg-surface text-primary"
                        )}>
                          <m.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{m.title}</span>
                            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] uppercase tracking-wider font-bold">{m.tag}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{m.desc}</div>
                        </div>
                      </div>
                      <div className={cn(
                        "h-5 w-5 rounded-full border-2 transition-all flex items-center justify-center",
                        selectedPayment === m.id ? "border-primary" : "border-border"
                      )}>
                        {selectedPayment === m.id && <div className="h-2.5 w-2.5 rounded-full bg-primary animate-in fade-in zoom-in duration-300" />}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full h-16 rounded-2xl bg-primary text-primary-foreground text-lg font-semibold shadow-glow hover:scale-[1.01] transition-transform flex items-center justify-center gap-3 mt-10"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing Procurement...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    <span>Complete Research Order</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-[2.5rem] border border-border/60 bg-white p-8 shadow-sm">
               <h3 className="text-xl font-semibold font-display mb-8">Order Summary</h3>
               <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                 {cart.map((item) => (
                   <div key={item.product._id || item.product.id} className="flex gap-4">
                      <div className="h-16 w-16 bg-surface rounded-xl flex items-center justify-center border border-border/40 shrink-0">
                         <img src={item.product.thumbnail || "/peptide-vial.png"} alt={item.product.name} className="h-12 w-12 object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{item.product.name}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">{item.quantity} × ${item.product.price}</div>
                      </div>
                      <div className="font-semibold text-sm">${(item.quantity * item.product.price).toFixed(2)}</div>
                   </div>
                 ))}
               </div>

               <div className="space-y-3 border-t border-border/40 pt-6">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground font-light">Subtotal</span>
                   <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-light">Laboratory Shipping</span>
                    <span className="text-emerald-600 font-medium">FREE</span>
                 </div>
                 <div className="flex justify-between text-xl font-semibold pt-4 border-t border-border/40">
                   <span className="font-display italic">Total</span>
                   <span className="font-mono text-primary">${cartTotal.toFixed(2)}</span>
                 </div>
               </div>

               <div className="mt-8 grid gap-4">
                 {[
                   { i: Truck, t: "Insured Cold-Chain Delivery" },
                   { i: CreditCard, t: "Encrypted Transactions" },
                   { i: ShieldCheck, t: "Lot-Traceability Guaranteed" },
                 ].map(({ i: Ic, t }) => (
                   <div key={t} className="flex items-center gap-3 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                     <Ic className="h-3.5 w-3.5 text-primary" />
                     {t}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
