export type ProductsContentProps = {
  query: string
  currentPage: number
}

export type ProductPreviewTmp = {
  id: string
  name: string
  material_price: number
  stock: number
  quality: string
}

export interface ProductsFormState {
  errorMessage?: string | null;
  success?: string | null;
  errors?: {
    name?: string[];
    quality?: string[];
    description?: string[];
    stock?: string[];
    unit_price?: string[];
    width?: string[];
    linear_size?: string[];
  };
}
