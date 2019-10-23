import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_ATTENDANCE,
  UPDATE_POST,
  DELETE_POST,
  GET_POST,
  CLEAR_POST
} from "./types";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Add attendance
export const attend = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/attend/${id}`);
    console.log(res.data);

    dispatch({ type: UPDATE_ATTENDANCE, payload: { id, attendees: res.data } });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Remove attendance
export const unattend = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unattend/${id}`);

    dispatch({ type: UPDATE_ATTENDANCE, payload: { id, attendees: res.data } });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Delete a post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });
    dispatch(setAlert("The post has been removed.", "success"));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Add a post
export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/posts", formData, config);

    dispatch({ type: ADD_POST, payload: res.data });
    dispatch({ type: CLEAR_POST })
    // dispatch(setAlert("The post has been created.", "success"));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

export const updatePost = (formData, id) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/posts/${id}`, formData, config);

    dispatch({
      type: UPDATE_POST,
      payload: res.data
    });
    dispatch({ type: CLEAR_POST })
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};

// Get a post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status }
    });
  }
};
