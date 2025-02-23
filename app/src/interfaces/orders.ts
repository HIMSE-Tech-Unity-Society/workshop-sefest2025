export type OrderColumn = {
  id: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export interface OrderClient {
  data: OrderColumn[];
}
