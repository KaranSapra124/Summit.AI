type PropObj = {
  className: string | undefined;
  children?: React.ReactNode;
};

const Container = ({ className, children }: PropObj) => {
  return (
    <div className={`${className ? className : ""} py-10 px-20`}>{children}</div>
  );
};

export default Container;
