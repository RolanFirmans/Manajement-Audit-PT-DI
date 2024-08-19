// admin.js
const express = require('express');
const cors = require('cors');
const { createUploadExcel } = require('../Controller/spiControler');

const router = express.Router();

const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
};

// Middleware untuk CORS dan parsing JSON
router.use(cors(corsOptions));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// GET
// Definisikan route untuk menampilkan karyawan
// router.get('/karyawan', getKaryawan);

// POST
// Definisikan route untuk menambahkan karyawan
router.post('/upload-file-excel-spi', createUploadExcel);

// DELETE
// Definisikan route untuk delete karyawan
// router.delete('/delete-karyawan/:id', deleteKaryawan);

// PUT
// Definisikan route untuk update karyawan
// router.put('/update-karyawan/:n_audusr_usrnm', updateKaryawan); 



module.exports = router;
