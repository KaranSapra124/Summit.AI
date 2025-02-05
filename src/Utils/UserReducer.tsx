import { useContext } from "react";
import { UserContext } from "./UserContext";

export interface userState {
  userData: object;
  theme: string;
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
  | { type: "SET_THEME"; payload: string };

export const UserReducers = (state: userState, action: UserAction) => {
  switch (action.type) {
    case "GET_USER": {
      return { ...state, userData: action.payload };
    }
    case "SET_THEME": {
      return { ...state, theme: action.payload };
    }
  }
};

// export const useUser = () => useContext(UserContext);
