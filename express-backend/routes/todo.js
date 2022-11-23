const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const router = express.Router();

const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      console.log(`Error Message: ${error.message}, Trace ID: ${req.traceId}`);
      return res.status(401).json({ error: `Authorization messed up` });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    dateCompleted: req.body.dateCompleted,
    complete: req.body.complete,
  });
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        dateCompleted: savedTodo.dateCompleted,
        complete: savedTodo.complete,
        // send back username here too
      });
    })
    .catch((error) => {
      console.log("help me")
      return res.status(500).json({ error: error.message});
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.get("/:id", async function (req, res, next) {
  const todo = await Todo.findOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
});

router.delete("/:id", async function (req, res, next) {
  const todo = await Todo.deleteOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
});

// messeeeddddd up. FIX
router.delete("/:id", async function (req, res, next) {
  const todo = await Todo.deleteOne().where("_id").equals(req.params.id).exec();
  return res.status(200).json(todo);
  // ().where("_id").equals(req.params.id).exec();
  // return res.status(200).json(todo);
});

// for updating complete
router.patch("/:id", async function (req, res, next) {
  const todo = await Todo.findOneAndUpdate().where("_id").equals(req.params.id).exec();
  todo.complete = req.body.complete,
  todo.dateCompleted = Date();
  todo.save();
  return res.status(200).json(todo);
  // const updatedTodo = await Todo.findOne().where("_id").equals(req.params.id).exec();
  // updatedTodo.complete = req.body.complete,
  // updatedTodo.save();
  // return res.status(200).json(updatedTodo);
  
  // const selectedTodo = { _id: req.params.id };
  // const updateTodo = {
  //   title: req.body.title,
  //   description: req.body.description,
  //   author: req.payload.id,
  //   dateCreated: req.body.dateCreated,
  // }
  return res.status(200).json(todo);

});

//   const todo = await Todo.findOneAndUpdate(selectedTodo, updateTodo);
//   return res.status(200).json(todo);
// });

module.exports = router;
