const pool = require('../utils/dbaudit');


// Endpoint GET untuk mengambil data 
const getKaryawan = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tmaudusr');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
// Endpoint POST untuk Creacte data
  const createDataKaryawan = (req, res) => {
    // Ambil data dari req.body
    const { n_audusr_usrnm, n_audusr_nm, n_audusr_pswd, i_audusr_email, c_audusr_role, c_audusr_audr } = req.body;

    // Validasi apakah c_audusr_audr ada dan bukan undefined
    if (!c_audusr_audr || typeof c_audusr_audr !== 'string') {
        return res.status(400).json({ error: 'Nilai c_audusr_audr tidak valid.' });
    }

    // Konversi c_audusr_audr ke integer 
    const convertedAudr = parseInt(c_audusr_audr.replace('IT', ''), 10);

    if (isNaN(convertedAudr)) {
        return res.status(400).json({ error: 'Nilai organisasi tidak valid.' });
    }

    // Deklarasikan query SQL
    const query = `
    INSERT INTO tmaudusr (n_audusr_usrnm, n_audusr_nm, c_audusr_role, c_audusr_audr, i_audusr_email, n_audusr_pswd)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

    // Menjalankan query dengan data dari req.body
    pool.query(query, [n_audusr_usrnm, n_audusr_nm, c_audusr_role, convertedAudr, i_audusr_email, n_audusr_pswd], (error, results) => {
        if (error) {
            console.error('Query error:', error);
            return res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data.' });
        }
        console.log('User added successfully');
        res.status(201).send('User added successfully');
    });
};

// Endpoint DELETE untuk DELETE data
const deleteKaryawan = (req, res) => {
    const i_audusr = req.params.i_audusr;

    // Konversi parameter menjadi integer
    const parsedId = parseInt(i_audusr, 10);

    console.log('Parameter received:', i_audusr);
    console.log('Parsed ID:', parsedId);

    if (isNaN(parsedId)) {
        return res.status(400).json({ error: 'ID tidak valid.' });
    }

    const query = 'DELETE FROM tmaudusr WHERE i_audusr = $1';
    pool.query(query, [parsedId], (error, results) => {
        if (error) {
            console.error('Query error:', error);
            return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data.' });
        }

        if (results.rowCount === 0) {
            console.log('No user found to delete');
            return res.status(404).json({ error: 'User tidak ditemukan.' });
        }

        console.log('User deleted successfully');
        res.status(200).json({ message: 'User deleted successfully' });
    });
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
