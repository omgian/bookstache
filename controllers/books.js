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
  searchByIsbn: async (req, res) => {
    console.log('searchies', req.query);
    // const https = require('https')
    const axios = require('axios')

    axios
      .get(`https://openlibrary.org/isbn/${req.query.isbn}.json`)
      .then(olResp => {
        const book = olResp.data
        console.log(book)

        const constructedBook = {
          title: book.title,
          image: `http://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`,
          author: book.by_statement,
          isbn10 : book.isbn_10,
          isbn13 : book.isbn_13,
          description: book.description.value ? book.description.value : book.description
        };

        if(!constructedBook.author) {
          /* make api call to get author stuff
          axios.get(`authorURL`)
          .then(AUTHORresponse () => {
            const author = AUTHORresponse.data
            log author
            constructedBook.author = author.name
            // then send the response of updated constructedBook
            constructedBook.author = 'Gian'
            res.send(constructedBook)
          })
          */
          constructedBook.author = 'Gian'
          res.send(constructedBook)
        } else {
          // otherwise, we have all the data
          res.send(constructedBook)
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
      res.render("feed.ejs", { posts: sorting });
    } catch (err) {
      console.log(err);
    }
  },
  // getPost: async (req, res) => {
  //   try {
  //     const search = await Book.findById(req.params.id);
  //     res.render("index.ejs", { post: search });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  addBook: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Book.create({
        title: req.body.title,
        image: result.secure_url,
        description: req.body.description,
      });
      console.log("Post has been added!");
      res.redirect("/admin");
    } catch (err) {
      console.log(err);
    }
  },
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
