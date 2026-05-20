import pool from "../config/db.js";

export const getAllContacts = async ({
  search = "",
  sortBy = "full_name",
  order = "ASC",
  page = 1,
  limit = 50,
}) => {

  const offset =
    (Number(page) - 1) * Number(limit);

  const query = `

    SELECT *

    FROM contacts

    WHERE

      full_name ILIKE $1

      OR phone_number ILIKE $1

      OR email ILIKE $1

      OR group_name ILIKE $1

    ORDER BY ${sortBy} ${order}

    `;

  const values = [

    `%${search}%`

  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows;

};

export const getContactById = async (
  id
) => {

  const result =
    await pool.query(

      `

      SELECT *

      FROM contacts

      WHERE id = $1

      `,

      [id]

    );

  return result.rows[0];

};

export const createContact = async (
  data
) => {

  const query = `

    INSERT INTO contacts (

      full_name,
      phone_number,
      email,
      address,
      is_favorite,
      group_name,
      notes

    )

    VALUES (

      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7

    )

    RETURNING *;

  `;

  const values = [

    data.full_name,

    data.phone_number,

    data.email,

    data.address,

    data.is_favorite || false,

    data.group_name || null,

    data.notes || null

  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];

};

export const updateContact = async (
  id,
  data
) => {

  const query = `

    UPDATE contacts

    SET

      full_name = $1,

      phone_number = $2,

      email = $3,

      address = $4,

      is_favorite = $5,

      group_name = $6,

      notes = $7,

      updated_at =
        CURRENT_TIMESTAMP

    WHERE id = $8

    RETURNING *;

  `;

  const values = [

    data.full_name,

    data.phone_number,

    data.email,

    data.address,

    data.is_favorite || false,

    data.group_name || null,

    data.notes || null,

    id

  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];

};

export const deleteContact = async (
  id
) => {

  const result =
    await pool.query(

      `

      DELETE FROM contacts

      WHERE id = $1

      RETURNING *;

      `,

      [id]

    );

  return result.rows[0];

};