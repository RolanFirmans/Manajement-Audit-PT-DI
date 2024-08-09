const pool = require('../utils/MAudit')

module.exports = (req, res) => {
    pool.query(
        `
        SELECT * FROM data_karyawan
        ORDER BY id, nik, nama, organisasi, nama_organisasi, email, telepon, jabatan, nama_jabatan, nama_gelar, tanggal_lahir
        `,
        [],
        (dbError, dbResponse) => {
            if (dbError) throw dbError;

            res.json(dbResponse.rows);
        }
    );
}


