import { v4 as uuid } from "uuid";

export const users = [];

export function createUser(email, password) {
  const user = {
    id: uuid(),
    email,
    password,
    createdAt: Date.now()
  };
  users.push(user);
  return user;
}

export function findUser(email) {
  return users.find(u => u.email === email);
}
