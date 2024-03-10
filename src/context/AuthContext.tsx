import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import utils from "../utils/utils";

interface UserContextValue {
  createUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  loginUser: (username: string, password: string) => Promise<any>;
  logOut: () => void;
}

const UserContext = createContext<UserContextValue>({
  createUser: () => Promise.resolve(),
  loginUser: () => Promise.resolve(),
  logOut: () => {},
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [user, setUser] = useState({});

  // useEffect(() => {
  //   const authenticatedUser = window.localStorage;
  //   return authenticatedUser;
  // }, []);

  const createUser = async (username: string, email: string, password:string) => {
    const data = {username, password, email};
    const newUser = await utils.requests.post(
      '/auth/signup',
      data
      )
      utils.helpers.setToken(newUser.data.access_token)

      return newUser;
    }
    
  const loginUser = async (username: string, password: string) => {
    const data = {username, password};
    const userCred = await utils.requests.post(
      '/auth/login',
      data
    )

    utils.helpers.setToken(userCred.data.access_token)
    
    return userCred;
  };

  const logOut =  () => {
    return utils.helpers.deleteToken();
  };

  return (
    <UserContext.Provider
      value={{ createUser, loginUser, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};