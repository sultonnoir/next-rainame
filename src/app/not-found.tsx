import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[calc(100svh-200px)] size-full flex items-center justify-center flex-col">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
