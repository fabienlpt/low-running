type Account = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  createdAt: string;
};

const accounts: Account[] = [
  {
    id: 1,
    email: "john.doe@gmail.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 rue Example",
    city: "Paris",
    postalCode: "75000",
    phone: "0123456789",
    createdAt: "2024-01-01",
  },
];

export async function getAccountById(id: number): Promise<Account | null> {
  const account = accounts.find((account) => account.id === id);
  return account || null;
}

export async function updateAccount(
  id: number,
  data: Partial<Account>
): Promise<Account | null> {
  const accountIndex = accounts.findIndex((account) => account.id === id);
  if (accountIndex === -1) return null;

  accounts[accountIndex] = {
    ...accounts[accountIndex],
    ...data,
  };

  return accounts[accountIndex];
}

export function generateColorFromEmail(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
