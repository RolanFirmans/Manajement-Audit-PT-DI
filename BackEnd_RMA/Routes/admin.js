const express = require('express')
const router = express.Router()

const getAdmin = require('../Controller/adminC')
router.get("/get", getAdmin)
router.post("/add-karyawan", getAdmin)

module.exports = router