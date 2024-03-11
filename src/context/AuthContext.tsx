import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import utils from "../utils/utils";
import Cookies from "universal-cookie";
import { JwtPayload, jwtDecode } from 'jwt-decode'

interface UserContextValue {
  createUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  loginUser: (username: string, password: string) => Promise<any>;
  logOut: () => void;
  user: JwtPayload;
}

const UserContext = createContext<UserContextValue>({
  createUser: () => Promise.resolve(),
  loginUser: () => Promise.resolve(),
  logOut: () => {},
  user: {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const cookies = new Cookies();
    const token: string = cookies.get('access_token');

    if (token) {
      token.replace('Bearer ', '');
  
      const decode = jwtDecode<JwtPayload>(token);
      return setUser(decode);
    }
    return setUser({});
  }, [user]);

  const createUser = async (username: string, email: string, password:string) => {
    const data = {username, password, email};
    const newUser = await utils.requests.post(
      '/auth/signup',
      data
    );
    utils.helpers.setToken(newUser.data.access_token);

    return newUser;
    }
    
  const loginUser = async (username: string, password: string) => {
    const data = {username, password};
    const userCred = await utils.requests.post(
      '/auth/login',
      data
    );

    utils.helpers.setToken(userCred.data.access_token);
    
    return userCred;
  };

  const logOut =  () => {
    utils.helpers.deleteToken();
    setUser({});
    return;
  };

  return (
    <UserContext.Provider
      value={{ createUser, loginUser, logOut, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};