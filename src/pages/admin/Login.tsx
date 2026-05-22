import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || "/admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await api.post('/auth/login', { email, password });
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please contact your system administrator.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.05),transparent_50%)]">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/20 mb-6 border border-orange-400/20">
                        <TrendingUp className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Enterprise CRM</h1>
                    <p className="text-zinc-500 mt-2 text-center">Secure authentication system for the Peptideology dashboard.</p>
                </div>

                <div className="bg-[#111114] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3 text-red-500 text-sm animate-in fade-in zoom-in-95 duration-200">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <Input 
                                    type="email" 
                                    placeholder="support@peptideology.ca"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus-visible:ring-orange-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <Input 
                                    type="password" 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 h-14 pl-12 rounded-2xl focus-visible:ring-orange-500/50"
                                />
                            </div>
                        </div>

                        <Button 
                            disabled={isLoading}
                            className="w-full h-14 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Secure Authorization'}
                        </Button>
                    </form>
                </div>

                <p className="mt-10 text-center text-xs text-zinc-600 font-medium uppercase tracking-[0.2em]">
                    Restricted Access · Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
