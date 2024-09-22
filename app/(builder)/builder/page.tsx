import { getFormStats } from "@/actions/form";
import CreateFormButton from "@/components/builder/forms/CreateFormButton";
import StatsCards from "@/components/builder/stats/StatsCards";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default async function Page() {
  const stats = await getFormStats();

  return (
    <div className="w-full p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCards loading={false} data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">My forms</h2>
      <Separator className="my-6" />
      <CreateFormButton />
    </div>
  );
}
