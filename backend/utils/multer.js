import multer from 'multer';

// Store file in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;