export interface Product {
    _id?: string;
    id: string;
    name: string;
    slug: string;
    sku: string;
    tagline: string;
    description: string;
    price: number;
    mg: number;
    purity: number;
    category: string;
    stock: number;
    thumbnail?: string;
    images?: { url: string; publicId: string }[];
    badge?: string;
    isBestseller?: boolean;
    isFeatured?: boolean;
    isActive?: boolean;
}
