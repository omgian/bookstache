const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const booksController = require("../controllers/books");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/searchisbn", booksController.searchByIsbn);
// router.get("/:id", ensureAuth, booksController.getPost);
router.post("/addBook", booksController.addBook);
router.get("/getBook", booksController.getBookInfo)
router.put("/toggleFavoriteBook", booksController.toggleFavoriteBook)
// router.post("/add", upload.single("file"), booksController.createPost);

// router.put("/likePost/:id", booksController.likePost);

router.delete("/deleteBook", booksController.deleteBook);

module.exports = router;
