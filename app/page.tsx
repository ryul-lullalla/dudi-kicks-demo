"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <div className="flex w-full py-6 px-4">
      <Tabs defaultValue="earn" className="w-full">
        <TabsList className="w-full flex justify-between h-10">
          <TabsTrigger className="w-1/2 h-8" value="earn">
            Earn
          </TabsTrigger>
          <TabsTrigger className="w-1/2 h-8" value="buy" disabled>
            Buy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="earn" className="mt-6">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-50">
                Post and Earn KP!
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex w-full flex-col gap-6">
                <div className="flex flex-row w-full gap-4 ">
                  <div>
                    <div className="bg-primary p-1 rounded-md flex items-center justify-center w-[50px] text-zinc-50 font-normal leading-5 text-sm">
                      <p>Step 1</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-zinc-100 text-base font-bol leading-7">
                      How to Participate
                    </div>
                    <div>
                      <div className="text-sm leading-6 flex whitespace-pre-wrap">
                        {`1. Go to `}
                        <p className="underline font-bold hover:cursor-pointer">
                          /Kleva
                        </p>
                      </div>
                      <div className="whitespace-pre-wrap	 text-sm leading-6">
                        2. Pick one of the official threads below and cast your
                        tips, stories,or reviews!
                      </div>
                    </div>
                    <div>
                      <div className=" border border-zinc-700 py-1 w-full rounded-md flex items-center justify-center px-2">
                        <p className="text-sm leading-5 font-semibold">
                          ✈️ Korea Travel Tips
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" border border-zinc-700 py-1 w-full rounded-md flex items-center justify-center px-2">
                        <p className="text-sm leading-5 font-semibold">
                          🛍️ Product Reviews
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" border border-zinc-700 py-1 w-full rounded-md flex items-center justify-center px-2">
                        <p className="text-sm leading-5 font-semibold">
                          👶 Parenting Hacks
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" border border-zinc-700 py-1 w-full rounded-md flex items-center justify-center px-2">
                        <p className="text-sm leading-5 font-semibold">
                          🧴 Must-Buy Items in Korea
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full gap-4 ">
                  <div>
                    <div className="bg-primary p-1 rounded-md flex items-center justify-center w-[50px] text-zinc-50 font-normal leading-5 text-sm">
                      <p>Step 2</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-zinc-100 text-base font-bol leading-7">
                      {`Don't Forget to Tag @klevaAI`}
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center justify-center h-6">
                        &#x2022;
                      </div>
                      <div className="text-sm leading-6 whitespace-pre-wrap">
                        Make sure to include
                        <span className="font-bold hover:cursor-pointer">
                          {` @klevaAI `}
                        </span>
                        {` in your post so we can find and review it!`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full gap-4 ">
                  <div>
                    <div className="bg-primary p-1 rounded-md flex items-center justify-center w-[50px] text-zinc-50 font-normal leading-5 text-sm">
                      <p>Step 3</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-zinc-100 text-base font-bol leading-7">
                      Earn KP Automatically
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center justify-center h-6">
                        &#x2022;
                      </div>
                      <div className="text-sm leading-6 whitespace-pre-wrap">
                        Every week, your eligible posts will be reviewed and
                        rewarded with KP (Kleva Points) automatically.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
