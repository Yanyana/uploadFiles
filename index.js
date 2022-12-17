const express = require('express')
const multer = require('multer')
const router = express.Router()

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  }
})

// Init Upload
const upload = multer({
  storage: storage
}).array('files', 10)  // 10 adalah jumlah maksimal file yang diizinkan untuk diupload

// @route POST /upload
// @desc  Upload multiple files
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send(err)
    } else {
      return res.send('Files uploaded successfully')
    }
  })
})

module.exports = router