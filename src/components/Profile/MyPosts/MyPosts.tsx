import React, { ChangeEvent, useState } from "react";
import styles from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import { addPostAC } from "../../../bll/profile-reducer";

export const MyPosts = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.profilePage.posts);

  const [newPostText, setNewPostText] = useState("");

  const handleChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostText(e.currentTarget.value);
  };

  const handleAddPost = () => {
    dispatch(addPostAC({ id: posts.length + 1, postText: newPostText, likesCount: 0 }));
    setNewPostText("");
  };

  return (
    <div className={styles.myPosts}>
      <div>My posts</div>
      <div className={styles.postArea}>
        <textarea
          autoFocus
          placeholder="Enter your text"
          value={newPostText}
          onChange={handleChangeNewPostText}
        />
        <button className={styles.btn} onClick={handleAddPost}>
          Add post
        </button>
      </div>
      {posts.map((post) => (
        <Post key={post.id} postText={post.postText} likesCount={post.likesCount} />
      ))}
    </div>
  );
};
