import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const CartWidget = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cart.length === 0) return;
        onClose();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold">Research Cart</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <ShoppingBag className="w-16 h-16 mb-4 stroke-[1]" />
                                    <p className="text-lg font-medium">Your cart is empty</p>
                                    <p className="text-sm">Explore our catalog to find research peptides.</p>
                                    <Button onClick={onClose} variant="link" className="mt-2 text-primary">Browse Shop</Button>
                                </div>
                            ) : cart.map((item) => (
                                <div key={item.product._id} className="flex gap-4 group">
                                    <div className="h-20 w-20 bg-zinc-50 rounded-xl flex items-center justify-center overflow-hidden border">
                                        <img src={item.product.thumbnail || '/peptide-vial.png'} alt={item.product.name} className="h-16 w-16 object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-zinc-900 truncate">{item.product.name}</h4>
                                                <p className="text-xs text-zinc-500">{item.product.mg}mg · ≥99% Purity</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="p-1 text-zinc-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                                                <button 
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                    className="p-1 px-2 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    className="p-1 px-2 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="font-bold text-zinc-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 bg-zinc-50 border-t space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-zinc-600">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-zinc-600">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-medium">Calculated at next step</span>
                                    </div>
                                    <div className="pt-2 border-t flex justify-between items-center">
                                        <span className="font-bold text-zinc-900">Total</span>
                                        <span className="text-2xl font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full h-14 rounded-2xl bg-primary text-primary-foreground shadow-glow group overflow-hidden relative"
                                    onClick={handleCheckout}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <CreditCard className="w-5 h-5" />
                                        <span className="text-base font-bold">Procure Batch</span>
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Button>
                                <p className="text-[10px] text-center text-zinc-400 uppercase tracking-widest font-medium">
                                    Encrypted 256-bit SSL Research Procurement
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
