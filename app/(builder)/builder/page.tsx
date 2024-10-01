import type { Metadata } from "next";
import { getForms, getFormStats } from "@/actions/form";
import CreateFormButton from "@/components/builder/forms/CreateFormButton";
import FormCards from "@/components/builder/forms/FormCards";
import FormCardSkeleton from "@/components/builder/forms/FormCardSkeleton";
import StatsCards from "@/components/builder/stats/StatsCards";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Builder",
};

export default async function Page() {
  const [stats, forms] = await Promise.all([getFormStats(), getForms()]);

  return (
    <div className="w-full p-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCards loading={false} data={stats} />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">My forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards forms={forms} />
        </Suspense>
      </div>
    </div>
  );
}
