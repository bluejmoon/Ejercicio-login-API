const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "-" + Date.now())
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)){
        const error = new Error("Tipo de archivo no admitido");
        error.code = "LIMIT_FILE_TYPES";
    }
    cb(null, true)
};

const upload = multer({storage, fileFilter});

export default upload;