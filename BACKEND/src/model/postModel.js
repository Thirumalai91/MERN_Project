import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // subtitle: {
    //   type: String,
    //   required: true,
    // },
    // username: {
    //   type: String,
    //   required: true,
    // },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
