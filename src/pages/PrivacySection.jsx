import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import dbService from "../appwrite/database";
import { useNavigate } from "react-router-dom";
import { Role } from "appwrite";

const PrivacySection = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivacySettings = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) return;

        try {
          const doc = await dbService.getPrivacy(user.$id, "privacy_settings");
          setProfileVisible(doc.profileVisible ?? false);
        } catch (err) {
          setProfileVisible(false);
        }
      } catch (err) {
        setError("Failed to load privacy settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacySettings();
  }, []);

  const handleCheckboxChange = (e) => setProfileVisible(e.target.checked);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const user = await authService.getCurrentUser();
      if (!user) throw new Error("Not logged in");

      await dbService.updatePrivacy(
        user.$id,
        { profileVisible }
      ).catch(async (err) => {
        setError(err.message || "Error saving preferences");
        await dbService.savePrivacy(
          user.$id,
          { profileVisible }
        );
      });

      navigate('/account');
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save privacy settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading privacy settings...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Settings</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="bg-white shadow rounded-lg p-6">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={profileVisible}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Make my profile visible to others</span>
        </label>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PrivacySection;
