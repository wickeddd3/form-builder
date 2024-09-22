import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { FaWpforms } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

interface FormCardProps {
  form: Form;
}

function FormCard({
  form: { id, name, description, published, createdAt, visits, submissions },
}: FormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{name}</span>
          {published && <Badge>Published</Badge>}
          {!published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between to-muted-foreground text-sm">
          {formatDistance(createdAt, new Date(), {
            addSuffix: true,
          })}
          {published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm to-muted-foreground">
        {description || "No description"}
      </CardContent>
      <CardFooter>
        {published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!published && (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default FormCard;
