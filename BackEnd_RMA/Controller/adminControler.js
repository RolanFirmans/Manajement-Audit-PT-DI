const pool = require('../utils/dbaudit');
const bcrypt = require('bcrypt');




const createDataKaryawan = async (req, res) => {
  const { key, key1, key2, key3 } = req.body;
  
  console.log('Data yang diterima:', { key, key1, key2, key3 });

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    if (key2 === undefined || key2 === null) {
      throw new Error('Role (key2) tidak ada dalam body request');
    }

    let roleInt = parseInt(key2);

    if (isNaN(roleInt) || roleInt < 0 || roleInt > 4) {
      throw new Error(`Role tidak valid: ${key2}`);
    }

    console.log('Role yang dikonversi:', roleInt);

    // Enkripsi NIK (key) sebagai password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(key, saltRounds);

    await client.query(`
      INSERT INTO TMAUDUSR 
      (N_AUDUSR_USRNM, N_AUDUSR_NM, C_AUDUSR_ROLE, C_AUDUSR_AUDR, I_AUDUSR_EMAIL, n_audusr_pswd)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [key, key1, roleInt, roleInt, key3, hashedPassword]);

    await client.query('COMMIT');
    res.status(200).json({ message: 'User berhasil ditambahkan' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saat menambahkan user:', error);
    res.status(400).json({ error: 'Terjadi kesalahan saat menambahkan user', details: error.message });
  } finally {
    client.release();
  }
};


const getKaryawan = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.n_audusr_usrnm, t.n_audusr_nm, t.c_audusr_audr AS role, t.i_audusr_email, e.organisasi
      FROM TMAUDUSR t
      LEFT JOIN karyawan e ON t.n_audusr_usrnm = e.nik
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.json({ payload: result.rows });
  } catch (error) {
    console.error('Error fetching karyawan:', error);
    res.status(500).json({ error: 'An error occurred while fetching karyawan data' });
  }
};

// Endpoint DELETE untuk DELETE data
const deleteKaryawan = async (req, res, next) => {
  console.log('Rute delete dipanggil, ID:', req.params.id);
  next();

  const query = 'DELETE FROM TMAUDUSR WHERE I_AUDUSR = $1';

  try {
    const result = await pool.query(query, [iAudusr]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json({ message: 'Data karyawan berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting karyawan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data' });
  }
};

// Endpoint PUT untuk UPDATE data
const updateKaryawan = (req, res) => {
    const { n_audusr_usrnm } = req.params;
    const { n_audusr_nm, n_audusr_pswd, i_audusr_email, c_audusr_role, c_audusr_audr } = req.body;

    const query = `
    UPDATE tmaudusr
    SET n_audusr_nm = $1, n_audusr_pswd = $2, i_audusr_email = $3, c_audusr_role = $4, c_audusr_audr = $5
    WHERE n_audusr_usrnm = $6;
    `;

    const values = [n_audusr_nm, n_audusr_pswd, i_audusr_email, c_audusr_role, c_audusr_audr, n_audusr_usrnm];

    pool.query(query, values, (error, result) => {
        if (error) {
            console.error('Query error:', error);
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate data.' });
        }
        console.log('User updated successfully');
        res.status(200).send('User updated successfully');
    });
};


module.exports = {
    createDataKaryawan,
    getKaryawan,
    deleteKaryawan,
    updateKaryawan,
 
};
