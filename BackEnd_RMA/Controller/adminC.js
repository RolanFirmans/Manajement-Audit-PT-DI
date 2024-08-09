
const express = require('express');
const pool = require('../utils/MAudit');

// End point GET untuk mengambil data
// module.exports = async (req, res) => {
//   try {
//     // Query untuk mengambil data dari tabel data_karyawan dan join dengan tabel tmaudusr
//     const result = await pool.query(`
//       SELECT
//         dk.nik,
//         dk.nama,
//         t.n_audusr_email AS audusr_email
//       FROM
//         data_karyawan dk
//       JOIN
//         tmaudusr t ON dk.nik = t.n_audusr_usrnm
//     `);

//     console.log(result); // Log result to see its structure
//     res.json(result.rows); // Access the rows property
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };



// //Endpoint API Post Methods
// module.exports = (req, res) => {
//   const { n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, n_audusr_email, c_audusr_role, c_audusr_audr, i_entry, d_entry } = req.body;

//   if (!n_audusr_usrnm || !n_audusr_nm || !n_audusr_pswd || !n_audusr_email || !c_audusr_role || !c_audusr_audr) {
//       return res.status(400).json({ error: 'All required fields must be provided' });
//   }
  
//   const query = `
//       INSERT INTO tmaudusr 
//       (n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, n_audusr_email, c_audusr_role, c_audusr_audr, i_entry, d_entry)
//       VALUES 
//       ($1, $2, $3, $4, $5, $6, $7, $8)
//   `;
  
//   pool.query(query, [n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, n_audusr_email, c_audusr_role, c_audusr_audr, i_entry, d_entry], (dbError, dbResponse) => {
//       if (dbError) {
//           console.error(dbError);
//           return res.status(500).json({ error: 'Failed to add data to database' });
//       }
  
//       res.status(201).json({ message: 'Data successfully added', result: dbResponse });
//   });
  
// };


module.exports = (req, res) => {
    pool.query(
        `
        INSERT INTO tmaudusr 
        (n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, n_audusr_email, c_audusr_role, c_audusr_audr, i_entry, d_entry)
        `,
        [],
        (dbError, dbResponse) => {
            if (dbError) throw dbError;

            res.json(dbResponse.rows);
        }
    );
}

