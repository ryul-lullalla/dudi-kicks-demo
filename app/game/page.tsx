"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useState, useMemo } from "react";

import Stadium from "@/components/game-assets/Stadium";

import { useForm } from "react-hook-form";

import { Form, FormControl, FormField } from "@/components/ui/form";
import Image from "next/image";
import { useAccount } from "@/hooks/blockchain/useAccount";

import { Separator } from "@/components/ui/separator";

import { math } from "@/lib/math";
import { formatCommas, trimZero } from "@/lib/number/format";
import { useRequestGame } from "@/hooks/contract/useRequestGame";
import { useGetPoolStatus } from "@/hooks/contract/useGetPoolStatus";
import { useMeasure } from "@react-hookz/web";
import { validateNumber } from "@/lib/number/validate";
import { formatEther } from "viem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ExternalLink } from "lucide-react";

import useDimensions from "react-cool-dimensions";
import Link from "next/link";
import { DankKicksStats } from "@/components/dashboard/DankKicksStats";
import { CHAIN_INFO } from "@/constant/chains";
import { useConfig } from "wagmi";

export type BetForm = {
  prediction: string;
  betAmount: string;
  token: string;
};

const DefaultBetForm = {
  prediction: "",
  // direction: "",
  token: "ETH",
  betAmount: "",
};

const MINIMUM_BET_AMOUNT = "0.001";

export default function GamePage() {
  const [betResult, setBetResult] = useState<boolean | null>(null);
  const [isGameLoading, setIsGameLoading] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [gameProgress, setGameProgress] = useState<number>(0);
  const [gameRewards, setGameRewards] = useState<string>("0");

  const { chain } = useAccount();
  const { chains } = useConfig();

  const [measurements, ref] = useMeasure<HTMLDivElement>();
  // const [popoverRelative, popoeverRf] = useMeasure<HTMLDivElement>();
  const {
    observe: popoverContentRef,
    // width,
    // height: popoverContentHeight,
  } = useDimensions();

  // const { open: openWallet, close: closeWallet } = useWeb3Modal();
  const {
    // isConnected,
    // isInValidNetwork,
    nativeBalance,
    refetch: refetchBalance,
  } = useAccount();
  const {
    // isLoading: isDankPoolQuerying,
    // isError: isDankPoolQueryError,
    data: dankPoolMaxLimit,
    // error: dankPoolQueryError,
  } = useGetPoolStatus();

  const changeProgressPrecentage = (progress: number) => {
    setGameProgress(progress);
  };

  const { requestGame } = useRequestGame({
    onProcessSuccessCallback: changeProgressPrecentage,
  });

  const form = useForm<BetForm>({
    defaultValues: { ...DefaultBetForm },
  });

  const { watch, setValue } = form;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValue("prediction", "score");
  //   }, 5000);
  // }, []);

  const formStates = watch();

  const prediction = watch("prediction");
  const betAmount = watch("betAmount");

  const changeGameLoadingStatus = (status: boolean) => {
    setIsGameLoading(status);
  };

  const resetBet = () => {
    setBetResult(null);
    setGameProgress(0);
    setGameRewards("0");
    refetchBalance();
  };

  const predictionOdds = prediction ? "1.95" : "0";

  const betAmountInReceipt = formatCommas(math(betAmount).value(), 6);

  const ethBalance = formatCommas(
    math(nativeBalance?.formatted || "0").value(6),
    6,
  );

  const estimatedWinAmount = formatCommas(
    math(predictionOdds).mul(betAmount).value(6),
    6,
  );

  const hasExceedBalance = useMemo(() => {
    if (math(nativeBalance?.formatted || "0").lt(betAmount)) {
      return true;
    }
    return false;
  }, [betAmount, nativeBalance]);

  const hasViolatedMinimumAmount = useMemo(() => {
    if (math(betAmount).lt(MINIMUM_BET_AMOUNT)) {
      return true;
    }
    return false;
  }, [betAmount]);

  const hasExceedPoolLimit = useMemo(() => {
    const maxLimit = dankPoolMaxLimit as bigint | undefined;
    if (maxLimit !== undefined) {
      const formattedMaxLimit = formatEther(maxLimit);

      if (math(betAmount).gt(formattedMaxLimit)) {
        return true;
      }
    }
    return false;
  }, [betAmount, dankPoolMaxLimit]);

  const betHalfAmountOfBalance = () => {
    const halfAmount = math(nativeBalance?.formatted || "0")
      .mul("0.9")
      .div(2);
    if (
      math(halfAmount.value()).gt(
        (dankPoolMaxLimit as bigint | undefined) || "0",
      )
    ) {
      const limitAmount = formatEther(
        (dankPoolMaxLimit as bigint | undefined) || BigInt(0),
      );
      setValue("betAmount", limitAmount);
      return;
    }
    setValue("betAmount", halfAmount.value());
  };

  const betMaxAmountOfBalance = () => {
    const maxAmount = math(nativeBalance?.formatted || "0").mul("0.9");

    if (
      math(maxAmount.value()).gt(
        (dankPoolMaxLimit as bigint | undefined) || "0",
      )
    ) {
      const limitAmount = formatEther(
        (dankPoolMaxLimit as bigint | undefined) || BigInt(0),
      );
      setValue("betAmount", limitAmount);
      return;
    }
    setValue("betAmount", maxAmount.value());
  };

  // const invalidTokenAmount = false;
  const invalidTokenAmount =
    hasExceedBalance || hasViolatedMinimumAmount || hasExceedPoolLimit;

  const isFormFilled = !!prediction && math(betAmount).gt(0);

  // const isFormNotValid = false;
  const isFormNotValid = !isFormFilled || invalidTokenAmount;
  const isFormDisabled = !!isGameLoading || !!betResult;

  const startKick = async () => {
    if (isFormDisabled) {
      return;
    }

    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }

    if (window.scrollY !== 0) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
    try {
      const gameResult = await requestGame({
        token: formStates.token,
        amount: formStates.betAmount,
        isSuccess: formStates.prediction === "score",
        direction: false,
        onProcessStartsCallback: changeGameLoadingStatus,
      });

      if (gameResult?.length && gameResult?.length > 0) {
        const gameSummary = gameResult[2];
        setBetResult(!!gameSummary?.isWin);
        console.log({ gameResult });
        const finalRewards = formatCommas(
          math(formatEther(gameResult[5])).value(6),
          6,
        );
        setGameRewards(finalRewards);
        // refetchBalance();
      }
      setIsGameLoading(false);
    } catch (gameRequestError) {
      console.error({ gameRequestError });
      setIsGameLoading(false);
      setGameProgress(0);
      return;
    }
  };

  const directTo = (url: string) => {
    window.open(url, "_blank");
  };

  console.log({ chainInfo: CHAIN_INFO });
  console.log({ chainID: CHAIN_INFO.id });
  console.log({ wagmiUseAccount: chain });
  console.log({ wagmiUseConfig: chains });

  return (
    // <section className="max-w-[1260px] mx-auto overflow-hidden z-10 my-2 sm:my-10 p-4 xl:p-0">
    //   <div className="grid grid-cols-7 gap-8 flex-col xl:flex-row overflow-hidden z-20">
    <>
      <div className="flex flex-col gap-4">
        <div
          className="max-w-full lg:max-w-[892px] lg:w-[892px] relative !bg-transparent overflow-hidden !rounded-lg"
          ref={ref}
        >
          <CardContent className="!bg-transparent !p-0 !h-[648px] ">
            <Stadium
              // betResult={true}
              betResult={betResult}
              odds={predictionOdds}
              formStates={formStates}
              relativeWidth={measurements?.width || 0}
              isGameLoading={isGameLoading}
              gameProgress={gameProgress}
              rewards={gameRewards}
              isFormNotValid={isFormNotValid}
              executeGame={startKick}
              onGameEndsCallback={resetBet}
            />
          </CardContent>
        </div>
        {/* [TODO]: Game Stats */}
        {/* <div className="hidden lg:flex">
          <DankKicksStats />
        </div> */}
      </div>
      <section className="max-w-full lg:max-w-[336px] lg:w-[336px] col-span-7 lg:col-span-2 gap-8 flex flex-col">
        {/* <div
          className="w-full h-[96px] relative bg-green-800 border-[1px] border-green-700 rounded-lg	hover:cursor-pointer"
          onClick={() =>
            directTo("https://www.intract.io/quest/668e2fec1c80721d525028db")
          }
        >
          <Image
            src="/assets/images/banner/progammer-banner.svg"
            fill
            alt="progammer-season2-banner"
            className="absolute object-right bg-contain object-none	animate-banner-right h-[96px] cursor-pointer"
            priority
          />
          <div className="flex w-full h-full flex-col items-start justify-between p-4">
            <div className="z-10">
              <p className="text-base font-semibold leading-[18px]">
                Pro Gamers Season 2 <br />
                Quest Event
              </p>
            </div>
            <div className="flex gap-[3px]">
              <div className="flex gap-[3px] items-center">
                <Image
                  src="/assets/logo/logo-kroma-sm.svg"
                  width={60}
                  height={14}
                  alt="kroma-logo"
                  className="z-10"
                />
              </div>
              <div className="flex gap-[3px] items-center">
                <Image
                  src="/assets/logo/logo-intract-sm.svg"
                  width={7}
                  height={7}
                  alt="kroma-logo"
                  className="z-10"
                />
                <Image
                  src="/assets/logo/logo-intract-text-sm.svg"
                  width={51}
                  height={10}
                  alt="kroma-logo"
                  className="z-10"
                />
              </div>
            </div>
          </div>
        </div> */}
        <Card className="p-6">
          <CardContent className="grid gap-6 p-0">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-lg text-primary font-semibold">
                  Booster Kicks
                </p>
                <div>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className="bg-zinc-700 px-2 py-[2px] rounded-[24px] cursor-pointer"
                    >
                      <div className="flex text-zinc-300 items-center gap-2">
                        <p className="text-xs font-medium">Contract Link</p>
                        <ChevronDown size={16} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="!shadow-[0_8px_16px_0px_#0000003D] !border-none bg-zinc-700 !py-2 !px-4 !w-fit"
                      align="end"
                      alignOffset={0}
                      side="bottom"
                      // sideOffset={((popoverContentHeight || "0") / 2) * -1}
                      ref={popoverContentRef}
                    >
                      <div className="flex flex-col gap-[2px]">
                        <Link
                          className="flex gap-1 items-center justify-between cursor-pointer"
                          href={
                            "https://kromascan.com/address/0xa999d848655c33b3b63eC1564F426565252c3e9f"
                          }
                          target="_blank"
                        >
                          <p className="text-xs font-medium text-zince-300">
                            Gaming Contract
                          </p>
                          <ExternalLink size={16} className="text-gray-900" />
                        </Link>
                        <Link
                          className="flex gap-1 items-center justify-between cursor-pointer"
                          href={
                            "https://kromascan.com/address/0x589b45F2c65796fc60b1b61802B10d7C7de86cc7"
                          }
                          target="_blank"
                        >
                          <p className="text-xs font-medium text-zince-300">
                            VRF Contract
                          </p>
                          <ExternalLink size={16} className="text-gray-900" />
                        </Link>
                        {/* <Link
                        className="flex gap-1 items-center justify-between cursor-pointer"
                        href={""}
                        target="_blank"
                      >
                        <p className="text-xs font-medium text-zince-300">
                          VRF Contract
                        </p>
                        <ExternalLink size={16} className="text-zinc-50" />
                      </Link> */}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <p className="text-sm text-zinc-400">
                Score or Block. Just choose and shoot. Follow your heart.
              </p>
            </div>
            <Form {...form}>
              <FormField
                control={form.control}
                name="prediction"
                render={({ field }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-semibold">
                        Prediction
                      </Label>
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-4"
                          disabled={isFormDisabled}
                        >
                          <div className="">
                            <FormControl>
                              <RadioGroupItem
                                value="score"
                                id="score"
                                className="peer sr-only"
                                aria-label="score"
                              />
                            </FormControl>
                            <Label
                              htmlFor="score"
                              className={`!cursor-pointer flex flex-col items-center justify-between rounded-md border-[1px] border-zinc-600 bg-transparent py-2 peer-data-[state=unchecked]:hover:bg-accent hover:border-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-zinc-900 peer-data-[state=unchecked]text-zinc-50 ${
                                !!!prediction &&
                                "animate-[pulse-back_2s_infinite]"
                              }`}
                            >
                              <div className="flex gap-1 items-center">
                                <p className="text-sm text-center font-medium">
                                  Score
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div>
                            <FormControl>
                              <RadioGroupItem
                                value="block"
                                id="block"
                                className="peer sr-only"
                                aria-label="Block"
                              />
                            </FormControl>
                            <Label
                              htmlFor="block"
                              className={`!cursor-pointer flex flex-col items-center justify-between rounded-md border-[1px] border-zinc-600 bg-transparent py-2 peer-data-[state=unchecked]:hover:bg-accent hover:border-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-zinc-900 peer-data-[state=unchecked]text-zinc-50 ${
                                !!!prediction &&
                                // "animate-[pulse-back-delay_4s_infinite_1500ms]"
                                "animate-[pulse-back-delay_2s_infinite]"
                                // "animate-highlight-back-delay"
                              }`}
                            >
                              <div className="flex gap-1 items-center">
                                <p className="text-sm text-center font-medium">
                                  Block
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  );
                }}
              />
              <Separator className="bg-zinc-700" />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">
                    Rewards on Win
                  </Label>
                  <div className="flex gap-[1px] items-center border-primary">
                    <p className="text-sm text-primary font-semibold">{`X ${predictionOdds}`}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-semibold">
                    Your Win Chance
                  </Label>
                  <div className="flex gap-[1px] items-center border-primary">
                    <p className="text-sm text-primary font-semibold">{`50%`}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-zinc-700" />
              <FormField
                control={form.control}
                name="betAmount"
                render={({ field }) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <Label className="text-sm font-semibold">Entry</Label>
                      </div>
                      <div
                        className={`flex items-center bg-zinc-700 rounded-md py-2 px-4 ${
                          !!prediction &&
                          !!!betAmount &&
                          "animate-highlight-back"
                        }`}
                      >
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full h-fit border-0 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring text-start text-zinc-50"
                            inputMode="decimal"
                            placeholder="Enter Amount"
                            disabled={isFormDisabled}
                            onChange={(event) => {
                              const _value = trimZero(event.target.value);
                              if (validateNumber(_value, 18)) {
                                field.onChange(_value);
                              }
                            }}
                          />
                        </FormControl>
                        <div className=" h-full flex items-center pl-4 [&>button>span]:text-lg rounded-md gap-2 bg-transparent">
                          <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => {
                              return (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  disabled={isFormDisabled}
                                >
                                  <FormControl>
                                    <SelectValue defaultValue={"ETH"} />
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="ETH">
                                      <div className="flex gap-2 items-center">
                                        <div className="w-6 h-6">
                                          <Image
                                            src={`/assets/tokens/ETH.svg`}
                                            width={24}
                                            height={24}
                                            alt="ETH"
                                          />
                                        </div>
                                        <p className="text-sm font-medium text-zinc-50">
                                          ETH
                                        </p>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-between items-center">
                        <p className="text-xs font-medium	 text-zinc-400">
                          {`${ethBalance} ETH`}
                        </p>
                        <div className="flex gap-2">
                          <p
                            className="text-xs	text-primary font-medium	 hover:cursor-pointer"
                            onClick={betHalfAmountOfBalance}
                          >
                            HALF
                          </p>
                          <div className="text-xs text-zinc-400">/</div>
                          <p
                            className="text-xs	text-primary font-medium	 hover:cursor-pointer"
                            onClick={betMaxAmountOfBalance}
                          >
                            MAX
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Separator className="bg-zinc-700" />
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-semibold">Receipt</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-300">Reward on Win</p>
                  <div className="flex gap-[1px] items-center text-sm font-medium text-zinc-50">
                    <p className="">{`X ${predictionOdds}`}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-300">Entry</p>
                  <div className="flex gap-[1px] items-center text-sm font-medium text-zinc-50">
                    <p className=""> {`${betAmountInReceipt} ETH`}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-300">Total</p>
                  <div className="flex gap-[1px] items-center text-sm font-medium text-primary">
                    <p className="">{`${estimatedWinAmount} ETH`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {/* <div>
                  <div className="font-bold text-base text-orange-500">
                    Season1 Ended!
                  </div>
                  <div className="font-medium text-xs text-orange-400">
                    🎉 Successfully concluded. See you next season!
                  </div>
                </div> */}
                {/* XXX: Disabled Temoporarily */}
                {/* <>
                  {!!isConnected ? (
                    isInValidNetwork ? (
                      <Button
                        type="submit"
                        className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                        onClick={() => openWallet({ view: "Networks" })}
                      >
                        <div className="flex gap-2 items-center">
                          <TriangleAlert width={18} height={18} />
                          <p className="text-sm font-semibold leading-5">
                            Invalid Network
                          </p>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className={`text-sm font-semibold py-[10px] h-fit text-zinc-900 ${
                          !!prediction &&
                          !!!invalidTokenAmount &&
                          "animate-start-alert"
                        }`}
                        onClick={startKick}
                        disabled={
                          !isFormFilled ||
                          !!invalidTokenAmount ||
                          isFormDisabled
                        }
                      >
                        {invalidTokenAmount
                          ? "Invalid Token Amount"
                          : !!prediction
                          ? "Shoot!"
                          : "Select Prediction"}
                      </Button>
                    )
                  ) : (
                    <Button
                      type="submit"
                      className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                      onClick={requestWalletConnect}
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/assets/icons/wallet-icon.svg"
                          width={18}
                          height={18}
                          alt="wallet"
                        />
                        <p className="text-sm font-semibold leading-5">
                          Wallet Connect
                        </p>
                      </div>
                    </Button>
                  )}
                  {isConnected &&
                    !isInValidNetwork &&
                    invalidTokenAmount &&
                    math(betAmount).gt("0") && (
                      <div>
                        <p className="text-xs text-red-500 font-medium">
                          {hasExceedBalance
                            ? "Bet amount exceeds total balance."
                            : hasViolatedMinimumAmount
                            ? `Bet amount should be greater than ${MINIMUM_BET_AMOUNT} ETH`
                            : hasExceedPoolLimit
                            ? `Bet amount is greater than the maximum amount from game pool: ${formatEther(
                                (dankPoolMaxLimit as bigint | undefined) ||
                                  BigInt(0)
                              )} ETH`
                            : ""}
                        </p>
                      </div>
                    )}
                </> */}
              </div>
            </Form>
          </CardContent>
        </Card>
      </section>

      {/* [TODO]: Game Stats */}
      {/* <div className="flex lg:hidden">
        <DankKicksStats />
      </div> */}
      {/* <div>
        <div
          onClick={() => {
            setIsGameLoading(true);
            setGameProgress(50);
            setTimeout(() => {
              setIsGameLoading(false);
              setGameProgress(100);
              setBetResult(true);
            }, 1500);
          }}
        >
          result: success
        </div>
        <div
          onClick={() => {
            setIsGameLoading(true);
            setGameProgress(50);
            setTimeout(() => {
              setIsGameLoading(false);
              setGameProgress(100);
              setBetResult(false);
            }, 1500);
          }}
        >
          result: fail
        </div>
      </div> */}

      {/* <Drawer open={isDrawerOpen} onOpenChange={changeDrawerDisplay}>
          <DrawerTrigger asChild>
            <div className="fixed flex flex-col sm:hidden bottom-0 left-0 right-0 w-full z-20 rounded-t-lg	">
              <div className="p-6 rounded-t-lg	bg-card">
                <div className="flex flex-col gap-2">
                  {!!isConnected ? (
                    isInValidNetwork ? (
                      <Button
                        type="submit"
                        className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                        onClick={() => openWallet({ view: "Networks" })}
                      >
                        <div className="flex gap-2 items-center">
                          <TriangleAlert width={18} height={18} />
                          <p className="text-sm font-semibold leading-5">
                            Invalid Network
                          </p>
                        </div>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                        // onClick={startKick}
                        // disabled={
                        //   !isFormFilled || !!invalidTokenAmount || isFormDisabled
                        // }
                      >
                        Play Dank Kicks
                      </Button>
                    )
                  ) : (
                    <Button
                      type="submit"
                      className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                      onClick={requestWalletConnect}
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/assets/icons/wallet-icon.svg"
                          width={18}
                          height={18}
                          alt="wallet"
                        />
                        <p className="text-sm font-semibold leading-5">
                          Wallet Connect
                        </p>
                      </div>
                    </Button>
                  )}
                </div>
              </div>
              <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted absolute top-[-19px] right-0 left-0"></div>
            </div>
          </DrawerTrigger>

          <DrawerContent
            className="sm:hidden"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Card className="p-6 col-span-7 lg:col-span-2 !rounded-none !rounded-t-xl">
              <CardContent className="grid gap-6 p-0">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-primary font-semibold">
                    Dank Kicks
                  </p>
                  <p className="text-sm text-zinc-400">
                    Score or Block. Just choose and bet. Then your heart will
                    beat.
                  </p>
                </div>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="prediction"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-semibold">
                            Prediction
                          </Label>
                          <FormControl>
                            <RadioGroup
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-2 gap-4"
                              disabled={isFormDisabled}
                            >
                              <div className="">
                                <FormControl>
                                  <RadioGroupItem
                                    value="score"
                                    id="score"
                                    className="peer sr-only"
                                    aria-label="score"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="score"
                                  className="!cursor-pointer flex flex-col items-center justify-between rounded-md border-[1px] border-zinc-600 bg-transparent py-2 peer-data-[state=unchecked]:hover:bg-accent hover:border-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-zinc-900 peer-data-[state=unchecked]text-zinc-50"
                                >
                                  <div className="flex gap-1 items-center">
                                    <p className="text-sm text-center font-medium">
                                      Score
                                    </p>
                                  </div>
                                </Label>
                              </div>

                              <div>
                                <FormControl>
                                  <RadioGroupItem
                                    value="block"
                                    id="block"
                                    className="peer sr-only"
                                    aria-label="Block"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="block"
                                  className="!cursor-pointer flex flex-col items-center justify-between rounded-md border-[1px] border-zinc-600 bg-transparent py-2 peer-data-[state=unchecked]:hover:bg-accent hover:border-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:text-zinc-900 peer-data-[state=unchecked]text-zinc-50"
                                >
                                  <div className="flex gap-1 items-center">
                                    <p className="text-sm text-center font-medium">
                                      Block
                                    </p>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </div>
                      );
                    }}
                  />
                  <Separator className="bg-zinc-700" />
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Odds</Label>
                      <div className="flex gap-[1px] items-center border-primary">
                        <p className="text-sm text-primary font-semibold">{`X ${predictionOdds}`}</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-zinc-700" />
                  <FormField
                    control={form.control}
                    name="betAmount"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <Label className="text-sm font-semibold">
                              Bets
                            </Label>
                          </div>
                          <div className="flex items-center bg-zinc-700 rounded-md py-2 px-4">
                            <FormControl>
                              <Input
                                className="w-full h-fit border-0 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring text-start text-zinc-50"
                                {...field}
                                disabled={isFormDisabled}
                                inputMode="decimal"
                              />
                            </FormControl>
                            <div className=" h-full flex items-center pl-4 [&>button>span]:text-lg rounded-md gap-2 bg-transparent">
                              <FormField
                                control={form.control}
                                name="token"
                                render={({ field }) => {
                                  return (
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      disabled={isFormDisabled}
                                    >
                                      <FormControl>
                                        <SelectValue defaultValue={"ETH"} />
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="ETH">
                                          <div className="flex gap-2 p-2 items-center">
                                            <div className="w-6 h-6">
                                              <Image
                                                src={`/assets/tokens/ETH.svg`}
                                                width={24}
                                                height={24}
                                                alt="ETH"
                                              />
                                            </div>
                                            <p className="text-sm font-medium text-zinc-50">
                                              ETH
                                            </p>
                                          </div>
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 justify-between items-center">
                            <p className="text-xs font-medium	 text-zinc-400">
                              {`${ethBalance} ETH`}
                            </p>
                            <p className="text-xs	text-primary font-medium	 hover:cursor-pointer">
                              MAX
                            </p>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Separator className="bg-zinc-700" />
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-semibold">Receipt</Label>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-zinc-300">Odds</p>
                      <div className="flex gap-[1px] items-center text-sm font-medium text-zinc-50">
                        <p className="">{`X ${predictionOdds}`}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-zinc-300">Bets</p>
                      <div className="flex gap-[1px] items-center text-sm font-medium text-zinc-50">
                        <p className=""> {`${betAmountInReceipt} ETH`}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-zinc-300">Total</p>
                      <div className="flex gap-[1px] items-center text-sm font-medium text-primary">
                        <p className="">{`${estimatedWinAmount} ETH`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!!isConnected ? (
                      isInValidNetwork ? (
                        <Button
                          type="submit"
                          className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                          onClick={() => openWallet({ view: "Networks" })}
                        >
                          <div className="flex gap-2 items-center">
                            <TriangleAlert width={18} height={18} />
                            <p className="text-sm font-semibold leading-5">
                              Invalid Network
                            </p>
                          </div>
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                          onClick={startKick}
                          disabled={
                            !isFormFilled ||
                            !!invalidTokenAmount ||
                            isFormDisabled
                          }
                        >
                          {invalidTokenAmount
                            ? "Invalid Token Amount"
                            : "Shoot!"}
                        </Button>
                      )
                    ) : (
                      <Button
                        type="submit"
                        className="text-sm font-semibold py-[10px] h-fit text-zinc-900"
                        onClick={requestWalletConnect}
                      >
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/assets/icons/wallet-icon.svg"
                            width={18}
                            height={18}
                            alt="wallet"
                          />
                          <p className="text-sm font-semibold leading-5">
                            Wallet Connect
                          </p>
                        </div>
                      </Button>
                    )}
                  </div>
                </Form>
              </CardContent>
            </Card>
          </DrawerContent>
        </Drawer> */}
    </>
    //   </div>
    // </section>
  );
}
