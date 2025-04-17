import React, { createContext } from "react";

export type adminAction = { type: "SET_ADMIN"; payload: Object };

export interface adminData {
  adminData: object;
}
export interface adminDataValues {
  email: string;
  password: string;
}

export const adminInitialState: adminData = {
  adminData: {
    email: "Test@test.com",
    password: "1234",
  },
};

export interface adminContextInterface {
  adminData: object;
  adminDispatch: React.Dispatch<adminAction>;
}

export const adminReducer = (state: adminData, action: adminAction) => {
  switch (action.type) {
    case "SET_ADMIN":
      return { ...state, adminData: action.payload };
  }
};

export const AdminContext = createContext<adminContextInterface | undefined>(
  undefined
);
