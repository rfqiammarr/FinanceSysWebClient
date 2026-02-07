// Types untuk dashboard data
export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon?: string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}

export interface NavLink {
  label: string;
  icon?: React.ReactNode;
  link: string;
  badge?: string | number;
}
