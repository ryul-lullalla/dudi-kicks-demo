import { BetForm } from "@/app/bet/page";
import { useEffect, useRef, useState } from "react";
import { GameResultModal } from "../modal/GameResultModal";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { useAccount } from "@/hooks/blockchain/useAccount";
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Props = {
  betResult: boolean | null;
  odds: string;
  formStates: BetForm;
  relativeWidth: number;
  isGameLoading: boolean;
  isFormNotValid: boolean;
  gameProgress: number;
  rewards: string;
  betResultTxHash?: `0x${string}`;
  executeGame: () => void;
  onGameEndsCallback: () => void;
};

const Stadium = ({
  betResult,
  odds,
  formStates,
  relativeWidth,
  isGameLoading,
  isFormNotValid,
  gameProgress,
  rewards,
  betResultTxHash,
  executeGame,
  onGameEndsCallback,
}: Props) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  const [goallyDirection, setGoallyDirection] = useState<string>("");
  const [ballDirection, setBallDirection] = useState<string>("");
  const [goalInStatus, setGoalInStatus] = useState<string>("");
  const [hasGameAnimated, setHasGameAnimated] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { chain, isConnected, isInValidNetwork } = useAccount();

  const playAudio = () => {
    if (audioRef?.current) {
      const audio = audioRef.current;

      setTimeout(() => {
        const audioPromise = audio?.play();
        if (audioPromise.then) {
          audioPromise
            .then(() => {
              setIsSoundMuted(false);
            })
            .catch((audioError) => {
              setIsSoundMuted(true);
            });
        }
      }, 1);
    }
  };

  useEffect(() => {
    if (hasMounted && !!audioRef.current) {
      playAudio();
    }
  }, [hasMounted, audioRef]);

  const stadiumWidth = 1198;
  const halfDeviceWidth = (relativeWidth || stadiumWidth) / 2;

  const correctionX = -stadiumWidth / 2 + halfDeviceWidth;

  const finalCorrection = correctionX > 0 ? `0px` : `${correctionX}px`;

  useEffect(() => {
    if (!!formStates.prediction && betResult !== null) {
      const decision = getRandomInt(2);

      const goallyDirection = decision === 0 ? "right" : "left";
      const ballDirection =
        formStates.prediction === "score"
          ? !!betResult
            ? decision === 0
              ? "left"
              : "right"
            : decision === 0
              ? "right"
              : "left"
          : !!betResult
            ? decision === 0
              ? "right"
              : "left"
            : decision === 0
              ? "left"
              : "right";

      const isGoalIn =
        formStates.prediction === "score"
          ? !!betResult
            ? "success"
            : "failed"
          : !!betResult
            ? "failed"
            : "success";

      setGoalInStatus(isGoalIn);

      setBallDirection(ballDirection);
      const timeoutMS = isGoalIn === "failed" ? 1200 : 800;
      setTimeout(() => {
        setGoallyDirection(goallyDirection);
      }, timeoutMS);

      return;
    } else {
      if (!!goallyDirection) {
        setGoallyDirection("");
      }
      if (!!ballDirection) {
        setBallDirection("");
      }
      if (!!hasGameAnimated) {
        setHasGameAnimated(false);
      }
    }
  }, [formStates.prediction, betResult]);

  const showGameResult = () => {
    setTimeout(() => {
      setHasGameAnimated(true);
    }, 1000);
  };

  const resetBetResult = () => {
    onGameEndsCallback();
    setHasGameAnimated(false);
    // changeMockGameResult();
  };

  const loadingBallPositionX = 212 * gameProgress * 0.01 - 28;

  const [mockGameResult, setMockGameResult] = useState<boolean>(true);

  const changeMockGameResult = () => {
    setMockGameResult(!mockGameResult);
  };

  return (
    <div>
      {(!hasMounted || relativeWidth === 0) && (
        <div className="absolute z-10 size-full gap-6 bg-game-loading">
          <div className="flex size-full flex-col justify-evenly">
            <div className="relative h-[50%] w-full">
              <Image
                // src={"/assets/logo/logo-dank-kicks-lg.svg"}
                src={"/assets/logo/logo-dank-kicks.png"}
                alt="dank-kicks"
                fill
                style={{
                  objectFit: "contain",
                }}
                className="animate-[flip_4s_infinite_1800ms]"
                priority
              />
            </div>

            <div className="flex w-full justify-center">
              <p className="animate-pulse text-3xl font-normal text-zinc-50">
                Loading...
              </p>
              {/* <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_200ms]">
              L
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_400ms]">
              o
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_600ms]">
              a
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_800ms]">
              d
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_1000ms]">
              i
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_1200ms]">
              n
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_1400ms]">
              g
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_1600ms]">
              .
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_1800ms]">
              .
            </p>
            <p className="text-3xl font-normal text-zinc-50 animate-[flip_2s_infinite_2000ms]">
              .
            </p> */}
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          left: finalCorrection,
          overflow: "hidden",
        }}
        className={`absolute h-[648px] w-[1198px]`}
      >
        <Image
          src="/assets/images/stadium/dank-kicks-stadium.svg"
          width={1198}
          height={648}
          alt="football-stadium"
          className={`absolute -z-50`}
          onLoadingComplete={() => {
            setHasMounted(true);
          }}
          priority
        />
        <div className="absolute left-0 top-[18%] h-[106px] w-full ">
          <Image
            src="/assets/images/stadium/hooligan-3.svg"
            className={`animate-[bounce_1s_infinite_200ms]`}
            fill
            style={{
              objectFit: "fill",
            }}
            alt="hooligan-3"
            priority
          />
        </div>
        <div className="absolute left-0 top-[23%] h-[106px] w-full">
          <Image
            src="/assets/images/stadium/hooligan-2.svg"
            className={`animate-[bounce_1s_infinite_100ms]`}
            fill
            style={{
              objectFit: "fill",
            }}
            alt="hooligan-2"
            priority
          />
        </div>
        <div className="absolute left-0 top-[28%] h-[106px] w-full">
          <Image
            src="/assets/images/stadium/hooligan-1.svg"
            className={`animate-[bounce_1s_infinite_1ms]`}
            fill
            style={{
              objectFit: "fill",
            }}
            alt="hooligan-1"
            priority
          />
        </div>
        <div
          className={`absolute left-0 top-[38%] flex  h-12 animate-infinite-loop-x overflow-hidden`}
        >
          <div className={`h-12 w-[996px]  bg-sponsor-board`} />
          <div className={`h-12 w-[996px]  bg-sponsor-board`} />
          <div className={`h-12 w-[996px]  bg-sponsor-board`} />
          <div className={`h-12 w-[996px]  bg-sponsor-board`} />
          <div className={`h-12 w-[996px]  bg-sponsor-board`} />
        </div>
        <div
          className={`absolute left-[439px] top-1/4 h-[160px] w-[320px] bg-goal-post `}
        />
        {/* {betResult === null || goallyDirection === "" ? (
          <div className="absolute top-[32%] left-[508px] w-[182px] h-[182px]">
            <Image
              src="/assets/images/player/stand-goally-pepe.svg"
              className={`animate-warigari-x`}
              fill
              style={{
                objectFit: "fill",
              }}
              alt="goally-pepe"
              priority
            />
          </div>
        ) : (
          <>
            {goallyDirection === "left" && (
              <>
                <div
                  className={`absolute top-[32%] left-[471px] w-[256px] h-[182px] ${
                    goallyDirection !== "left" && "hidden"
                  }`}
                >
                  <Image
                    src="/assets/images/player/left-goally-pepe.svg"
                    // src={LeftGoallyPepe}
                    className={`animate-dive-left`}
                    fill
                    style={{
                      objectFit: "fill",
                    }}
                    alt="pepe-dive-left"
                    priority
                  />
                  {goalInStatus === "failed" && (
                    <div className="absolute top-[-13px] left-[-22px] w-[96px] h-[96px]">
                      <Image
                        src="/assets/images/field/block-impact.svg"
                        className={`animate-dive-left`}
                        fill
                        style={{
                          objectFit: "fill",
                        }}
                        alt="blocking-impact"
                        priority
                      />
                    </div>
                  )}
                </div>
              </>
            )}
            {goallyDirection === "right" && (
              <>
                <div
                  className={`absolute top-[32%] left-[471px] w-[256px] h-[182px] ${
                    goallyDirection !== "right" && "hidden"
                  }`}
                >
                  <Image
                    src="/assets/images/player/right-goally-pepe.svg"
                    // src={RightGoallyPepe}
                    className={`animates-dive-right`}
                    fill
                    style={{
                      objectFit: "fill",
                    }}
                    alt="pepe"
                    priority
                  />
                  {goalInStatus === "failed" && (
                    <div className="absolute top-[-22px] right-[-22px] w-[96px] h-[96px]">
                      <Image
                        src="/assets/images/field/block-impact.svg"
                        className={`animates-dive-right`}
                        fill
                        style={{
                          objectFit: "fill",
                        }}
                        alt="blocking-impact"
                        priority
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )} */}
        {(betResult === null || goallyDirection === "") && (
          <div className="absolute left-[508px] top-[32%] size-[182px]">
            <Image
              src="/assets/images/player/stand-goally-default.svg"
              className={`animate-warigari-x`}
              fill
              style={{
                objectFit: "fill",
              }}
              alt="goally-pepe"
              priority
            />
          </div>
        )}
        <>
          {/* {goallyDirection === "left" && ( */}
          <>
            <div
              className={`absolute left-[471px] top-[32%] h-[182px] w-[256px] ${
                goallyDirection === "left" ? "visible" : "invisible"
              }`}
            >
              <Image
                src="/assets/images/player/left-goally-default.svg"
                // src={LeftGoallyPepe}
                className={`${
                  goallyDirection === "left"
                    ? "animate-dive-left"
                    : "animate-none"
                }`}
                fill
                style={{
                  objectFit: "fill",
                }}
                alt="pepe-dive-left"
                priority
              />
              {/* {goalInStatus === "failed" && ( */}
              <div
                className={`absolute left-[-22px] top-[-13px] size-[96px] ${
                  goalInStatus === "failed" && goallyDirection === "left"
                    ? "visible"
                    : "invisible"
                }`}
              >
                <Image
                  src="/assets/images/field/block-impact.svg"
                  className={`${
                    goalInStatus === "failed"
                      ? "animate-dive-left"
                      : "animate-none"
                  }`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="blocking-impact"
                  priority
                />
              </div>
              {/* )} */}
            </div>
          </>
          {/* )} */}
          {/* {goallyDirection === "right" && ( */}
          <>
            <div
              className={`absolute left-[471px] top-[32%] h-[182px] w-[256px] ${
                goallyDirection === "right" ? "visible" : "invisible"
              }`}
            >
              <Image
                src="/assets/images/player/right-goally-default.svg"
                // src={RightGoallyPepe}
                className={`${
                  goallyDirection === "right"
                    ? "animate-dive-right"
                    : "animate-none"
                }`}
                fill
                style={{
                  objectFit: "fill",
                }}
                alt="pepe"
                priority
              />
              {/* {goalInStatus === "failed" && ( */}
              <div
                className={`absolute right-[-22px] top-[-22px] size-[96px] ${
                  goalInStatus === "failed" && goallyDirection === "right"
                    ? "visible"
                    : "invisible"
                }`}
              >
                <Image
                  src="/assets/images/field/block-impact.svg"
                  className={`${
                    goalInStatus === "failed"
                      ? "animates-dive-right"
                      : "animates-none"
                  }`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="blocking-impact"
                  priority
                />
              </div>
              {/* )} */}
            </div>
          </>
          {/* )} */}
        </>

        <div
          className="m-auto flex h-full flex-col justify-between p-4"
          style={{
            maxWidth: relativeWidth,
          }}
        >
          <div className="flex w-full justify-between">
            <div className={`h-16 w-[186px] bg-score-board`} />
            {/* <div
              className={`hidden sm:block bg-broadcast-name w-[212px] h-10 `}
            /> */}
          </div>
          <div className="w-full self-end">
            <div className="flex flex-col">
              {isConnected &&
                !isInValidNetwork &&
                !isFormNotValid &&
                !isGameLoading &&
                !hasGameAnimated &&
                betResult === null && (
                  <div className="mb-3 flex w-full justify-center">
                    <p
                      className="hover:pause-animation animate-text-win cursor-default select-none font-alfa-slab-one text-[120px] text-blue-600 hover:cursor-pointer hover:text-blue-700"
                      style={{ WebkitTextStroke: "6px rgba(0,0,0,1)" }}
                      onClick={executeGame}
                    >
                      PLAY
                    </p>
                  </div>
                )}
              <div
                className="relative size-12 self-end hover:cursor-pointer"
                onClick={() => {
                  if (isSoundMuted) {
                    setIsSoundMuted(!isSoundMuted);
                    audioRef.current?.play();
                    return;
                  }
                  setIsSoundMuted(!isSoundMuted);
                  // audioRef.current?.mute();
                }}
              >
                {isSoundMuted ? (
                  <Image
                    src="/assets/icons/audio-muted.svg"
                    fill
                    alt="sound-controller"
                    priority
                    className="animate-alert opacity-80"
                  />
                ) : (
                  <Image
                    src="/assets/icons/audio-on.svg"
                    fill
                    alt="sound-controller"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
          <audio
            ref={audioRef}
            autoPlay
            loop
            muted={isSoundMuted}
            className="visibility-hidden"
          >
            <source src="/audio/crowds.mp3" type="audio/mp3" />
          </audio>
        </div>
        {/* {!isFormNotValid &&
          !isGameLoading &&
          !hasGameAnimated &&
          betResult === null && (
            <div
              // className="absolute top-[398px] right-[417px] bg-play-button w-[364px] h-[138px] hover:cursor-pointer animate-pulse"
              // className="bg-red-500 hover:cursor-pointer flex w-full h-full absolute top-[398px] right-[417px]"
              // className="bg-red-500 flex flex-col justify-between p-4 m-auto h-full w-full"
              onClick={executeGame}
              className="bg-red-500 flex flex-col justify-between p-4 m-auto h-full top-0 "
              style={{
                maxWidth: relativeWidth,
              }}
            >
              1312312123123
            </div>
          )} */}
        {betResult === null || ballDirection === "" ? (
          <div className={`absolute bottom-[-58px] right-[519px] size-[160px]`}>
            <Image
              src="/assets/images/field/ball.svg"
              className={``}
              fill
              style={{
                objectFit: "fill",
              }}
              alt="dank-ball-init"
              priority
            />
          </div>
        ) : (
          <>
            {ballDirection === "right" && goalInStatus === "success" && (
              <div className="absolute bottom-[-58px] right-[519px] size-[160px]">
                <Image
                  src="/assets/images/field/ball.svg"
                  className={`animate-kick-right-success`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="dank-ball-goal-right-top-corner"
                  onAnimationEnd={() => showGameResult()}
                  priority
                />
              </div>
            )}
            {ballDirection === "left" && goalInStatus === "success" && (
              <div className="absolute bottom-[-58px] right-[519px] size-[160px]">
                <Image
                  src="/assets/images/field/ball.svg"
                  className={`animate-kick-left-success`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="dank-ball-goal-left-top-corner"
                  onAnimationEnd={() => showGameResult()}
                  priority
                />
              </div>
            )}
            {ballDirection === "right" && goalInStatus === "failed" && (
              <div className="absolute bottom-[-58px] right-[519px] size-[160px]">
                <Image
                  src="/assets/images/field/ball.svg"
                  className={`animate-kick-right-failed`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="dank-ball-blocked-right"
                  onAnimationEnd={() => showGameResult()}
                  priority
                />
              </div>
            )}
            {ballDirection === "left" && goalInStatus === "failed" && (
              <div className="absolute bottom-[-58px] right-[519px] size-[160px]">
                <Image
                  src="/assets/images/field/ball.svg"
                  className={`animate-kick-left-failed`}
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  alt="dank-ball-blocked-left"
                  onAnimationEnd={() => showGameResult()}
                  priority
                />
              </div>
            )}
          </>
        )}
      </div>
      {/* {mockGameResult !== null && (
        <>
          <GameResultModal
            // gameResult={betResult}
            gameResult={mockGameResult}
            // gameResult={true}
            formStates={formStates}
            odds={odds}
            rewards={rewards}
            onModalCloseCallback={resetBetResult}
          />
        </>
      )} */}

      {!!hasGameAnimated && betResult !== null && (
        <>
          {betResult !== null && (
            <GameResultModal
              betResultTxHash={betResultTxHash}
              gameResult={betResult}
              formStates={formStates}
              odds={odds}
              rewards={rewards}
              onModalCloseCallback={resetBetResult}
            />
          )}
        </>
      )}

      {isGameLoading && (
        <div className="absolute z-10 flex size-full items-end justify-center bg-transparent pb-[160px]">
          <div className="relative">
            <Progress
              value={gameProgress}
              className="h-10 w-[224px] !transition-[width] !duration-1000"
            />
            <div
              className="absolute top-[-12px] size-[56px] transition-[left] duration-1000"
              style={{
                left: `${loadingBallPositionX}px`,
              }}
            >
              <Image
                src="/assets/images/field/ball.svg"
                className="animate-rotate-clock "
                // className={`className="w-[56px] h-[56px]`}
                width={56}
                height={56}
                // fill
                // style={{
                //   objectFit: "fill",
                // }}
                alt="dank-ball-loading"
                priority
              />
            </div>
            <div className="flex justify-center pt-3">
              <p className="animate-pulse text-sm font-medium">Loading...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stadium;
