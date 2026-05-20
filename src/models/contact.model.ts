import { pool } from '../config/db';

export interface Contact {
  id?: number;
  full_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const ContactModel = {
  async getAllContacts(search?: string) {
    let query = 'SELECT * FROM contacts';
    const values: any[] = [];
    
    if (search) {
      query += ' WHERE full_name ILIKE $1 OR phone_number ILIKE $1';
      values.push(`%${search}%`);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getContactById(id: number) {
    const query = 'SELECT * FROM contacts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async createContact(contact: Contact) {
    const query = `
      INSERT INTO contacts (full_name, phone_number, email, address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [contact.full_name, contact.phone_number, contact.email, contact.address];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateContact(id: number, contact: Contact) {
    const query = `
      UPDATE contacts
      SET full_name = $1, phone_number = $2, email = $3, address = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const values = [contact.full_name, contact.phone_number, contact.email, contact.address, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteContact(id: number) {
    const query = 'DELETE FROM contacts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};
