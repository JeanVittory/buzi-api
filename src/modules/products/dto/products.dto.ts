class ProductDTO {
  id: string;
  name: string;
  date: Date;
  address: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  constructor({ _id, name, date, address, price, createdAt, updatedAt }) {
    this.id = _id;
    this.name = name;
    this.address = address;
    this.date = date;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const productsDTO = (products) => {
  if (Array.isArray(products)) {
    return products.map((product) => {
      return { ...new ProductDTO(product) };
    });
  } else {
    return { ...new ProductDTO(products) };
  }
};

class ProductPatchDTO {
  id: string;

  constructor({ _id }) {
    this.id = _id;
  }
}

const productsPatchDTO = (products) => {
  if (Array.isArray(products)) {
    return products.map((product) => {
      return { ...new ProductPatchDTO(product) };
    });
  } else {
    return { ...new ProductPatchDTO(products) };
  }
};

export { productsDTO, productsPatchDTO };
