import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingCart, 
    Users, 
    BarChart3, 
    Settings, 
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        // Security: Block indexing for admin routes
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        
        return () => {
            document.head.removeChild(meta);
        };
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
        { icon: Package, label: 'Inventory', path: '/admin/inventory' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#111114]/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 transform",
                !isSidebarOpen && "-translate-x-full"
            )}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">PEPTIDE<span className="text-orange-500">CRM</span></span>
                    </div>

                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive 
                                        ? "bg-orange-500/10 text-orange-500" 
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-400/5 gap-3"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 flex flex-col transition-all duration-300",
                isSidebarOpen ? "pl-64" : "pl-0"
            )}>
                {/* Header */}
                <header className="h-16 border-b border-white/5 bg-[#0a0a0b]/60 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input 
                                type="text" 
                                placeholder="Search analytics..." 
                                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50 w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0a0a0b]" />
                        </Button>
                        <div className="h-8 w-px bg-white/10 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium">Business Owner</p>
                                <p className="text-xs text-zinc-500">owner@peptide.bio</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-500/20">
                                O
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
