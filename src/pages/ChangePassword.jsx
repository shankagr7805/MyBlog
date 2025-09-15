import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      await authService.account.updatePassword(newPassword, oldPassword);

      setMessage("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/account");
      }, 1500);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Failed to change password. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      {message && (
        <div className="mb-4 text-sm text-red-600 font-medium">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block font-semibold mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="border rounded px-3 py-2 w-full pr-20"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 px-2"
            >
              {showOld ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="block font-semibold mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border rounded px-3 py-2 w-full pr-20"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 px-2"
            >
              {showNew ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border rounded px-3 py-2 w-full pr-20"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 px-2"
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;