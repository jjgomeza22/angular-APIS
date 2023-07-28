export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface CreatedUserDTO extends Omit<User, 'id'> {};
