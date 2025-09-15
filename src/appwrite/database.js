// /src/appwrite/database.js
import { Client, Databases, Role, Permission } from "appwrite";
import config from "../config/config";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  /**
   * Saves or creates a new privacy settings document for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {object} data - The privacy settings data as a JSON object.
   * @returns {Promise} The promise for the created document.
   */
  async savePrivacy(userId, data) {
    // Validate that the data is an object, not an array.
    if (Array.isArray(data) || typeof data !== 'object' || data === null) {
      throw new Error("Invalid document structure: The 'data' parameter must be an object.");
    }

    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        "privacy_settings",
        userId,
        { userId, ...data }, // Ensure data is a single JSON object
        [Permission.read(Role.user(userId))],
        [Permission.write(Role.user(userId))]
      );
    } catch (error) {
      console.error("Error creating privacy settings document:", error);
      throw error;
    }
  }

  /**
   * Updates an existing privacy settings document for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {object} data - The privacy settings data to update as a JSON object.
   * @returns {Promise} The promise for the updated document.
   */
  async updatePrivacy(userId, data) {
    // Validate that the data is an object, not an array.
    if (Array.isArray(data) || typeof data !== 'object' || data === null) {
      throw new Error("Invalid document structure: The 'data' parameter must be an object.");
    }

    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        "privacy_settings",
        userId,
        data,
        [Permission.read(Role.user(userId))],
        [Permission.write(Role.user(userId))]
      );
    } catch (error) {
      console.error("Error updating privacy settings document:", error);
      throw error;
    }
  }

  /**
   * Retrieves an existing privacy settings document for a user.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise} The promise for the retrieved document.
   */
  async getPrivacy(userId) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        "privacy_settings",
        userId
      );
    } catch (error) {
      console.error("Error getting privacy settings document:", error);
      throw error;
    }
  }
}

const dbService = new DatabaseService();
export default dbService;
