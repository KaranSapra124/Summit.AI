import React from "react";
// import { UserContext } from "./UserContext";

export interface userState {
  userData: object;
  theme: string;
}
export interface UserContextType {
  theme: string;
  userData: object; // You can be more specific about this type if needed
  dispatch: React.Dispatch<UserAction>;
}
export interface userDataInterface {
  _id?:string,
  name: string;
  email: string;
  plan: {
    type: string;
    usage: number;
    limit: number;
  };
  purchasePlan: {
    _id: string;
    name: string;
    price: number | "Custom Pricing";
    currency: string;
    textLimit: string;
    summariesPerDay: number | "Unlimited";
    fileUploads: boolean;
    customization: boolean;
    prioritySupport: boolean;
    apiAccess: boolean;
  };
  isActive: boolean;
}
export const initialState: userState = {
  userData: {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: {
      type: "Pro",
      usage: 5,
      limit: 10,
    },
  },
  theme: "Dark",
};
export type UserAction =
  | { type: "GET_USER"; payload: Object }
  | { type: "SET_THEME"; payload: string }
  | { type: "SET_USER"; payload: Object };

export const UserReducers = (state: userState, action: UserAction) => {
  switch (action.type) {
    case "GET_USER": {
      return { ...state, userData: action.payload };
    }
    case "SET_THEME": {
      return { ...state, theme: action.payload };
    }
    case "SET_USER": {
      return { ...state, userData: action.payload };
    }
  }
};

// export const useUser = () => useContext(UserContext);
