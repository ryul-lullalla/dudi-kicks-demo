"use client";

import { Dice5, HandCoins } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.PropsWithChildren;

export const MainLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isGetKP = pathname === "/";
  const isBetKP = pathname === "/bet";

  return (
    <section className="">
      <div className="flex items-center justify-center mx-auto w-full relative">
        {/* Sliding border indicator */}
        <div
          className={`absolute bottom-0 h-[2px] bg-zinc-50 transition-all duration-300 ease-in-out ${
            isGetKP ? "left-0 w-1/2" : "left-1/2 w-1/2"
          }`}
        />

        <Link
          href={"/"}
          className="hover:cursor-pointer border-b border-zinc-800 min-w-[164px] w-1/2 py-[14px] flex items-center justify-center transition-colors duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center gap-2 items-center">
            <div>
              <HandCoins
                width={22}
                height={18}
                className={`transition-colors duration-300 ease-in-out ${
                  isGetKP ? "text-zinc-50" : "text-zinc-400"
                }`}
              />
            </div>
            <div
              className={`text-[12px] leading-5 font-medium transition-colors duration-300 ease-in-out ${
                isGetKP ? "text-zinc-50" : "text-zinc-400"
              }`}
            >
              Get KP
            </div>
          </div>
        </Link>

        <Link
          href={"/bet"}
          className="hover:cursor-pointer border-b border-zinc-800 min-w-[164px] w-1/2 py-[14px] flex items-center justify-center transition-colors duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center gap-2 items-center">
            <div>
              <Dice5
                width={22}
                height={18}
                className={`transition-colors duration-300 ease-in-out ${
                  isBetKP ? "text-zinc-50" : "text-zinc-400"
                }`}
              />
            </div>
            <div
              className={`text-[12px] leading-5 font-medium transition-colors duration-300 ease-in-out ${
                isBetKP ? "text-zinc-50" : "text-zinc-400"
              }`}
            >
              Bet KP
            </div>
          </div>
        </Link>
      </div>
      {/* <div className="max-w-[1260px] mx-auto overflow-hidden p-4 xl:p-0 my-6 sm:my-10"> */}
      {children}
      {/* </div> */}
    </section>
  );
};
