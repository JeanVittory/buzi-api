import { ProductAcquired } from './productAcquired.types';

type Users = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  productAcquired?: ProductAcquired[];
};

export { Users };
