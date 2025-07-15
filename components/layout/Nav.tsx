"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";

// import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "@/hooks/blockchain/useAccount";
import { useEffect } from "react";
import { useConnect, useDisconnect, useReconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { CHAIN_INFO } from "@/constant/chains";

const MENUS = [
  {
    key: "game",
    title: "Game",
    path: "/game",
  },
  {
    key: "pools",
    title: "Pools",
    path: "https://docs.dankkicks.io/play/whats-the-gm-pool/how-to-join-gm-pool",
    target: "_blank",
  },
  {
    key: "docs",
    title: "Docs",
    path: "https://docs.dankkicks.io",
    target: "_blank",
  },
];

export default function Nav() {
  const pathname = usePathname();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // const { open: openWallet, close: closeWallet } = useWeb3Modal();
  const { reconnect } = useReconnect();

  const { isConnected, walletAddress, isInValidNetwork } = useAccount();

  const requestWalletConnect = () => {
    // openWallet();
    connect({ connector: injected(), chainId: CHAIN_INFO.id });
  };

  useEffect(() => {
    if (!!isConnected && !!isInValidNetwork) {
      setTimeout(() => {
        switchChain({ chainId: CHAIN_INFO.id });
      }, 300);
    }
  }, [isConnected, isInValidNetwork, pathname]);

  useEffect(() => {
    if (!isConnected) reconnect();
  }, [isConnected]);

  return (
    <header className="sticky top-0 bg-background px-4 md:px-6 border-b z-50">
      <section className="max-w-[1260px] mx-auto overflow-hidden flex h-16 items-center gap-4">
        <nav className="hidden flex-col gap-6 text-lg font-medium sm:flex sm:flex-row sm:items-center sm:gap-5 sm:text-sm lg:gap-6">
          <Link href="/game" className="w-[71px] h-10">
            <Image
              src="/assets/logo/logo_dudi.png"
              width={57}
              height={32}
              alt="dank-kicks-logo"
            />
          </Link>
          {/* {MENUS.map((menu) => {
            const textColor = pathname.includes(menu.path)
              ? "text-foreground"
              : "text-muted-foreground";
            return (
              <Link
                key={menu.key}
                href={menu.path}
                className={`${textColor} transition-colors hover:text-foreground`}
                target={menu.target || ""}
              >
                {menu.title}
              </Link>
            );
          })} */}
        </nav>
        {/* mobile */}
        <nav className="flex w-full justify-between items-center sm:hidden">
          <Link href="/game" className="w-[71px] h-10">
            <Image
              src="/assets/logo/logo_dudi.png"
              width={71}
              height={40}
              alt="dank-kicks-logo"
            />
          </Link>
          <div className="flex items-center gap-2">
            {/* <Link
              className="py-2 px-1 cursor-pointer flex gap-2 group/bridge items-center"
              href={"https://twitter.com/dankkicks_"}
              target="_blank"
            >
              <Image
                src="/assets/icons/social_twitter.svg"
                width={24}
                height={24}
                alt="twitter-x"
              />
            </Link> */}
            {/* <Link
              className="border-[1px] py-2 px-[25px] border-zinc-600 rounded-lg cursor-pointer hover:border-green-500 flex gap-2 group/bridge items-center"
              href={"https://kroma.network/bridge"}
              target="_blank"
            >
              <RefreshCcw
                size={18}
                className="text-zinc-50 group-hover/bridge:text-green-500"
              />
              <p className="text-sm font-medium	leading-6	text-zinc-50 group-hover/bridge:text-green-500">
                Bridge
              </p>
            </Link> */}
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 sm:hidden w-[42px] h-[42px]"
                >
                  <Menu
                  // className="h-5 w-5"
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="flex flex-col justify-between"
              >
                <nav className="grid gap-6 text-lg font-medium">
                  {MENUS.map((menu) => {
                    const textColor = pathname.includes(menu.path)
                      ? "text-foreground"
                      : "text-muted-foreground";
                    return (
                      <Link
                        key={menu.key}
                        href={menu.path}
                        className={`${textColor} transition-colors hover:text-foreground`}
                        target={menu.target || ""}
                      >
                        {menu.title}
                      </Link>
                    );
                  })}
                </nav>
                <div className="flex w-full justify-center">
                  <w3m-button size="md" balance="show" />
                  234
                </div>
              </SheetContent>
            </Sheet> */}
            <div>
              {isConnected ? (
                <Button className="py-[10px] px-6 text-primary-foreground h-fit">
                  <div className="flex gap-2 items-center">
                    <Wallet size={18} className="text-primary-foreground" />
                    <p className="text-sm font-semibold leading-5 ">
                      {`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(
                        walletAddress.length - 4,
                        walletAddress.length,
                      )}`}
                    </p>
                  </div>
                </Button>
              ) : (
                <Button
                  className="py-[10px] px-6 text-zinc-900 h-fit"
                  onClick={requestWalletConnect}
                >
                  <div className="flex gap-2 items-center">
                    <Wallet size={18} className="text-primary-foreground" />
                    <p className="text-sm font-semibold leading-5 text-primary-foreground">
                      Wallet Connect
                    </p>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </nav>
        {/* desktop */}
        <div className="hidden sm:flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="flex gap-4 items-center">
              {/* <Link
                className="py-2 px-1 cursor-pointer flex gap-2 group/bridge items-center"
                href={"https://twitter.com/dankkicks_"}
                target="_blank"
              >
                <Image
                  src="/assets/icons/social_twitter.svg"
                  width={24}
                  height={24}
                  alt="twitter-x"
                />
              </Link> */}
              {/* <Link
                className="border-[1px] py-2 px-[25px] border-zinc-600 rounded-lg cursor-pointer hover:border-green-500 flex gap-2 group/bridge items-center"
                href={"https://kroma.network/bridge"}
                target="_blank"
              >
                <RefreshCcw
                  size={18}
                  className="text-zinc-50 group-hover/bridge:text-green-500"
                />
                <p className="text-sm font-medium	leading-6	text-zinc-50 group-hover/bridge:text-green-500">
                  Bridge
                </p>
              </Link> */}
              {/* {isConnected && isInValidNetwork ? (
                <div
                  className="p-2 border-solid border-zinc-600 border-[1px] rounded-lg hover:cursor-pointer hover:border-primary text-primary"
                  // onClick={() => openWallet({ view: "Networks" })}
                >
                  <TriangleAlert width={24} height={24} />
                </div>
              ) : (
                <div className="p-2 border-solid border-zinc-600 border-[1px] rounded-lg">
                  <Image
                    src="/assets/icons/kroma_network.svg"
                    width={24}
                    height={24}
                    alt="kroma-network"
                  />
                </div>
              )} */}

              <div>
                {isConnected ? (
                  <Button className="py-[10px] px-6 text-primary-foreground h-fit">
                    <div className="flex gap-2 items-center">
                      <Wallet size={18} className="text-primary-foreground" />
                      <p className="text-sm font-semibold leading-5 ">
                        {`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(
                          walletAddress.length - 4,
                          walletAddress.length,
                        )}`}
                      </p>
                    </div>
                  </Button>
                ) : (
                  // <Button
                  //   className="py-[10px] px-6 text-primary-foreground h-fit"
                  // >
                  //   <div className="flex gap-2 items-center">
                  //     <Wallet size={18} className="text-primary-foreground" />
                  //     <p className="text-sm font-semibold leading-5">
                  //       {`${walletAddress?.slice(
                  //         0,
                  //         6,
                  //       )}...${walletAddress?.slice(
                  //         walletAddress.length - 4,
                  //         walletAddress.length,
                  //       )}`}
                  //     </p>
                  //   </div>
                  // </Button>
                  <Button
                    className="py-[10px] px-6 text-zinc-900 h-fit"
                    onClick={requestWalletConnect}
                  >
                    <div className="flex gap-2 items-center">
                      <Wallet size={18} className="text-primary-foreground" />
                      <p className="text-sm font-semibold leading-5 text-primary-foreground">
                        Wallet Connect
                      </p>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </section>
    </header>
  );
}
