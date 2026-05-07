export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
  company: {
    name: string;
    department: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export const getUsers = async (): Promise<UsersResponse> => {
  const res = await fetch("https://dummyjson.com/users?limit=20");
  const result = await res.json();
  if (!res.ok) throw new Error("Failed to fetch users");
  return result;
};