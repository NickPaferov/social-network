import React from "react";
import styles from "./MyPosts.module.css";
import { Post } from "./Post/Post";

export const MyPosts = () => {
  const posts = [
    { id: 1, postText: "Post1", likesCount: 11 },
    { id: 2, postText: "Post2", likesCount: 7 },
    { id: 3, postText: "Post3", likesCount: 16 },
    { id: 4, postText: "Post4", likesCount: 5 },
    { id: 5, postText: "Post5", likesCount: 10 },
  ];

  return (
    <div>
      <div>My posts</div>
      <div className={styles.postArea}>
        <textarea />
        <button className={styles.btn}>Add post</button>
      </div>
      {posts.map((post) => (
        <Post key={post.id} postText={post.postText} likesCount={post.likesCount} />
      ))}
    </div>
  );
};
