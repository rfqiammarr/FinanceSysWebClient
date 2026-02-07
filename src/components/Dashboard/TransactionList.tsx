import { Card, Table, Badge, Text, Stack } from '@mantine/core';
import type { Transaction } from '../../types/dashboard';

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
}

export default function TransactionList({
  transactions,
  title = 'Transaksi Terbaru',
}: TransactionListProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Pendapatan: 'green',
      Belanja: 'blue',
      Tabungan: 'purple',
      Utilitas: 'orange',
      Hiburan: 'pink',
      Kesehatan: 'red',
    };
    return colors[category] || 'gray';
  };

  const rows = transactions.map((transaction) => (
    <Table.Tr key={transaction.id}>
      <Table.Td>
        <Stack gap={2}>
          <Text fw={500} size="sm">
            {transaction.description}
          </Text>
          <Text size="xs" c="dimmed">
            {transaction.date}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Badge color={getCategoryColor(transaction.category)} variant="light">
          {transaction.category}
        </Badge>
      </Table.Td>
      <Table.Td align="right">
        <Text fw={500} color={transaction.type === 'income' ? 'green' : 'red'}>
          {transaction.type === 'income' ? '+' : '-'}
          Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card withBorder padding="lg" radius="md" shadow="sm">
      <Card.Section withBorder inheritPadding py="md">
        <Text fw={700} size="lg">
          {title}
        </Text>
      </Card.Section>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Deskripsi</Table.Th>
            <Table.Th>Kategori</Table.Th>
            <Table.Th align="right">Jumlah</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
}
