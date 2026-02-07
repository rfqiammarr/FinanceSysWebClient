import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Group,
  Modal,
  TextInput,
  Textarea,
  Stack,
  ActionIcon,
  Text,
  Alert,
  Loader,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconAlertCircle,
} from '@tabler/icons-react';
import {
  useRoles,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
} from '../../hooks/useRole';
import type { Role, CreateRolePayload } from '../../services/roleService';

export default function RoleManagement() {
  const { roles, loading, error: fetchError, fetchRoles } = useRoles();
  const {
    loading: createLoading,
    error: createError,
    createRole,
  } = useCreateRole();
  const {
    loading: updateLoading,
    error: updateError,
    updateRole,
  } = useUpdateRole();
  const {
    loading: deleteLoading,
    error: deleteError,
    deleteRole,
  } = useDeleteRole();

  const [opened, setOpened] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<CreateRolePayload>({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleOpenModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        name: role.name,
        description: role.description || '',
      });
    } else {
      setEditingRole(null);
      setFormData({ name: '', description: '' });
    }
    setOpened(true);
  };

  const handleCloseModal = () => {
    setOpened(false);
    setEditingRole(null);
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      return;
    }

    let success = false;

    if (editingRole) {
      const result = await updateRole(editingRole.roleId, formData);
      success = result !== null;
    } else {
      const result = await createRole(formData);
      success = result !== null;
    }

    if (success) {
      handleCloseModal();
      fetchRoles();
    }
  };

  const handleDelete = async (roleId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus role ini?')) {
      const success = await deleteRole(roleId);
      if (success) {
        fetchRoles();
      }
    }
  };

  const error = fetchError || createError || updateError || deleteError;
  const isLoading = loading || createLoading || updateLoading || deleteLoading;

  const rows = roles.map((role) => (
    <Table.Tr key={role.roleId}>
      <Table.Td>{role.roleId}</Table.Td>
      <Table.Td fw={500}>{role.name}</Table.Td>
      <Table.Td>{role.description || '-'}</Table.Td>
      <Table.Td>
        {role.createdAt && (
          <Text size="sm" c="dimmed">
            {new Date(role.createdAt).toLocaleDateString('id-ID')}
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon
            color="blue"
            variant="subtle"
            onClick={() => handleOpenModal(role)}
            disabled={isLoading}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => handleDelete(role.roleId)}
            disabled={isLoading}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Card withBorder padding="lg" radius="md" shadow="sm" mb={20}>
        <Card.Section withBorder inheritPadding py="md">
          <Group justify="space-between">
            <Text fw={700} size="lg">
              Daftar Role
            </Text>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => handleOpenModal()}
              disabled={isLoading}
            >
              Tambah Role
            </Button>
          </Group>
        </Card.Section>

        {error && (
          <Alert icon={<IconAlertCircle />} color="red" mb="md">
            {error}
          </Alert>
        )}

        {loading ? (
          <Group justify="center" py="xl">
            <Loader />
          </Group>
        ) : (
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Nama</Table.Th>
                <Table.Th>Deskripsi</Table.Th>
                <Table.Th>Dibuat Pada</Table.Th>
                <Table.Th>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5} ta="center" py="md">
                    Tidak ada data
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      <Modal
        opened={opened}
        onClose={handleCloseModal}
        title={editingRole ? 'Edit Role' : 'Tambah Role Baru'}
        centered
      >
        <Stack gap="md">
          <TextInput
            label="Nama Role"
            placeholder="e.g., Admin, User, Manager"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
            error={
              !formData.name.trim() && formData.name !== ''
                ? 'Nama role diperlukan'
                : ''
            }
            required
          />

          <Textarea
            label="Deskripsi"
            placeholder="Deskripsi role (opsional)"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
            minRows={3}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              loading={createLoading || updateLoading}
              disabled={!formData.name.trim()}
            >
              {editingRole ? 'Update' : 'Buat'} Role
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
