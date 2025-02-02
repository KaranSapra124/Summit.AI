interface CardType {
  title: string;
  value: number | string;
  icon: string;
}
const Cards: React.FC<CardType> = ({ title, value, icon }) => {
  // title: "Total Summaries Processed",
  // value: 120,
  // description: "Number of text summaries you have processed so far.",
  // icon: "📝",
  // status: "completed",  // Can be 'completed', 'in-progress'
  // color: "bg-green-500",
  return (
    <div>
      <h2>{icon}</h2>
      <h2>{value}</h2>
      <h3>{title}</h3>
    </div>
  );
};

export default Cards;
