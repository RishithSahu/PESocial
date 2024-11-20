import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("themeMode") || "light",
  user: {
    friends: [],
  },
  token: null,
  posts: [],
  error: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", state.mode); // Persist mode
    },
    setLogin: (state, action) => {
      state.user = action.payload.user; // Ensure action.payload.user includes friends array
      state.token = action.payload.token;
      console.log('Logged-in user:', action.payload.user); // Check structure here
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = Array.isArray(action.payload.friends) ? action.payload.friends : [];
      } else {
        console.error("User is not logged in. Cannot set friends.");
      }
    },
    addFriend: (state, action) => {
      if (state.user) {
        state.user.friends.push(action.payload.friend);
      } else {
        console.error("User not logged in.");
      }
    },
    removeFriend: (state, action) => {
      if (state.user) {
        state.user.friends = state.user.friends.filter(
          (friend) => friend._id !== action.payload.friendId
        );
      } else {
        console.error("User not logged in.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  addFriend,
  removeFriend,
  setPosts,
  setPost,
  setError,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
