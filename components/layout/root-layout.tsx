type Props = React.PropsWithChildren;

export const RootLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="text-white">123</div>
      {children}
    </div>
  );
};
