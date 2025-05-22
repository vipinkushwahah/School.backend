import Role, { IRole } from '../models/Role';

export async function createRole(roleData: Partial<IRole>): Promise<IRole> {
  const role = new Role(roleData);
  return role.save();
}

export async function getRoleById(roleId: string): Promise<IRole | null> {
  return Role.findById(roleId);
}

export async function updateRole(roleId: string, updateData: Partial<IRole>): Promise<IRole | null> {
  return Role.findByIdAndUpdate(roleId, updateData, { new: true });
}

export async function deleteRole(roleId: string): Promise<IRole | null> {
  return Role.findByIdAndDelete(roleId);
}

export async function getAllRoles(query: any): Promise<IRole[] | null> {
    return Role.find(query);
  }