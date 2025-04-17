import { useContext } from "react";
import { UserContext } from "../../../../Utils/UserContext";
import { userState } from "../../../../Utils/UserReducer";

interface CardType {
  title: string;
  value: number | string;
}
const Cards: React.FC<CardType> = ({ title, value }) => {
  const context = useContext(UserContext);
  const { theme } = context as userState;
  return (
    <div className="mt-auto ">
      <h2 className="text-3xl max-[600px]:text-xs text-gray-900  text-left font-extrabold">
        {value}
      </h2>
      <h3
        className={`text-lg my-1  max-[600px]:text-[0.5rem] ${
          theme === "Dark" ? "text-white/90" : "text-gray-800"
        } text-left  font-semibold`}
      >
        {title}
      </h3>
    </div>
  );
};

export default Cards;
