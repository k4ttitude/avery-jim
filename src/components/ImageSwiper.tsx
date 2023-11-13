import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const dragLimit = 100;
const offsetTheshold = dragLimit * 1.0;

export const ImageSwiper = () => {
  const [images, setImages] = useState([
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
  ]);

  return (
    <div className="h-full w-full">
      <AnimatePresence>
        {images.map((image) => (
          <Image
            key={image}
            src={image}
            onNext={() =>
              setImages((values) => [...values.slice(1), values[0]])
            }
            onPrev={() =>
              setImages((values) => [
                values[values.length - 1],
                ...values.slice(0, values.length - 1),
              ])
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const variants = {
  enter: { x: 0, opacity: 0 },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: {
    zIndex: 0,
    translateX: 0,
    opacity: 0,
  },
};

const Image = ({
  src,
  onNext,
  onPrev,
}: {
  src: string;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-dragLimit * 2, dragLimit * 2], [-30, 30]);
  const translateX = useTransform(x, [-dragLimit, dragLimit], [-30, 30]);
  const y = useTransform(x, [-dragLimit * 2, 0, dragLimit * 2], [40, 0, 40]);
  console.log(x.get());

  return (
    <motion.img
      src={src}
      className="absolute h-full w-full object-none rounded-lg cursor-pointer z-[1]"
      style={{ x, translateX, rotate }}
      variants={variants}
      exit={{ opacity: 0 }}
      transition={{
        x: { type: "spring", duration: 0.0 },
        opacity: { duration: 0.2 },
      }}
      dragTransition={{ bounceDamping: 200 }}
      drag
      dragConstraints={{
        left: -dragLimit,
        right: dragLimit,
        top: -10,
        bottom: 10,
      }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        x.set(0);
        if (info.offset.x < -offsetTheshold) {
          console.log("next");
          onNext();
        } else if (info.offset.x > offsetTheshold) {
          console.log("prev");
          onPrev();
        }
      }}
    />
  );
};
