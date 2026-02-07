// import { useNavigate } from 'react-router-dom';
import { Container, Stack } from '@mantine/core';
import AppLayout from '../components/Layout/AppLayout';
import StatsGrid from '../components/Dashboard/StatsGrid';
import TransactionList from '../components/Dashboard/TransactionList';
import { dashboardCards, recentTransactions } from '../data/dummy';

export default function Dashboard() {
  //   const navigate = useNavigate();

  // TODO: Implement auth checks
  // Check if user is authenticated, if not redirect to login

  return (
    <AppLayout>
      <Container size="xl" py="md">
        <Stack gap="lg">
          <StatsGrid cards={dashboardCards} />
          <TransactionList transactions={recentTransactions} />
        </Stack>
      </Container>
    </AppLayout>
  );
}
