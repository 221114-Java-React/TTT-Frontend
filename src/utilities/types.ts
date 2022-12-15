/*****************************************************
  Global state sitting in App component 
  Values of this are provided to the rest of the app with multiple Contexts
  State is updated with dispatch which is also provided with a Context
******************************************************/
export type AppStateType = {
  authToken: string | null;
  cart: { [key: string]: CartType };
};

/******************************************************************
  The following types all correspond to a specific table in the DB.
  See the ERD for details 
*******************************************************************/
export type UserType = {
  id: string;
  email: string;
  givenName: string;
  surname: string;
  role?: string;
  cardnumber?: string;
  expDate?: string;
  password?: string;
};

export type AddressType = {
  id: string;
  userId?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type ItemType = {
  id: string;
  name?: string;
  stock?: number;
  msrp?: number;
  description?: string;
  imgUrl?: string;
  currentPrice?: number;
  type?: string;
};

export type OrderType = {
  id: string;
  userId?: string;
  purchaseDate?: Date;
  status?: string;
  shippingId?: string;
  deliveredDate?: Date;
};

export type OrderJunctionType = {
  itemId: string;
  orderId: string;
  amount: number;
  purchasePrice: number;
};

export type CartType = {
  itemId: string;
  amount: number;
  userId?: string;
};

export type cartItemType = {
  itemId : string;
  orderId : string;
  name : string;
  amount : number;
  purchasePrice : number;
};
