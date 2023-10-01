import multer from "multer";

export default function (err, req, res, next) {
  console.log(`Async Handler: ${err.stack}`);

  if (err instanceof multer.MulterError) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File is too large",
      });
    }
    if (err.code == "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        error: "File limit exceeded",
      });
    }
    if (err.code == "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        error: "File must be an image",
      });
    }
  }

  // console.log(err);
  res.status(500).json({
    error: err.message,
    stack: err.stack,
    code: 500,
    success: false,
  });
}
