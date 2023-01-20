type ProductAcquired = {
  productName: string;
  date: Date;
  ticketsQuantity: number;
  ticketPriceByUnity: number;
};

type Users = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  productAcquired?: ProductAcquired[];
};

export { Users };
