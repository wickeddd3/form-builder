import { getFormStats } from "@/actions/form";
import StatsCard from "@/components/builder/stats/StatsCard";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { LuView } from "react-icons/lu";
import { TbArrowBounce } from "react-icons/tb";

export interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof getFormStats>> | null;
  loading: boolean;
}

function StatsCards(props: StatsCardsProps) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadown-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadown-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadown-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadown-md shadow-red-600"
      />
    </div>
  );
}

export default StatsCards;
