export default function GamePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <section className="max-w-[1260px] mx-auto overflow-hidden z-10 my-2 sm:my-10 p-4 xl:p-0">
    <div className="flex gap-8 flex-col lg:flex-row overflow-hidden z-20 w-full">
      {children}
    </div>
    // </section>
  );
}
