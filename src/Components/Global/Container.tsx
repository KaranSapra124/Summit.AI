type PropObj = {
  className: string | undefined;
  children?: React.ReactNode;
  id?: string | undefined;
};

const Container = ({ className, id, children }: PropObj) => {
  return (
    <div id={id} className={`${className ? className : ""} p-20 max-[600px]:px-5 max-[600px]:py-10`}>
      {children}
    </div>
  );
};

export default Container;
