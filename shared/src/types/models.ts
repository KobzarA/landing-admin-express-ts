export interface IUser {
  email: string;
  username: string;
  role: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export interface IProduct {
  sku: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}
