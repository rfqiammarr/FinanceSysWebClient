import { Container, Stack, Tabs } from '@mantine/core';
import AppLayout from '../components/Layout/AppLayout';
import RoleManagement from '../components/Masterdata/RoleManagement';

export default function Masterdata() {
  return (
    <AppLayout>
      <Container size="xl" py="md">
        <Stack gap="lg">
          <Tabs defaultValue="role">
            <Tabs.List>
              <Tabs.Tab value="role">Role</Tabs.Tab>
              {/* Tambah tab lain seperti User, Permission, dll */}
            </Tabs.List>

            <Tabs.Panel value="role" pt="md">
              <RoleManagement />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </AppLayout>
  );
}
