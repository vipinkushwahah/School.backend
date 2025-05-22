import { Request, Response } from 'express';
import { createRoleSchema, updateRoleSchema } from '../validators/roleValidator';
import { createRole, updateRole, getRoleById, deleteRole,getAllRoles } from '../services/roleService';

async function createRoleController(req: Request, res: Response, nex:any): Promise<void> {
  try {
    const { error } = createRoleSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRoleController(req: Request, res: Response, nex:any): Promise<void> {
  try {
    const { error } = updateRoleSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const role = await updateRole(req.params.id, req.body);
    if (!role) {
      res.status(404).json({ error: 'Role not found' });
      return;
    }

    res.status(200).json(role);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

async function getRoleController(req: Request, res: Response, nex:any): Promise<void> {
  try {
    const role = await getRoleById(req.params.id);
    if (!role) {
      res.status(404).json({ error: 'Role not found' });
      return;
    }
    res.status(200).json(role);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteRoleController(req: Request, res: Response, nex:any): Promise<void> {
  try {
    const role = await deleteRole(req.params.id);
    if (!role) {
      res.status(404).json({ error: 'Role not found' });
      return;
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllRolesController(req: Request, res: Response, nex:any): Promise<void> {
  try {
    const roles = await getAllRoles(req.query);
    res.status(200).json(roles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export { 
  createRoleController, 
  updateRoleController, 
  getRoleController, 
  deleteRoleController, 
  getAllRolesController 
};