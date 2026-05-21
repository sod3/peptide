import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Package, 
    Search, 
    Plus, 
    Filter, 
    MoreVertical, 
    AlertTriangle,
    ArrowUpDown,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

const Inventory = () => {
    const { data: productsData, isLoading } = useQuery({
        queryKey: ['inventory-products'],
        queryFn: async () => {
            const response = await api.get('/shop', { params: { status: 'all' } }); // I might need to adjust controller to return all if needed, but for now shop is fine.
            return response.data.data;
        }
    });

    const products = productsData || [];
    const lowStockCount = products.filter((p: any) => p.stock > 0 && p.stock <= 3).length;
    const outOfStockCount = products.filter((p: any) => p.stock === 0).length;

    if (isLoading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-zinc-500 animate-pulse font-mono uppercase tracking-widest text-xs">Accessing Logistics Layer...</p>
            </div>
        );
    }
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Inventory Management</h1>
                    <p className="text-zinc-500">Track and manage your peptide stock levels.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Link to="/admin/inventory/add">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#111114] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Package className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Total SKUs</p>
                        <p className="text-xl font-bold">{products.length}</p>
                    </div>
                </div>
                <div className="bg-[#111114] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Low Stock</p>
                        <p className="text-xl font-bold">{lowStockCount}</p>
                    </div>
                </div>
                <div className="bg-[#111114] border border-white/5 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Out of Stock</p>
                        <p className="text-xl font-bold">{outOfStockCount}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111114] border border-white/5 p-4 rounded-xl">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input 
                        type="text" 
                        placeholder="Search products, SKU, category..." 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500/50"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 flex-1 md:flex-none">
                        <Filter className="w-4 h-4 mr-2" />
                        Category
                    </Button>
                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 flex-1 md:flex-none">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Sort By
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#111114] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((item: any) => (
                                <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{item.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{item.sku}</td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "font-bold",
                                            item.stock <= 3 ? "text-orange-500" : "text-white"
                                        )}>
                                            {item.stock}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">${item.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            item.stock > 3 && "bg-emerald-500/10 text-emerald-500",
                                            item.stock > 0 && item.stock <= 3 && "bg-orange-500/10 text-orange-500",
                                            item.stock === 0 && "bg-rose-500/10 text-rose-500",
                                        )}>
                                            {item.stock === 0 ? 'Out of Stock' : item.stock <= 3 ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-white/5 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">Showing {products.length} of {products.length} products</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 disabled:opacity-50">Previous</Button>
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
