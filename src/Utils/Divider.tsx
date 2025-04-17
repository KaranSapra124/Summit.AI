interface dividerProp {
  className: string | undefined;
}

const Divider: React.FC<dividerProp> = ({ className }) => {
  return <div className={className}></div>;
};

export default Divider;
