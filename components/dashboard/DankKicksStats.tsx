import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LeaderBoardTable } from "./LeaderboardTable";
import { LiveGameTable } from "./LiveGameTable";

export const DankKicksStats = () => {
  return (
    <Tabs defaultValue="live" className="w-full !bg-card rounded-xl border">
      <div className="grid w-full grid-cols-2 rounded-b-none !bg-card !h-fit p-6">
        {/* <p className="">Live Games</p> */}
        <Label className="text-sm font-semibold">Live Games</Label>
      </div>
      {/* <TabsList className="grid w-full grid-cols-2 rounded-b-none !bg-card !h-fit !pt-0 !px-0">
        <TabsTrigger
          value="live"
          className="py-4 rounded-none rounded-tl-xl data-[state=active]:!bg-card data-[state=active]:!border-b-[1.5px] data-[state=active]:!border-b-white data-[state=active]:!shadow-none"
        >
          Live Games
        </TabsTrigger>
        <TabsTrigger
          value="leader"
          className="py-4 rounded-none rounded-tl-xl data-[state=active]:!bg-card data-[state=active]:!border-b-[1.5px] data-[state=active]:!border-b-white data-[state=active]:!shadow-none"
        >
          Recent Top 10
        </TabsTrigger>
      </TabsList> */}
      <TabsContent value="live" className="!bg-card rounded-none !mt-0">
        <Card className="!rounded-t-none !bg-card px-4 border-none">
          <LiveGameTable />
        </Card>
      </TabsContent>
      <TabsContent value="leader" className="!bg-card rounded-none !mt-0">
        <Card className="!rounded-t-none !bg-card px-4 border-none">
          <LeaderBoardTable />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
