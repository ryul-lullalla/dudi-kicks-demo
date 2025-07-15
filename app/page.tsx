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
    <div className="flex w-full px-4 py-6">
      <Tabs defaultValue="earn" className="w-full">
        <TabsList className="flex h-10 w-full justify-between">
          <TabsTrigger className="h-8 w-1/2" value="earn">
            Earn
          </TabsTrigger>
          <TabsTrigger className="h-8 w-1/2" value="buy" disabled>
            Buy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="earn" className="mt-6">
          <Card className="border-zinc-700 bg-zinc-800">
            <CardHeader>
              <CardTitle className="text-xl text-zinc-50">
                Post and Earn KP!
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-row gap-4 ">
                  <div>
                    <div className="flex w-[50px] items-center justify-center rounded-md bg-primary p-1 text-sm font-normal leading-5 text-zinc-50">
                      <p>Step 1</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-base font-bold leading-7 text-zinc-100">
                      How to Participate
                    </div>
                    <div>
                      <div className="flex whitespace-pre-wrap text-sm leading-6">
                        {`1. Go to `}
                        <p className="font-bold underline hover:cursor-pointer">
                          /Kleva
                        </p>
                      </div>
                      <div className="whitespace-pre-wrap	 text-sm leading-6">
                        2. Pick one of the official threads below and cast your
                        tips, stories,or reviews!
                      </div>
                    </div>
                    <div>
                      <div className=" flex w-full items-center justify-center rounded-md border border-zinc-700 px-2 py-1">
                        <p className="text-sm font-semibold leading-5">
                          ✈️ Korea Travel Tips
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" flex w-full items-center justify-center rounded-md border border-zinc-700 px-2 py-1">
                        <p className="text-sm font-semibold leading-5">
                          🛍️ Product Reviews
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" flex w-full items-center justify-center rounded-md border border-zinc-700 px-2 py-1">
                        <p className="text-sm font-semibold leading-5">
                          👶 Parenting Hacks
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className=" flex w-full items-center justify-center rounded-md border border-zinc-700 px-2 py-1">
                        <p className="text-sm font-semibold leading-5">
                          🧴 Must-Buy Items in Korea
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-row gap-4 ">
                  <div>
                    <div className="flex w-[50px] items-center justify-center rounded-md bg-primary p-1 text-sm font-normal leading-5 text-zinc-50">
                      <p>Step 2</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-base font-bold leading-7 text-zinc-100">
                      {`Don't Forget to Tag @klevaAI`}
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-6 items-center justify-center">
                        &#x2022;
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-6">
                        Make sure to include
                        <span className="font-bold hover:cursor-pointer">
                          {` @klevaAI `}
                        </span>
                        {` in your post so we can find and review it!`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-row gap-4 ">
                  <div>
                    <div className="flex w-[50px] items-center justify-center rounded-md bg-primary p-1 text-sm font-normal leading-5 text-zinc-50">
                      <p>Step 3</p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-base font-bold leading-7 text-zinc-100">
                      Earn KP Automatically
                    </div>
                    <div className="flex items-start">
                      <div className="flex h-6 items-center justify-center">
                        &#x2022;
                      </div>
                      <div className="whitespace-pre-wrap text-sm leading-6">
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
