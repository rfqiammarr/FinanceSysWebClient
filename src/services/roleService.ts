import apiClient from './api';

export interface Role {
  roleId: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRolePayload {
  name: string;
  description?: string;
}

export const roleService = {
  // Get all roles
  getAllRoles: async (): Promise<Role[]> => {
    try {
      const response = await apiClient.get('/Role');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  // Get single role by ID
  getRoleById: async (roleId: string): Promise<Role> => {
    try {
      const response = await apiClient.get(`/Role/${roleId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching role ${roleId}:`, error);
      throw error;
    }
  },

  // Create new role
  createRole: async (payload: CreateRolePayload): Promise<Role> => {
    try {
      const response = await apiClient.post('/Role', payload);
      return response.data.data;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  },

  // Update role
  updateRole: async (
    roleId: string,
    payload: Partial<CreateRolePayload>,
  ): Promise<Role> => {
    try {
      const response = await apiClient.put(`/Role/${roleId}`, payload);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating role ${roleId}:`, error);
      throw error;
    }
  },

  // Delete role
  deleteRole: async (roleId: string): Promise<void> => {
    try {
      await apiClient.delete(`/Role/${roleId}`);
    } catch (error) {
      console.error(`Error deleting role ${roleId}:`, error);
      throw error;
    }
  },
};
