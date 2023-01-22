class ProductDTO {
  id: string;
  name: string;
  date: Date;
  address: string;
  price: number;
  place: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  time: string;
  constructor({
    _id,
    name,
    date,
    address,
    price,
    place,
    time,
    thumbnail,
    updatedAt,
    createdAt,
  }) {
    this.id = _id;
    this.name = name;
    this.address = address;
    this.date = date;
    this.time = time;
    this.price = price;
    this.place = place;
    this.thumbnail = thumbnail;
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

class ProductIdDTO {
  id: string;

  constructor({ _id }) {
    this.id = _id;
  }
}

const productIdDTO = (products) => {
  if (Array.isArray(products)) {
    return products.map((product) => {
      return { ...new ProductIdDTO(product) };
    });
  } else {
    return { ...new ProductIdDTO(products) };
  }
};

export { productsDTO, productIdDTO };
