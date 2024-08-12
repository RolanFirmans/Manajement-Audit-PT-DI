const pool = require('../utils/dbaudit');

module.exports = (req, res) => {
    pool.query(
        `
        SELECT nik, nama, organisasi, email FROM karyawan
        ORDER BY nik
        `,
        [],
        (dbError, dbResponse) => {
            if (dbError) throw dbError;

            res.json(dbResponse.rows);
        }
    );
};
