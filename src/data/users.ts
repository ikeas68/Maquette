import { faker } from '@faker-js/faker';

export type UserRow = {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'Actif' | 'En attente' | 'Suspendu';
  createdAt: string;
};

const statuses: UserRow['status'][] = ['Actif', 'En attente', 'Suspendu'];

export const users: UserRow[] = Array.from({ length: 120 }).map((_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  age: faker.number.int({ min: 18, max: 65 }),
  status: faker.helpers.arrayElement(statuses),
  createdAt: faker.date.past().toISOString().split('T')[0]
}));
