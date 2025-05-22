import { Request, Response } from 'express';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';
import { createUser, updateUser, getUserById, deleteUser, getAllUsers, findUserByEmailAndPhone } from '../services/userService';
import { sendEmail } from '../utils/emailService'; // Utility to send emails

async function createUserController(req: Request, res: Response, next: any): Promise<any> {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
      return;
    }

    const user = await createUser(req.body);

    // Send a welcome email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Welcome to Our Platform',
    //   text: `Hi ${user.name}, welcome to our platform!`,
    // });

    console.log('User createdassd:', user);
    // return user
      res.status(201).send(user);
  } catch (err: any) {
    console.log(err);
    if (err.code === 11000) {
      // Handle duplicate key error
      res.status(400).send({ error: 'User with this email and phone number already exists' });
    } else {
      res.status(500).send({ error: err.message });
    }
  }
}

async function updateUserController(req: Request, res: Response, next:  any): Promise<void> {
  try {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
      return;
    }

    const user = await updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    res.status(200).send(user);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

async function getUserController(req: Request, res: Response, next:  any): Promise<void> {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }
    res.status(200).send(user);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

async function deleteUserController(req: Request, res: Response, next:  any): Promise<void> {
  try {
    const user = await deleteUser(req.params.id);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

async function getAllUsersController(req: Request, res: Response, next:  any): Promise<void> {
  try {
    const users = await getAllUsers(req.query);
    res.status(200).send(users);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}

export { 
  createUserController, 
  updateUserController, 
  getUserController, 
  deleteUserController, 
  getAllUsersController 
};