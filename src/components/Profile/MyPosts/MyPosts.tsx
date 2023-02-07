import React from "react";
import styles from "./MyPosts.module.css";
import { Post } from "./Post/Post";

export const MyPosts = () => {
  return (
    <div>
      <div>My posts</div>
      <div className={styles.postArea}>
        <textarea />
        <button className={styles.btn}>Add post</button>
      </div>
      <Post postText={"Post1"} />
      <Post postText={"Post2"} />
      <Post postText={"Post3"} />
      <Post postText={"Post4"} />
      <Post postText={"Post5"} />
    </div>
  );
};
