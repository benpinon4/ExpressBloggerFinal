const { uuid } = require("uuidv4");
var express = require("express");
var router = express.Router();

const { db } = require("../mongo");
const { UUID } = require("bson");
var { validateBlogData } = require("../dataValidation");

router.get("/get-one-example", async function (req, res, next) {
  try {
    const blogPost = await db().collection("blogs").findOne({
      id: "35a04237-507c-45f5-b770-3ce2c2fd088b",
    });
    res.json({
      success: true,
      post: blogPost,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});

router.get("/get-one/:idToFind", async function (req, res, next) {
  try {
    const idToFind = req.params.idToFind;

    const getOneByUrl = await db().collection("blogs").findOne({
      id: idToFind,
    });
    console.log(getOneByUrl);
    if (getOneByUrl === null) {
      res.json({
        sucess: false,
        message: "your id was not a match",
      });
      return;
    } else {
      res.json({
        success: true,
        post: getOneByUrl,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});

router.post("/create-one", async function (req, res, next) {
  try {
    const newBlogPost = {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      email: req.body.email,
      categories: req.body.categories,
      starRating: req.body.starRating,
      createdAt: new Date(),
      lastModified: new Date(),
      id: uuid(),
    };
    const dataCheck = validateBlogData(newBlogPost)
    if(dataCheck.isValid === false){
      res.json({
        sucess: false,
        message: dataCheck.message,
      });
      return;
    }
    const createOneBlogPost = await db()
      .collection("blogs")
      .insertOne(newBlogPost);
    res.json({
      sucess: true,
      newPost: createOneBlogPost,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});

router.put("/update-one/:blogIdToUpdate", async function (req, res, next) {
  try {
    const blogIdToUpdate = req.params.blogIdToUpdate;

    const blogToUpdate = await db().collection("blogs").findOne({
      id: blogIdToUpdate,
    });

    const updateBlogData = {
      title: blogToUpdate.title,
      text: blogToUpdate.text,
      author: blogToUpdate.author,
      email: blogToUpdate.email,
      categories: blogToUpdate.categories,
      starRating: blogToUpdate.starRating,
      createdAt: blogToUpdate.createdAt,
      lastModified: new Date(),
    };
    if (req.body.title !== "") {
      updateBlogData.title = req.body.title;
    }
    if (req.body.text !== "") {
      updateBlogData.text = req.body.text;
    }
    if (req.body.author !== "") {
      updateBlogData.author = req.body.author;
    }
    if (req.body.email !== "") {
      updateBlogData.email = req.body.email;
    }
    if (req.body.categories !== "") {
      updateBlogData.categories = req.body.categories;
    }
    if (req.body.starRating !== "") {
      updateBlogData.starRating = req.body.starRating;
    }
    console.log(updateBlogData);
    const dataCheck = validateBlogData(updateBlogData);
    console.log(dataCheck.isValid);
    if (dataCheck.isValid === false) {
      res.json({
        sucess: false,
        message: dataCheck.message,
      });
      return;
    }

    const updateBlog = await db()
      .collection("blogs")
      .updateOne(
        {
          id: blogIdToUpdate,
        },
        {
          $set: {
            title: updateBlogData.title,
            text: updateBlogData.text,
            author: updateBlogData.author,
            email: updateBlogData.email,
            categories: updateBlogData.categories,
            starRating: updateBlogData.starRating,
            lastModified: new Date(),
          },
        }
      );

    res.json({
      sucess: true,
      blog: updateBlog,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});

router.delete("/delete-one/:blogIdToDelete", async function (req, res, next) {
  try {
    const blogIdToDelete = req.params.blogIdToDelete;

    const blogToDelete = await db().collection("blogs").deleteOne({
      id: blogIdToDelete,
    });
    res.json({
      success: true,
      message: `Deleted blog with ID ${blogIdToDelete}`,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.toString(),
    });
  }
});
module.exports = router;
