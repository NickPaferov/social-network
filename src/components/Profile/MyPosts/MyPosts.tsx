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
      <Post name={"Post1"} />
      <Post name={"Post2"} />
      <Post name={"Post3"} />
      <Post name={"Post4"} />
      <Post name={"Post5"} />
    </div>
  );
};
