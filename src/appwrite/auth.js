import config from "../config/config";
import { Client, Account, ID } from "appwrite";

//^ const, let, and var are used inside functions, blocks, or globally. Inside classes, we define properties directly without any keyword.

export class AuthService {
    client = new Client();
    account;

    //! constructor automatic chalta hai jab new object banate ho. Account object ek baar banta hai aur class ke andar use hota hai.

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client);
    }

    //& {} => Enforces that the argument passed is an object. This is called object destructuring in JavaScript. It’s a way to unpack values from an object directly into variables.

    async createAccount({email , password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                //call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    };

    async getCurrentUser() {
        try {
            return await this.account.get();  
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;        //& so that if we don't get an account it will return null.
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;


