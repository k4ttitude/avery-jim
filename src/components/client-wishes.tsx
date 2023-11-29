import type { Wish } from "@/server/wishes";
import { sent } from "@/shared/wish";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ClientWishes = (props: { wishes: Wish[] }) => {
  const [wishes, setWishes] = useState(props?.wishes || []);
  const $sent = useStore(sent);
  useEffect(() => {
    fetch("/api/wishes")
      .then((res) => res.json())
      .then(setWishes);
  }, [$sent]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 max-w-screen-xl w-full">
      <AnimatePresence initial={false}>
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            className="p-0.5 bg-gradient-to-r from-primary to-accent rounded text-sm bg-black/10"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
          >
            <div className="bg-secondary h-full">
              <div className="h-full flex flex-col gap-2 bg-white/5 px-3 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {wish.sender}
                </span>
                <p>{wish.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
