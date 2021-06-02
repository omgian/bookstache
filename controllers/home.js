const Book = require("../models/Book");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const results = await Book.find();
      res.render("index.ejs", { books: results });
    } catch (err) {
      console.log(err);
    }
  },
};
