// const pool = require('../utils/dbaudit');

// module.exports = async (req, res) => {
//     let { id } = req.params;
//     console.log('Received parameter ID:', id); // Log parameter ID yang diterima

//     // Validasi ID
//     if (!id || isNaN(parseInt(id, 10))) {
//         return res.status(400).json({ error: 'Invalid ID format' });
//     }

//     id = parseInt(id, 10); // Konversi ID ke integer

//     try {
//         const query = `
//             SELECT A.N_AUDUSR_USRNM, A.N_AUDUSR_NM, A.C_AUDUSR_ROLE,
//                    A.C_AUDUSR_AUDR, B.c_org_cur, A.I_AUDUSR_EMAIL
//             FROM TMAUDUSR A
//             JOIN Vprrmempii B ON A.N_AUDUSR_USRNM = B.i_emp
//             WHERE A.I_AUDUSR = $1
//         `;

//         const result = await pool.query(query, [id]);
//         console.log('Query result:', result.rows); // Log hasil query

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.status(200).json(result.rows[0]);
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ error: 'Failed to fetch data from database' });
//     }
// };

