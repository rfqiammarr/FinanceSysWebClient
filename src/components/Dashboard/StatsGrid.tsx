import {
  Grid,
  Card,
  Group,
  Stack,
  Text,
  Badge,
  ThemeIcon,
} from '@mantine/core';
import { IconArrowUpRight, IconArrowDownLeft } from '@tabler/icons-react';
import type { DashboardCard } from '../../types/dashboard';

interface StatsGridProps {
  cards: DashboardCard[];
}

export default function StatsGrid({ cards }: StatsGridProps) {
  return (
    <Grid mb={30} gutter="lg">
      {cards.map((card) => (
        <Grid.Col key={card.id} span={{ base: 12, sm: 6, md: 3 }}>
          <Card withBorder padding="lg" radius="md" shadow="sm">
            <Group justify="space-between" mb="md">
              <Stack gap={0}>
                <Text size="sm" c="dimmed" fw={500}>
                  {card.title}
                </Text>
                <Text fw={700} size="lg">
                  {card.value}
                </Text>
              </Stack>
              {card.change !== undefined && card.changeType && (
                <ThemeIcon
                  color={
                    card.changeType === 'positive'
                      ? 'green'
                      : card.changeType === 'negative'
                        ? 'red'
                        : 'gray'
                  }
                  radius="md"
                  variant="light"
                >
                  {card.changeType === 'positive' ? (
                    <IconArrowUpRight size={18} />
                  ) : (
                    <IconArrowDownLeft size={18} />
                  )}
                </ThemeIcon>
              )}
            </Group>

            <Group justify="space-between">
              <Text size="xs" c="dimmed">
                {card.description}
              </Text>
              {card.change !== undefined && (
                <Badge
                  color={
                    card.changeType === 'positive'
                      ? 'green'
                      : card.changeType === 'negative'
                        ? 'red'
                        : 'gray'
                  }
                  variant="light"
                  size="sm"
                >
                  {card.changeType === 'positive' ? '+' : ''}
                  {card.change}%
                </Badge>
              )}
            </Group>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
