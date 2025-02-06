interface CardType {
  title: string;
  value: number | string;
  
}
const Cards: React.FC<CardType> = ({ title, value }) => {
  // title: "Total Summaries Processed",
  // value: 120,
  // description: "Number of text summaries you have processed so far.",
  // icon: "📝",
  // status: "completed",  // Can be 'completed', 'in-progress'
  // color: "bg-green-500",
  return (
    <div className="mt-auto ">
      {/* <h2 className="text-[5rem]">{icon}</h2> */}
      <h2 className="text-3xl text-gray-900 text-left font-extrabold">{value}</h2>
      <h3 className="text-lg my-1  text-white/90 text-left font-semibold">{title}</h3>
    </div>
  );
};

export default Cards;
