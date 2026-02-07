import { useState, useCallback } from 'react';
import { roleService } from '../services/roleService';
import type { Role, CreateRolePayload } from '../services/roleService';

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roleService.getAllRoles();
      setRoles(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch roles';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
  };
};

export const useRoleById = (roleId: string) => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRole = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roleService.getRoleById(roleId);
      setRole(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch role';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [roleId]);

  return {
    role,
    loading,
    error,
    fetchRole,
  };
};

export const useCreateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRole = useCallback(
    async (payload: CreateRolePayload): Promise<Role | null> => {
      setLoading(true);
      setError(null);
      try {
        const data = await roleService.createRole(payload);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create role';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    createRole,
  };
};

export const useUpdateRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRole = useCallback(
    async (
      roleId: string,
      payload: Partial<CreateRolePayload>,
    ): Promise<Role | null> => {
      setLoading(true);
      setError(null);
      try {
        const data = await roleService.updateRole(roleId, payload);
        return data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update role';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    updateRole,
  };
};

export const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRole = useCallback(async (roleId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await roleService.deleteRole(roleId);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete role';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    deleteRole,
  };
};
