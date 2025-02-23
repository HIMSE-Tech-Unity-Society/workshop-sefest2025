import { Auth } from "./auth";
import { Categories } from "./categories";

export interface Product {
  product_id: string;
  creator_id: string;
  category_id: string;
  title: string;
  slug: string;
  overview: string;
  product: string;
  cover: string;
  price: string;
  created_at?: string;
  updated_at?: string;
  creator: Auth;
  category: Categories;
} 

export interface OtherProduct {
  product_id: string;
  creator_id: string;
  category_id: string;
  title: string;
  slug: string;
  overview: string;
  product: string;
  cover: string;
  price: string;
  created_at?: string;
  updated_at?: string;
  creator: Auth;
  category: Categories;
}

export type ProductColumn = {
  product_id: string;
  category_id: string;
  title: string;
  slug: string;
  cover: string;
  price: string;
  created_at?: string;
  updated_at?: string;
};

export interface ProductClient {
  data: ProductColumn[];
}

export interface CellAction {
  data: ProductColumn;
}

export interface ProductsIdPage {
  slug?: string;
}

export interface ProductForm {
  initialData: Product | null;
  slug: string | undefined;
}
