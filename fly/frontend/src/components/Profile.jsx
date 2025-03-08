import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    location: "",
    gender: "",
    bio: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
        setUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          dob: userData.dob
            ? new Date(userData.dob).toISOString().split("T")[0]
            : "",
          location: userData.location || "",
          gender: userData.gender || "",
          bio: userData.bio || "",
          profilePicture: userData.profilePicture || null,
        });
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to save user profile", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center mb-6">
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded-full w-32 h-32 mb-4"
              />
            )}
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Profile
            </h2>
          </div>
          {editMode ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Gender:
                </label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Bio:
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <strong className="block text-gray-700">Name:</strong>
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="mb-4">
                <strong className="block text-gray-700">Email:</strong>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="mb-4">
                <strong className="block text-gray-700">Phone Number:</strong>
                <span className="text-gray-900">{user.phoneNumber}</span>
              </div>
              <div className="mb-4">
                <strong className="block text-gray-700">Date of Birth:</strong>
                <span className="text-gray-900">
                  {new Date(user.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-4">
                <strong className="block text-gray-700">Location:</strong>
                <span className="text-gray-900">{user.location}</span>
              </div>
              <div className="mb-4">
                <strong className="block text-gray-700">Gender:</strong>
                <span className="text-gray-900">{user.gender}</span>
              </div>
              {user.bio && (
                <div className="mb-4">
                  <strong className="block text-gray-700">Bio:</strong>
                  <span className="text-gray-900">{user.bio}</span>
                </div>
              )}
              <button
                onClick={() => setEditMode(true)}
                className="w-full py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
