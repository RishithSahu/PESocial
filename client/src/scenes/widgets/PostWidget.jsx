import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const posts = useSelector((state) => state.posts); // Get posts from Redux state
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const updatedPosts = posts.filter((post) => post._id !== postId);
        dispatch(setPosts({ posts: updatedPosts }));
      }
    } catch (error) {
      console.error("Failed to delete the post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, comment: newComment }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setNewComment("");
  };

  return (
    <Box mt={3}> {/* Add margin top for spacing between posts */}
      <WidgetWrapper>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography>{description}</Typography>
        {picturePath && (
          <img
            src={`http://localhost:3001/assets/${picturePath}`}
            alt="post"
            style={{ width: "100%", borderRadius: "0.75rem" }}
          />
        )}
        <FlexBetween>
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          {postUserId === loggedInUserId && (
            <IconButton onClick={deletePost}>
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>
        {isComments && (
          <Box mt={2}>
            {comments.map((comment, i) => (
              <Box key={i} mt={1}>
                <Divider />
                <Typography mt={1}>
                  <strong>{comment.userName || "Anonymous"}:</strong> {comment.comment}
                </Typography>
              </Box>
            ))}
            <form onSubmit={handleCommentSubmit}>
              <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Comment
              </Button>
            </form>
          </Box>
        )}
      </WidgetWrapper>
    </Box>
  );
};

export default PostWidget;