import { Sprout } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <Sprout className="h-6 w-6" />
      <span className="font-bold text-lg font-headline">AgriAssist</span>
    </div>
  );
}
