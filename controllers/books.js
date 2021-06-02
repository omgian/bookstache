const { Logger } = require("mongodb");
const https = require('https')
const Book = require("../models/Book");

module.exports = {
  getPost: async (req, res) => {
    console.log('gettie');
    res.send("test")
  },
  getProfile: async (req, res) => {
    try {
      const posts = await Book.find({ user: req.user.id });
      res.render("admin.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  //searching the book by its isbn using google book api
  searchByIsbn: async (req, res) => {
    console.log('searchies', req.query);
    // const https = require('https')
    const axios = require('axios')
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.query.isbn}&key=${process.env.key}`;
    console.log('url', url);
    axios
      .get(url)
      .then(olResp => {
        let book = olResp.data
        if (book.items.length > 0 ){
          book = book.items[0].volumeInfo
        } else {
          res.send({error: "not found"})
        }
        console.log(book)

        const constructedBook = {
          title: book.title ? book.title : "",
          image: book.imageLinks ? book.imageLinks.thumbnail : "",
          author: book.authors ? book.authors[0] : "n/a",
          isbn10 : book.industryIdentifiers[0].identifier,
          isbn13 : book.industryIdentifiers[1].identifier,
          description: book.description,
        };
          // res.send(constructedBook)
          try {
           Book.create(constructedBook);
            console.log("Book has been added!");
            res.send({status: 'saved'});
          } catch (err) {
            console.log(err);
          }
      })
      .catch(error => {
        console.error(error)
      })
    
    req.on('error', error => {
      console.error(error)
    })

  },

  getFeed: async (req, res) => {
    try {
      const sorting = await Book.find().sort({ title: "desc" }).lean();
      res.render("feed.ejs", { books: sorting });
    } catch (err) {
      console.log(err);
    }
  },
  getBook: async (req, res) => {
    try {
      const search = await Book.findById(req.params.id);
      res.render("index.ejs", { post: search });
    } catch (err) {
      console.log(err);
    }
  },
  addBook: async (req, res) => {
    console.log("adding books",req.query)
     try {
      await Book.create({
        title: req.query.title,
        image: req.query.image,
        description: req.query.description,
        isbn10: req.query.isbn10,
        isbn13: req.query.isbn13,
        author: req.query.author,
      });
      console.log("Book has been added!");
      res.redirect("/admin");
    } catch (err) {
      console.log(err);
    }
  },

    //   try {
    //     res = await collection.updateOne(
    //       {title: book.items[0].volumeInfo.title,},
    //       {image: book.items[0].volumeInfo.imageLinks.thumbnail},
    //       {author: book.items[0].volumeInfo.authors[0]},
    //       {isbn10 : book.items[0].volumeInfo.industryIdentifiers[0].identifier},
    //       {isbn13 : book.items[0].volumeInfo.industryIdentifiers[1].identifier},
    //     );
    //     console.log(`Updated ${res.result.n} documents`);
    //   } catch (err) {
    //     console.error(`Something went wrong: ${err}`);
    //   }
    // },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Book.findById({ _id: req.params.id });
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/admin");
    } catch (err) {
      res.redirect("/admin");
    }
  },
};
