import Post from "../model/postModel.js";

// GET POSTS
const getPosts = async (req, res) => {
    try {
      const posts = await Post.find({}).select("-__v");
      console.log(posts);
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

// CREATE POSTS
const createPost = async(req, res) => {
    const {title, quantity, price, description} = req.body
  console.log(title);
  console.log(quantity);
  console.log(price);
  console.log(description);
  try{
    const post = await Post.create({title, quantity, price, description})
    res.status(201).json({message: "Post created successfully"})
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
};
// GET SINGLE POST
const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id)
      if (!post) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      res.status(200).json({ post });
    } catch (error) {
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      res.status(500).json({ message: error.message });
    }
  };
  
  // UPDATE POST
  const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      post._id = req.body.id || post.id;
      post.title = req.body.title || post.title;
      // post.subtitle = req.body.subtitle || post.subtitle;
      // post.username = req.body.username || post.username;
      post.quantity = req.body.quantity || post.quantity;
      post.price = req.body.price || post.price;
      post.description = req.body.description || post.description;
      const updatePost = await post.save();
      res.status(200).json({
        id: updatePost._id,
        title: updatePost.title,
        // subtitle: updatePost.subtitle,
        // username: updatePost.username,
        quantity: updatePost.quantity,
        price: updatePost.price,
        description: updatePost.description,
      });
    } catch (error) {
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      res.status(500).json({ message: error.message });
    }
  };
  
  // DELETE POST
  const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      res.status(500).json({ message: error.message });
    }
  };

 

export { createPost, deletePost, getPosts, getSinglePost, updatePost };

