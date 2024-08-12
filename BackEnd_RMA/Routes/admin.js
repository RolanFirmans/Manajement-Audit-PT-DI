// admin.js
const express = require('express');
const cors = require('cors');
const { getKaryawan } = require('../Controller/adminControler.js'); 
const { createDataKaryawan } = require('../Controller/adminControler.js'); // Sesuaikan dengan path yang benar

const router = express.Router();

const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
};

// Middleware untuk CORS dan parsing JSON
router.use(cors(corsOptions));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/karyawan', getKaryawan);

// Definisikan route untuk menambahkan karyawan
router.post('/add-karyawan', createDataKaryawan);

module.exports = router;
