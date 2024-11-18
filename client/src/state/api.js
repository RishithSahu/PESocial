import axios from "axios";

const BASE_URL = "http://localhost:6001"; // Replace with your backend URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const updateUserProfile = async (userId, profileData, token) => {
  try {
    const response = await api.put(`/users/${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return updated profile data
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error);
    throw error;
  }
};