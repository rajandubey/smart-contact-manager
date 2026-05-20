import * as contactService from '../services/contacts.service.js';
import {
  successResponse,
  errorResponse
} from '../utils/response.js';

export const getContacts = async (
  req,
  res,
  next
) => {
  try {
    const contacts =
      await contactService.getAllContacts(
        req.query
      );

    return successResponse(
      res,
      contacts
    );
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await contactService.getContactById(
        req.params.id
      );

    if (!contact) {
      return errorResponse(
        res,
        'Contact not found',
        404
      );
    }

    return successResponse(
      res,
      contact
    );
  } catch (error) {
    next(error);
  }
};

export const createContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await contactService.createContact(
        req.body
      );

    return successResponse(
      res,
      contact,
      'Contact created successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await contactService.updateContact(
        req.params.id,
        req.body
      );

    if (!contact) {
      return errorResponse(
        res,
        'Contact not found',
        404
      );
    }

    return successResponse(
      res,
      contact,
      'Contact updated successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (
  req,
  res,
  next
) => {
  try {
    const contact =
      await contactService.deleteContact(
        req.params.id
      );

    if (!contact) {
      return errorResponse(
        res,
        'Contact not found',
        404
      );
    }

    return successResponse(
      res,
      contact,
      'Contact deleted successfully'
    );
  } catch (error) {
    next(error);
  }
};