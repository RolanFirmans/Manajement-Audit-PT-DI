// const express = require('express');
// const pool = require('../utils/dbaudit');

// // Endpoint API Post Methods
// module.exports = async (req, res) => {
//     const { n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, i_audusr_email, c_audusr_role, c_audusr_audr } = req.body;

//     // Validasi input
//     if (!n_audusr_usrnm || !n_audusr_nm || !n_audusr_pswd || !i_audusr_email || !c_audusr_role || !c_audusr_audr) {
//         return res.status(400).json({ error: 'All required fields must be provided' });
//     }

//     // Konversi c_audusr_role dan c_audusr_audr menjadi integer jika perlu
//     const role = parseInt(c_audusr_role, 10);
//     const organization = parseInt(c_audusr_audr, 10);
//     if (isNaN(role) || isNaN(organization)) {
//         return res.status(400).json({ error: 'Invalid role or organization value' });
//     }

//     // Query SQL untuk menyimpan data
//     const query = `
//         INSERT INTO tmaudusr 
//         (n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, i_audusr_email, c_audusr_role, c_audusr_audr, i_entry, d_entry)
//         VALUES 
//         ($1, $2, $3, $4, $5, $6, $7, $8)
//         RETURNING i_audusr;
//     `;
    
//     try {
//         const result = await pool.query(query, [
//             n_audusr_usrnm, 
//             n_audusr_nm, 
//             n_audusr_pswd, 
//             i_audusr_email, 
//             role, 
//             organization, 
//             '1', // contoh value untuk i_entry
//             new Date().toISOString().split('T')[0] // format tanggal YYYY-MM-DD
//         ]);
//         res.status(201).json({ message: 'Data successfully added', result: result.rows[0] });
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Failed to add data to database' });
//     }
// };
