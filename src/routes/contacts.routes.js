import { Router } from 'express';

import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.controller.js';

import {
  validateContact
} from '../middleware/validation.middleware.js';

const router = Router();

router.get('/', getContacts);

router.get('/:id', getContactById);

router.post(
  '/',
  validateContact,
  createContact
);

router.put(
  '/:id',
  validateContact,
  updateContact
);

router.delete(
  '/:id',
  deleteContact
);

export default router;