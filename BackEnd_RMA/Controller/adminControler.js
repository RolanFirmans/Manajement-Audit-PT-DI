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

    // Konversi c_audusr_audr ke integer jika perlu
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






module.exports = {
    createDataKaryawan,
    getKaryawan,
};
