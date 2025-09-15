// /src/pages/Account.jsx
import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setFormData({ name: currentUser.name || "" });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({ name: user.name || "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    // Update user state locally; actual persistence can be added later
    setUser({ ...user, name: formData.name });
    setIsEditing(false);
  };

  if (loading) {
    return <div className="p-6">Loading account...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold">No Account Found</h1>
        <p className="mt-4 text-gray-600">
          Please <a href="/login" className="text-blue-600 hover:underline">login</a> to view your account.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Profile Section */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-2">
          {isEditing ? (
            <>
              <div>
                <label className="block font-semibold mb-1" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member Since:</strong> {new Date(user.$createdAt).toDateString()}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={handleSaveClick}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member Since:</strong> {new Date(user.$createdAt).toDateString()}</p>
              <button
                onClick={handleEditClick}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </section>

      {/* Settings Section */}
      <section className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-2">
          <li><a href="/change-password" className="text-blue-600 hover:underline">Change Password</a></li>
          <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Settings</a></li>
        </ul>
      </section>

      {/* Subscription Section (dummy for now) */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <p><strong>Plan:</strong> Free</p>
        <p><strong>Renewal Date:</strong> N/A</p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Upgrade Plan
        </button>
      </section>
    </div>
  );
};

export default Account;