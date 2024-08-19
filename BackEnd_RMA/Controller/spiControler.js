const pool = require('../utils/dbaudit');



const createUploadExcel = async (req, res) => {
  const { readFile, utils } = require('xlsx');
  const { key, key1, key2, key3, key4} = req.body;

  console.log('Data yang diterima:', { key, key1, key2, key3, key4});

  const file = req.file; // File Excel yang diupload
  const client = await pool.connect();

  try {
    
    await client.query('BEGIN');

    // Baca file Excel
    const workbook = readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet ke dalam JSON
    const jsonData = utils.sheet_to_json(worksheet);

    // Tanggal saat ini
    const currentDate = new Date();

    // Simpan data ke dalam tabel
    for (let row of jsonData) {
      const {
        N_AUDEVD_TITLE,
        N_AUDEVD_PHS,
        C_AUDEVD_STAT,
        D_AUDEVD_DDL,
        N_AUDEVD_AUDR
      } = row; // Sesuaikan dengan kolom yang ada di Excel

      await client.query(
        `
          INSERT INTO TMAUDVD
          (N_AUDEVD_TITLE, N_AUDEVD_PHS, C_AUDEVD_STAT, D_AUDEVD_DDL, N_AUDEVD_AUDR)
          VALUES ($1, $2, $3, $4, $5)
        `,
        [N_AUDEVD_TITLE, N_AUDEVD_PHS, C_AUDEVD_STAT, D_AUDEVD_DDL || currentDate, N_AUDEVD_AUDR]
      );
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Data berhasil ditambahkan' });

    res.json({palyload: result.rows });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saat menyimpan data:', error);
    res.status(400).json({ error: 'Terjadi kesalahan saat menyimpan data', details: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  createUploadExcel,
}

