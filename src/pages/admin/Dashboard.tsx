import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    ShoppingCart, 
    Users, 
    ArrowUpRight,
    Package,
    Activity,
    Loader2
} from 'lucide-react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const StatCard = ({ title, value, growth, icon: Icon, color }: any) => (
    <div className="bg-[#111114] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl -mr-16 -mt-16 transition-opacity", color)} />
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl">
                <Icon className="w-6 h-6 text-orange-500" />
            </div>
            <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                growth > 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
            )}>
                {growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(growth)}%
            </div>
        </div>
        <p className="text-zinc-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
    </div>
);

const Dashboard = () => {
    const { data: statsData, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const response = await api.get('/admin/stats');
            return response.data.data;
        }
    });

    const { data: revenueData } = useQuery({
        queryKey: ['revenue-analytics'],
        queryFn: async () => {
            const response = await api.get('/admin/analytics/revenue');
            return response.data.data;
        }
    });

    if (isLoading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-zinc-500 animate-pulse font-mono uppercase tracking-widest text-xs">Compiling Business Intelligence...</p>
            </div>
        );
    }

    const { stats, recentOrders, lowStockProducts } = statsData || {};
    const chartData = revenueData?.map((d: any) => ({
        name: new Date(d._id).toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: d.revenue,
        orders: d.orders
    })) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Business Intelligence</h1>
                <p className="text-zinc-500">Welcome back, here's what's happening with your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats?.revenue?.toLocaleString() || '0'}`} 
                    growth={12.5} 
                    icon={DollarSign}
                    color="bg-orange-500"
                />
                <StatCard 
                    title="Active Orders" 
                    value={stats?.orders || '0'} 
                    growth={-2.4} 
                    icon={ShoppingCart}
                    color="bg-blue-500"
                />
                <StatCard 
                    title="New Customers" 
                    value={stats?.customers || '0'} 
                    growth={18.2} 
                    icon={Users}
                    color="bg-purple-500"
                />
                <StatCard 
                    title="Active Products" 
                    value={stats?.activeProducts || '0'} 
                    growth={0.5} 
                    icon={Package}
                    color="bg-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#111114] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Revenue Trends</h3>
                            <p className="text-sm text-zinc-500">Performance overview for the last 7 days</p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px'}}
                                    itemStyle={{color: '#f97316'}}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#111114] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-6">Recent Orders</h3>
                    <div className="space-y-6">
                        {recentOrders?.length > 0 ? recentOrders.map((order: any) => (
                            <div key={order._id} className="flex gap-4 items-start">
                                <div className="p-2 bg-orange-500/10 rounded-lg shrink-0">
                                    <Activity className="w-4 h-4 text-orange-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{order.customer?.name || 'Guest'}</p>
                                    <p className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-sm font-bold text-orange-500">${order.totalAmount}</div>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-12 text-zinc-500 text-sm italic">
                                No recent orders found
                            </div>
                        )}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-zinc-500 hover:text-white">
                        View All Activity
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
