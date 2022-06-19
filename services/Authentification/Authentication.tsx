/**
 * Singleton class that handles all authentication logic
 * when user logged in, currentUser object will be saved
 * to local storage with expired key
 */
import BackendComm from "../BackendCommunication/BackendCommunication";
import User from "../../models/User";

export interface localStorageUser {
  email: string;
  firstName: string;
  token: string;
  expires: Date;
  id: string;
}

interface userToBackend {
  email: string;
  password: string;
  id?: string;
}

class AuthService {
  private bc = BackendComm;
  private EXPIRES_IN_DAYS = 3;
  private REDIRECT_ON_LOGOUT = "/signin";

  /**
   * @returns userobject saved in localStorage, if less than expired
   */
  getCurrentUser(): User | null {
    const userObj = localStorage.getItem("currentUser");
    if (userObj) {
      const userParsed: localStorageUser = JSON.parse(userObj);
      const expires = userParsed.expires;
      const user: User = {
        email: userParsed.email,
        firstName: userParsed.firstName,
        id: userParsed.id,
        token: userParsed.token,
      };

      if (new Date(expires) < new Date()) {
        this.logout();
      } else return user;
    }
    return null;
  }
  /**
   * @returns date in x days
   * @param x
   */
  getDateInXDays(x: number): Date {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + x));
  }

  /**
   * @param user
   * @returns { * } object containing user, token, expires
   * @throws when backendComm.post throws
   */
  async login(user: userToBackend) {
    const response = await this.bc.post("/login", user);
    const { token, id, firstName, email } = response;
    const expires = this.getDateInXDays(this.EXPIRES_IN_DAYS);
    const toSave: localStorageUser = {
      email,
      firstName,
      token: token || "no-token-received",
      expires,
      id,
    };
    localStorage.setItem("currentUser", JSON.stringify(toSave));
    return toSave;
  }

  logout() {
    localStorage.removeItem("currentUser");
    setTimeout(() => {
      window.location.href = this.REDIRECT_ON_LOGOUT;
    }, 500);
  }

  /**
   * @throws beautified error, when backend didn't create new user
   * @param user
   * @throws when backendComm.post throws
   */
  async register(user: User) {
    const data = {
      email: user.email,
      firstName: user.firstName,
      password: user.password,
    };

    await this.bc.post("/register", data);
  }
}

export default new AuthService();
