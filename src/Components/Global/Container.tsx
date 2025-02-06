type PropObj = {
  className: string | undefined;
  children?: React.ReactNode;
  id?: string | undefined;
};

const Container = ({ className, id, children }: PropObj) => {
  return (
    <div id={id} className={`${className ? className : ""} p-20`}>
      {children}
    </div>
  );
};

export default Container;
