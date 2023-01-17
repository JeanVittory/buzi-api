import { ProductDocument } from 'src/db/schemas';

interface Products extends ProductDocument {
  _id: string;
  name: string;
  date: Date;
  address: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductsDTO = {
  id: string;
  name: string;
  date: Date;
  address: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export { Products, ProductsDTO };