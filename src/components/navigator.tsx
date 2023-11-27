import { ArrowUp, CalendarHeart, Gift } from "lucide-react";
import { Button } from "./ui/button";

export const Navigator = () => {
  return (
    <ul className="fixed top-2 right-2 z-10 [&>li]:text-right text-primary-foreground">
      <li>
        <a href="#timeline" className="inline-flex gap-1">
          Tiệc cưới <CalendarHeart className="" />
        </a>
      </li>
      <li>
        <a href="#wishes" className="inline-flex gap-1">
          Chúc phúc <Gift />
        </a>
      </li>
    </ul>
  );
};

export const ToTopButton = () => {
  return (
    <Button
      type="button"
      size="icon"
      className="fixed bottom-2 right-2 lg:bottom-4 lg:right-4 z-10 bg-white/30 text-primary hover:bg-white/70"
      onClick={() => window.scrollTo(0, 0)}
    >
      <ArrowUp size={20} />
    </Button>
  );
};
