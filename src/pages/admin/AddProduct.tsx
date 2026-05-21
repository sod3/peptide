import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Package, 
    Upload, 
    X, 
    Plus, 
    Save, 
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import api from '@/lib/api';
import { toast } from 'sonner';

const AddProduct = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        sku: '',
        tagline: '',
        shortDescription: '',
        description: '',
        price: '',
        costPrice: '',
        mg: '',
        purity: '99.0',
        category: '',
        stock: '',
        lowStockThreshold: '3',
        badge: '',
        isBestseller: false,
        isFeatured: false,
        isActive: true,
        lotNumber: `A-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from name if slug is empty or matches name pattern
            if (name === 'name' && (!prev.slug || prev.slug === prev.name.toLowerCase().replace(/ /g, '-'))) {
                newData.slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            }
            return newData;
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(prev => [...prev, ...filesArray]);
            
            const newPreviews = filesArray.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = new FormData();
            
            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value.toString());
            });

            // Append images
            images.forEach(image => {
                data.append('images', image);
            });

            await api.post('/admin/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success('Product added successfully!');
            navigate('/admin/inventory');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate('/admin/inventory')}
                        className="mb-4 text-zinc-500 hover:text-white -ml-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Inventory
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                    <p className="text-zinc-500">Create a new peptide compound in your database.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/admin/inventory')}>Cancel</Button>
                    <Button 
                        className="bg-orange-500 hover:bg-orange-600" 
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Product</>}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Info className="w-5 h-5 text-orange-500" />
                            <h2 className="text-xl font-bold">General Information</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Product Name</label>
                                <Input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    placeholder="e.g. BPC-157" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Slug (URL)</label>
                                <Input 
                                    name="slug" 
                                    value={formData.slug} 
                                    onChange={handleInputChange} 
                                    placeholder="bpc-157" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Tagline</label>
                            <Input 
                                name="tagline" 
                                value={formData.tagline} 
                                onChange={handleInputChange} 
                                placeholder="Synthetic Pentadecapeptide" 
                                className="bg-white/5 border-white/10 h-12 rounded-xl"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Full Description</label>
                            <Textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                placeholder="Detailed research findings and compound information..." 
                                className="bg-white/5 border-white/10 min-h-[150px] rounded-xl"
                                required
                            />
                        </div>
                    </section>

                    <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Package className="w-5 h-5 text-orange-500" />
                            <h2 className="text-xl font-bold">Research Specifications</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">MG per Vial</label>
                                <Input 
                                    name="mg" 
                                    type="number"
                                    value={formData.mg} 
                                    onChange={handleInputChange} 
                                    placeholder="5" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Purity (%)</label>
                                <Input 
                                    name="purity" 
                                    type="number"
                                    step="0.1"
                                    value={formData.purity} 
                                    onChange={handleInputChange} 
                                    placeholder="99.2" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">SKU</label>
                                <Input 
                                    name="sku" 
                                    value={formData.sku} 
                                    onChange={handleInputChange} 
                                    placeholder="PEPT-BPC-001" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</label>
                                <Select onValueChange={(v) => setFormData(p => ({ ...p, category: v }))}>
                                    <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#18181b] border-white/10 text-white">
                                        <SelectItem value="Tissue Repair">Tissue Repair</SelectItem>
                                        <SelectItem value="Athletic Research">Athletic Research</SelectItem>
                                        <SelectItem value="Secretagogue Research">Secretagogue Research</SelectItem>
                                        <SelectItem value="Cellular Senescence">Cellular Senescence</SelectItem>
                                        <SelectItem value="Metabolic Research">Metabolic Research</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Badge (Optional)</label>
                                <Input 
                                    name="badge" 
                                    value={formData.badge} 
                                    onChange={handleInputChange} 
                                    placeholder="Bestseller, New, etc." 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Pricing, Inventory & Images */}
                <div className="space-y-8">
                    <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold">Image Gallery</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {previews.map((src, i) => (
                                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                    <img src={src} className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3 text-white" />
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5 flex flex-col items-center justify-center cursor-pointer transition-all">
                                <Upload className="w-6 h-6 text-zinc-500 mb-2" />
                                <span className="text-xs text-zinc-500">Upload Image</span>
                                <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </section>

                    <section className="bg-[#111114] border border-white/5 rounded-3xl p-8 space-y-6">
                        <h2 className="text-xl font-bold">Pricing & Stock</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Sale Price (USD)</label>
                                <Input 
                                    name="price" 
                                    type="number"
                                    value={formData.price} 
                                    onChange={handleInputChange} 
                                    placeholder="0.00" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Cost Price (USD)</label>
                                <Input 
                                    name="costPrice" 
                                    type="number"
                                    value={formData.costPrice} 
                                    onChange={handleInputChange} 
                                    placeholder="0.00" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Stock Quantity</label>
                                <Input 
                                    name="stock" 
                                    type="number"
                                    value={formData.stock} 
                                    onChange={handleInputChange} 
                                    placeholder="0" 
                                    className="bg-white/5 border-white/10 h-12 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 space-y-4 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Featured Product</label>
                                    <p className="text-xs text-zinc-500">Show on homepage</p>
                                </div>
                                <Switch 
                                    checked={formData.isFeatured}
                                    onCheckedChange={(v) => setFormData(p => ({ ...p, isFeatured: v }))}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Bestseller</label>
                                    <p className="text-xs text-zinc-500">Show bestseller badge</p>
                                </div>
                                <Switch 
                                    checked={formData.isBestseller}
                                    onCheckedChange={(v) => setFormData(p => ({ ...p, isBestseller: v }))}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
