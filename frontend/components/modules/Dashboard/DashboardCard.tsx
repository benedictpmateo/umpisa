import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  title?: string;
  description?: string;
  content?: string;
  footer?: string | React.ReactNode;
  url?: string;
}

export default function DashboardCard({
  title,
  description,
  content,
  footer,
  url,
}: DashboardCardProps) {
  const router = useRouter();
  const clickCard = () => {
    !!url && router.push(url);
  };

  return (
    <Card
      className={cn("hover:shadow-2xl cursor-pointer transition-all group", {
        "hover:shadow-cyan-500/50": !url || url == "/catch-pokemon",
        "hover:shadow-blue-500/50": url === "/rankings",
        "hover:shadow-indigo-500/50": url === "/my-pokemons",
      })}
      onClick={clickCard}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="md:min-h-[100px]">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          className="group-hover:bg-secondary group-hover:text-white"
          onClick={clickCard}
        >
          Open Page
        </Button>
      </CardFooter>
    </Card>
  );
}
