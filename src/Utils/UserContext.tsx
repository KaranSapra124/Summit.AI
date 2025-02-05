import { createContext } from "react";
import { UserAction } from "./UserReducer";
interface UserContextType {
  theme: string;
  userData: object; // You can be more specific about this type if needed
  dispatch: React.Dispatch<UserAction>;
}
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
