import { Client, Account, ID, Query } from 'appwrite';
import AppwriteConf from './appwriteconfig'; // Appwrite configuration

// Define user document type
export interface UserDocument {
  name: string;
  email: string;
  phone: string;
  provider: string;
}

class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(AppwriteConf.appwriteEndpoint) // Set your Appwrite endpoint
      .setProject(AppwriteConf.projectId); // Set your Appwrite project ID

    this.account = new Account(this.client);
  }

  // Sign up with email and password
  async signUpWithEmail(email: string, password: string, name: string) {
    try {
      const response = await this.account.create(ID.unique(), email, password, name);
      return response;
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  }

  // Login with email and password
  async loginWithEmail(email: string, password: string) {
    try {
      const session = await this.account.createSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in with email:', error);
      throw error;
    }
  }

  // Send OTP to email for email verification
  async sendEmailOTP(email: string) {
    try {
      await this.account.createVerification(email);
      console.log('Email verification sent');
    } catch (error) {
      console.error('Error sending email OTP:', error);
      throw error;
    }
  }

  // Verify email OTP
  async verifyEmailOTP(userId: string, otp: string) {
    try {
      const verified = await this.account.updateVerification(userId, otp);
      return verified;
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      throw error;
    }
  }

  // Sign up with phone number and send OTP
  async signUpWithPhone(phone: string) {
    try {
      const response = await this.account.createPhoneSession(phone);
      return response;
    } catch (error) {
      console.error('Error signing up with phone:', error);
      throw error;
    }
  }

  // Login with phone OTP
  async loginWithPhone(phone: string, otp: string) {
    try {
      const session = await this.account.createPhoneSession(phone, otp);
      return session;
    } catch (error) {
      console.error('Error logging in with phone:', error);
      throw error;
    }
  }

  // OAuth2 login (example with Google)
  async loginWithOAuth2(provider: string) {
    try {
      const oauthUrl = await this.account.createOAuth2Session(provider, AppwriteConf.redirectURI);
      window.location.href = oauthUrl; // Redirect to OAuth2 provider login
    } catch (error) {
      console.error('Error with OAuth2 login:', error);
      throw error;
    }
  }

  // Get current session (check if user is logged in)
  async getSession() {
    try {
      const session = await this.account.get();
      return session;
    } catch (error) {
      console.error('Error fetching session:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSession('current'); // Logs out the current session
      console.log('User logged out');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
}

const Authbase = new AuthService();
export default Authbase;
