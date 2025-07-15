type Props = React.PropsWithChildren;

export const MainLayout = ({ children }: Props) => {
  return (
    <section className="max-w-[1260px] mx-auto overflow-hidden  p-4 xl:p-0">
      {/* <div className="text-white">123</div> */}
      <div className="my-2 sm:my-10">{children}</div>
    </section>
  );
};
