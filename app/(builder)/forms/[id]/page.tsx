import { getFormById } from "@/actions/form";
import FormLinkShare from "@/components/builder/forms/FormLinkShare";
import VisitButton from "@/components/builder/forms/VisitButton";
import StatsCard from "@/components/builder/stats/StatsCard";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await getFormById(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="w-full py-10 px-4 border-b border-muted">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="p-4 border-b border-muted">
        <div className="w-full flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 px-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() + "%" || ""}
          loading={false}
          className="shadown-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() + "%" || ""}
          loading={false}
          className="shadown-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visits that result in form submission"
          value={submissionRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadown-md shadow-green-600"
        />
        <StatsCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visits that leaves without interacting"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadown-md shadow-red-600"
        />
      </div>
      <div className="pt-10 px-4">

      </div>
    </>
  );
}

export default Page;
