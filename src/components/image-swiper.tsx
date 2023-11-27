import {
  AnimatePresence,
  motion,
  useAnimation,
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
const offsetTheshold = dragLimit * 2.5;

export const ImageSwiper = () => {
  const [images, setImages] = useState([
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
  ]);
  const handleNext = () => {
    setImages((values) => [...values.slice(1), values[0]]);
  };

  return (
    <section className="h-[100svh] w-screen grid place-items-center bg-red-200">
      <div className="h-[670px] w-96 relative">
        <AnimatePresence>
          {images.map((image, index) => (
            <Image
              z={images.length - index}
              key={image}
              src={image}
              onNext={handleNext}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Image = ({
  src,
  z,
  onNext,
}: {
  src: string;
  z: number;
  onNext: () => void;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-offsetTheshold, offsetTheshold], [-15, 15]);
  const opacityNope = useTransform(x, [-dragLimit * 4, 0], [1, 0]);
  const opacityLike = useTransform(x, [0, dragLimit * 4], [0, 1]);

  const anim = useAnimation();

  return (
    <motion.div
      className="absolute h-full w-96 object-none rounded-lg overflow-hidden cursor-pointer z-[1]"
      style={{ x, rotate, zIndex: z }}
      animate={anim}
      transition={{
        x: { duration: 0.3 },
        opacity: { duration: 0.3 },
      }}
      dragSnapToOrigin
      drag
      dragConstraints={{
        left: -dragLimit,
        right: dragLimit,
        top: -10,
        bottom: 10,
      }}
      dragElastic={0.5}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > offsetTheshold) {
          anim
            .start({ x: info.offset.x > 0 ? 1000 : -1000, y: 0 })
            .then(() => onNext());
          setTimeout(() => anim.set({ x: 0 }), 500);
        }
      }}
    >
      <motion.div
        className="absolute top-12 right-8 rotate-[15deg] border-[3px] border-destructive rounded-sm py-1.5 px-2 text-destructive leading-none text-4xl font-semibold"
        style={{ opacity: opacityNope, fontFamily: "Montserrat;" }}
      >
        NOPE
      </motion.div>
      <motion.div
        className="absolute top-12 left-8 -rotate-[15deg] border-[3px] border-green-400 rounded-sm py-1.5 px-2 text-green-400 leading-none text-4xl font-semibold"
        style={{ opacity: opacityLike, fontFamily: "Montserrat;" }}
      >
        LIKE
      </motion.div>
      <img
        src={src}
        className="h-full w-full object-cover pointer-events-none"
      />
    </motion.div>
  );
};
