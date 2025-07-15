import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import confetti, { Options as ConfettiOptions } from "canvas-confetti";

import { Separator } from "../ui/separator";

import { BetForm } from "@/app/game/page";
import { math } from "@/lib/math";
import { decomma, formatCommas } from "@/lib/number/format";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useIntervalEffect } from "@react-hookz/web";
import useChain from "@/hooks/blockchain/useChain";

interface Props {
  gameResult: boolean;
  formStates: BetForm;
  odds: string;
  rewards: string;
  betResultTxHash?: `0x${string}`;
  onModalCloseCallback: () => void;
}

export const GameResultModal: React.FC<Props> = ({
  gameResult,
  formStates,
  odds,
  betResultTxHash,
  rewards,
  onModalCloseCallback,
}) => {
  const confettiRef = useRef<NodeJS.Timeout>();
  const betAmount = formatCommas(
    math(decomma(formStates.betAmount)).value(6),
    6,
  );
  const total = formatCommas(math(odds).mul(decomma(betAmount)).value(6), 6);

  const { explorerUrl } = useChain();


  const result = !!gameResult ? "win" : "lose";

  const receiveAmount = !!gameResult ? total : "0";

  const goToExplorer = () => {
    window.open(
      `${explorerUrl}/tx/${betResultTxHash}`,
      // "https://kromascan.com/address/0xD7F72F7e892549aFFCC12FB05796De69ec813e3F#tokentxns",
      "_blank",
    );
  };

  const handleConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration; // 지금 시간부터 5초동안 폭죽 효과
    // tailwind.config 에 지정해둔 컬러 변수 불러옴

    const setting: ConfettiOptions = {
      // 폭죽 효과 CSS 설정
      // particleCount: 100,
      // spread: 100,
      // origin: { y: 1.5 },
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(100, 200),
      origin: { y: 0.6 },
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min; // 최소값, 최대값 사이 무작위 숫자 생성
    }

    const fireworksSetting: ConfettiOptions = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };
    confetti({
      // 위에서 설정한 세팅값을 복사하고, 파티클 수와 발사 위치 정함
      ...setting,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(100, 200),
      // origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
      origin: { y: 0.6 },
      zIndex: 10,
      decay: 0.93,
    });

    // const interval: NodeJS.Timeout = setInterval(
    //   () => {
    //     // 일정 시간마다 폭죽 터트림
    //     const randomParticles = randomInRange(100, 200);
    //     const particleCount = randomParticles;

    //     // realistic;
    //     confetti({
    //       // 위에서 설정한 세팅값을 복사하고, 파티클 수와 발사 위치 정함
    //       ...setting,
    //       angle: randomInRange(55, 125),
    //       spread: randomInRange(50, 70),
    //       particleCount: randomInRange(100, 200),
    //       // origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
    //       origin: { y: 0.6 },
    //       zIndex: 10,
    //       decay: 0.93,
    //     });
    //     // //fireworks
    //     // confetti({
    //     //   ...fireworksSetting,
    //     //   particleCount,
    //     //   origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    //     // });
    //     // confetti({
    //     //   ...fireworksSetting,
    //     //   particleCount,
    //     //   origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    //     // });
    //   },

    //   550
    // ); // 0.25 초마다 confetti 생성

    // confettiRef.current = interval;
    // return interval;
  };

  useIntervalEffect(
    () => {
      handleConfetti();
    },
    !!gameResult ? 550 : undefined,
  );

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   console.log({ gameResult });
  //   if (!!gameResult) {
  //   const intervalId = handleConfetti();
  //   console.log({ intervalId });
  //   // interval = intervalId;
  //   // return;
  // }
  //   return () => {
  //     console.log({ interval }, "end");
  //   };
  // }, [gameResult]);

  // useEffect(() => {
  //   if (!!gameResult) {
  //     const intervalId = handleConfetti();
  //     console.log({ intervalId });
  //     // interval = intervalId;
  //     // return;
  //   }
  //   return () => {
  //     console.log("cleanb Up");
  //     clearInterval(confettiRef.current);
  //   };
  // }, [confettiRef.current]);

  return (
    <>
      <AlertDialog
        defaultOpen
        onOpenChange={(open) => {
          if (open === false) {
            onModalCloseCallback();
          }
        }}
      >
        {/* <Realistic autorun={{ speed: 1 }} /> */}

        <AlertDialogContent
          className="p-6 pt-12 !bg-zinc-800 border-[1px] border-zinc-700"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <AlertDialogTitle className="hidden" />
          <section className="flex w-full justify-center h-fit">
            <div className="w-full flex flex-col justify-center gap-6">
              <div className="w-full flex justify-center">
                {!!gameResult ? (
                  <p
                    className="font-alfa-slab-one text-[64px] text-primary animate-text-win cursor-none"
                    style={{ WebkitTextStroke: "3px rgba(255, 255, 255, 1)" }}
                  >
                    WIN!!
                  </p>
                ) : (
                  <p
                    className="font-alfa-slab-one text-[64px] text-red-500 animate-text-lose cursor-none"
                    style={{ WebkitTextStroke: "3px rgba(255, 255, 255, 1)" }}
                  >
                    LOSE..
                  </p>
                )}
                {/* <Image
                  src={`/assets/images/game/result-${result}.svg`}
                  width={232}
                  height={72}
                  alt={`${result}-game`}
                  priority
                /> */}
              </div>
              <div className="flex flex-col gap-4">
                {/* {!!gameResult && (
                  <div className="flex items-center justify-start">
                    <div className="flex gap-2 items-center w-fit ">
                      <p className="text-xs text-zinc-50 font-medium border-none cursor-pointer text-center">
                        Winner transfers
                      </p>
                      <ExternalLink
                        onClick={goToExplorer}
                        size={16}
                        className="text-zinc-50 cursor-pointer"
                      />
                    </div>
                  </div>
                )} */}
                <div className="flex items-center justify-start">
                  <div className="flex gap-2 items-center w-fit ">
                    <p className="text-sm	font-semibold text-zinc-50">Receipt</p>
                    {/* {!!gameResult && (
                      <ExternalLink
                        onClick={goToExplorer}
                        size={16}
                        className="text-zinc-50 cursor-pointer"
                      />
                    )} */}
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-sm	font-semibold text-zinc-300">
                    Reward on Win
                  </p>
                  <p className="text-sm	font-semibold text-zinc-50">{`X ${odds}`}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-sm	font-semibold text-zinc-300">Entry</p>
                  <p className="text-sm	font-semibold text-zinc-50">{`${betAmount} KP`}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className="text-sm	font-semibold text-zinc-300">Total</p>
                  <p className="text-sm	font-semibold text-zinc-50">{`${total} KP`}</p>
                </div>
                <Separator className="bg-zinc-700" />
                <div className="w-full">
                  <div className="w-full flex justify-between">
                    <p className="text-sm	font-semibold text-zinc-300">
                      You Receive
                    </p>
                    <p className="text-sm	font-semibold text-zinc-50">{`${rewards} KP`}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <AlertDialogAction
                  onClick={() => onModalCloseCallback()}
                  className="w-full text-primary-foreground text-sm font-semibold"
                >
                  Play again
                </AlertDialogAction>
                {!!betResultTxHash && (
                  <div className="flex cursor-pointer items-center">
                    <div
                      className="flex gap-2 items-center w-full justify-center rounded-[6px] bg-transparent py-2 px-4 "
                      onClick={goToExplorer}
                    >
                      <p className="text-xs text-zinc-50 font-sm border-none cursor-pointer text-center">
                        Transfers history
                      </p>
                      <ExternalLink size={16} className="text-zinc-50" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <AlertDialogDescription className="hidden" />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
