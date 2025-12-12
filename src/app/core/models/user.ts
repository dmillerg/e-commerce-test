export interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  description: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  active: number;
  address: string;
  providers: Provider[];
  password?:string;
}

export interface Provider {
  id: number;
  provider: string;
  externalId: string;
  avatar: string;
  createdAt: string;
}