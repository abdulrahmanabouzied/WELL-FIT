import multer from "multer";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default function (dir) {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `src/public/uploads/${dir}/`);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.trunc(Math.random() * 1e5);
      const extention = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + extention);
    },
  });

  return multer({ storage });
}
