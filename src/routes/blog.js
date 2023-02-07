import express from "express";
import {
  getAllPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  createComment,
} from "../controllers/blogController";
import multer from "multer";
import path from "path";
import { Authorization } from "../middleware/Authorization";
const router = express.Router();
let upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
router.get("/blog", getAllPosts);
router.post("/blog", Authorization, upload.single("image"), createPost);
router.patch("/blog/:id", upload.single("image"), updatePost);
router.route("/blog/:id").get(getSinglePost).delete(deletePost);
router.post("/comment/:id", Authorization, createComment);

export default router;
