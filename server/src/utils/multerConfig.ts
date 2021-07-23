import multer, { Options } from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      return cb(null, false)
    }

    cb(null, true)
  }
} as Options
