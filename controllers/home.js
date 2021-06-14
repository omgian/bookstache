const Book = require("../models/Book");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const title = req.query.title
      const reg = new RegExp(title, "i");
      const query = { title: reg }
      const results = await Book.find(query);

      const favBooks = await Book.find({favorite: true});
      // console.log('favBooks', favBooks)
      res.render("index.ejs", { books: results, favBooks: favBooks, search: title});
    } catch (err) {
      console.log(err);
    }
  },
  redirectHome: (req, res) => {
      return res.redirect("/");
    }
};
