import type { DashboardCard, Transaction } from '../types/dashboard';

export const dashboardCards: DashboardCard[] = [
  {
    id: '1',
    title: 'Total Pendapatan',
    value: 'Rp 15.500.000',
    description: 'Bulan ini',
    change: 12.5,
    changeType: 'positive',
  },
  {
    id: '2',
    title: 'Total Pengeluaran',
    value: 'Rp 8.750.000',
    description: 'Bulan ini',
    change: -5.2,
    changeType: 'negative',
  },
  {
    id: '3',
    title: 'Saldo Tersisa',
    value: 'Rp 6.750.000',
    description: 'Saldo akhir',
    change: 8.3,
    changeType: 'positive',
  },
  {
    id: '4',
    title: 'Investasi',
    value: 'Rp 25.000.000',
    description: 'Total aset',
    change: 3.1,
    changeType: 'positive',
  },
];

export const recentTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Gaji',
    amount: 8000000,
    date: '2025-02-05',
    type: 'income',
    category: 'Pendapatan',
  },
  {
    id: '2',
    description: 'Belanja Groceries',
    amount: -450000,
    date: '2025-02-04',
    type: 'expense',
    category: 'Belanja',
  },
  {
    id: '3',
    description: 'Transfer ke Tabungan',
    amount: -2000000,
    date: '2025-02-03',
    type: 'expense',
    category: 'Tabungan',
  },
  {
    id: '4',
    description: 'Freelance Project',
    amount: 3500000,
    date: '2025-02-02',
    type: 'income',
    category: 'Pendapatan',
  },
  {
    id: '5',
    description: 'Bayar Listrik',
    amount: -850000,
    date: '2025-02-01',
    type: 'expense',
    category: 'Utilitas',
  },
];
