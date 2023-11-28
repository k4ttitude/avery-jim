import { cn } from "@/lib/utils";
import {
  MotionValue,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { CalendarHeart, Heart, Star, X } from "lucide-react";
import {
  useState,
  type PropsWithChildren,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  type ComponentProps,
} from "react";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";
import { Button } from "./ui/button";

const dragLimit = 80;
const offsetTheshold = dragLimit * 2.5;

const Persons = { ME: "me", HER: "her", US: "us" };
const SOLO_IMAGES = [
  { src: "/solo/hieu0.webp", person: Persons.ME },
  { src: "/solo/thaonguyen1.webp", person: Persons.HER },
  { src: "/solo/hieu1.webp", person: Persons.ME },
  { src: "/solo/thaonguyen2.webp", person: Persons.HER },
  { src: "/solo/hieu2.webp", person: Persons.ME },
  { src: "/solo/thaonguyen3.webp", person: Persons.HER },
  { src: "/solo/hieu3.webp", person: Persons.ME },
  { src: "/solo/thaonguyen4.webp", person: Persons.HER },
  { src: "/solo/hieu4.jpg", person: Persons.ME },
  { src: "/solo/thaonguyen5.webp", person: Persons.HER },
  { src: "/solo/hieu5.jpg", person: Persons.ME },
  { src: "/solo/thaonguyen6.webp", person: Persons.HER },
  { src: "/solo/hieu6.webp", person: Persons.ME },
  { src: "/solo/thaonguyen7.webp", person: Persons.HER },
  { src: "/solo/hieu7.webp", person: Persons.ME },
  { src: "/solo/thaonguyen8.webp", person: Persons.HER },
];
const COUPLE_IMAGES = [
  { src: "/couple/DN_02619.webp", person: Persons.US },
  { src: "/couple/DN_02677.webp", person: Persons.US },
  { src: "/couple/DN_02703.webp", person: Persons.US },
  { src: "/couple/DN_03091.webp", person: Persons.US },
  { src: "/couple/DN_03105.webp", person: Persons.US },
  { src: "/couple/DN_03223.webp", person: Persons.US },
  { src: "/couple/hautruong.jpg", person: Persons.US },
];

export const Tinder = () => {
  const [images, setImages] = useState(SOLO_IMAGES);

  const xx = useMotionValue(0);
  // nope
  const nopeBackgroundOpacity = useTransform(
    xx,
    [-dragLimit * 2, -dragLimit, -1, 0],
    [0, 1, 1, 0],
  );
  const nopeSvgOpacity = useTransform(
    xx,
    [-dragLimit * 2, -dragLimit, -1, 0],
    [1, 0, 0, 1],
  );
  const nopeScale = useTransform(xx, [-dragLimit, -1, 0], [1, 0.75, 1]);
  // like
  const likeBackgroundOpacity = useTransform(
    xx,
    [0, 1, dragLimit, dragLimit * 2],
    [0, 1, 1, 0],
  );
  const likeSvgOpacity = useTransform(
    xx,
    [0, 1, dragLimit, dragLimit * 2],
    [1, 0, 0, 1],
  );
  const likeScale = useTransform(xx, [0, 1, dragLimit], [1, 0.75, 1]);

  const imageRef = useRef<ImageRef>(null);
  const [likes, setLikes] = useState([] as { src: string; person: string }[]);
  const handleNext = (like: boolean) => {
    setImages((values) => [...values.slice(1), values[0]]);
    if (like) setLikes((prev) => [...prev, images[0]]);
  };

  const [showMatch, setShowMatch] = useState(0);
  useEffect(() => {
    if (showMatch >= 1) {
      return;
    }
    const likedMe = likes.some((like) => like.person === Persons.ME);
    const likedHer = likes.some((like) => like.person === Persons.HER);
    if (likedMe && likedHer) {
      setImages(COUPLE_IMAGES);
      setShowMatch(1);
    }
  }, [likes]);

  return (
    <section className="h-[100svh] w-screen grid place-items-center bg-black">
      <MatchDialog
        open={showMatch === 1}
        onOpenChange={(open) => !open && setShowMatch((prev) => prev + 1)}
      />

      <div className="h-full w-full flex flex-col lg:h-[770px] md:w-96 bg-[#111418] relative">
        <div className="h-12 flex items-center pl-3">
          <svg
            className="h-6 top-0 left-0 z-20 fill-primary"
            viewBox="0 0 519 123"
          >
            <title>Tinder</title>
            <path d="M31.5 49.6C55 41.5 59 20.4 56 1c0-.7.6-1.2 1.2-1C79.7 11 105 35 105 71c0 27.6-21.4 52-52.5 52a50 50 0 0 1-28.2-92.7c.6-.4 1.4 0 1.4.7.3 3.7 1.3 13 5.4 18.6h.4z"></path>
            <path d="M171.2 101.1l1.7-2 5.3 16.8-.7.7c-4 3.7-10 5.6-17.7 5.6h-.3c-7 0-12.5-2-16.3-5.7-3.8-3.8-5.8-9.5-5.8-16.7V54h-13.5V35.5h13.5V13.2h20.8v22.3h16.5V54h-16.6v41.3c0 1.9.5 8 6.3 8 3 0 5.8-1.1 6.8-2.3zm11 19.2V35.6H203v84.7h-20.8zM192.5 1A12.5 12.5 0 1 1 180 13.6C180 6.8 185.7 1 192.5 1zm66.4 32.5c18 0 27.9 9.8 27.9 27.7v59H266V66.2c-.4-9.6-5-14-14.8-14-8.8 0-15.9 5.4-19.5 10v58h-20.8V35.7h20.8v9c6-5.8 15.6-11 27.2-11zM356 44.4V4.6h20.8v115.8H356v-8.8a34.3 34.3 0 0 1-24.7 10.7c-22.7 0-37.9-17.8-37.9-44.3 0-26.6 15.2-44.4 37.9-44.4A34 34 0 0 1 356 44.4zm0 17.9a25.6 25.6 0 0 0-19.6-10c-12.9 0-21.5 10.3-21.5 25.7 0 15.3 8.6 25.6 21.5 25.6 7.5 0 15.7-4 19.6-9.8V62.3zm69.4-28.7c24.6 0 41.7 19 41.7 46v5.7h-62.9c2.1 11.9 11.5 19.5 24.3 19.5 8.1 0 17-3.5 22.1-8.6L452 95l9.9 14.2-1 .9a48.6 48.6 0 0 1-34.1 12.2c-26 0-44.3-18.3-44.3-44.4a42.8 42.8 0 0 1 43-44.3zm-21.3 36h42.7c-1.2-12.7-11.7-18.5-21.4-18.5-14.6 0-20.1 11-21.3 18.6zm113.3-36h1.5v21l-1.8-.3c-1.5-.3-3.4-.5-5.3-.5-6.7 0-16 4.7-19.5 9.7v56.7h-20.8V35.6h20.9V45c6.9-7.2 16-11.4 25-11.4z"></path>
          </svg>
        </div>

        <div className="relative flex-1 w-full">
          {images.map((image, index) => (
            <Image
              ref={index === 0 ? imageRef : null}
              xx={xx}
              z={images.length - index}
              key={image.src}
              src={image.src}
              onNext={handleNext}
            />
          ))}

          <div
            className="absolute top-0 bottom-0 left-0 right-0 border-black border-b-[100px] rounded-lg cursor-pointer"
            style={{ boxShadow: "rgb(33,38,46) 0px 0px 8px 0px" }}
          ></div>

          <div className="absolute z-50 bottom-0 h-[100px] right-0 left-0 flex items-center justify-center gap-3">
            <a href="#wishes">
              <RoundedButton className="h-14 w-14 border-amber-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  className="stroke-amber-400 scale-90 group-hover:scale-100"
                  stroke="#f91af2"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="8"
                    width="18"
                    height="4"
                    rx="1"
                    className="fill-amber-600"
                  />
                  <path
                    d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"
                    className="fill-amber-600"
                  />
                  <path d="M12 8v13" />
                  <path
                    d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
                    className="fill-amber-600"
                  />
                </svg>
              </RoundedButton>
            </a>
            <RoundedButton
              className="border-none relative"
              onClick={() => imageRef.current?.nope()}
            >
              <motion.span
                className="absolute bg-primary h-full w-full rounded-full"
                style={{ opacity: nopeBackgroundOpacity, scale: nopeScale }}
              ></motion.span>
              <motion.span
                className="absolute h-full w-full rounded-full grid place-items-center"
                style={{ opacity: nopeBackgroundOpacity }}
              >
                <X
                  size={38}
                  strokeWidth={4}
                  className="stroke-white scale-90 group-hover:scale-100"
                />
              </motion.span>
              <motion.span
                className="absolute h-full w-full rounded-full grid place-items-center border border-primary"
                style={{ opacity: nopeSvgOpacity }}
              >
                <X
                  size={38}
                  strokeWidth={4}
                  className="stroke-[url(#nope)] scale-90 group-hover:scale-100"
                >
                  <linearGradient
                    id="nope"
                    x1="0.14644660940672627"
                    x2="0.8535533905932737"
                    y1="0.8535533905932737"
                    y2="0.1464466094067262"
                    spreadMethod="pad"
                  >
                    <stop offset="0%" stopColor="#f13b2d"></stop>
                    <stop offset="100%" stopColor="#e010cd"></stop>
                  </linearGradient>
                </X>
              </motion.span>
            </RoundedButton>
            <RoundedButton className="h-14 w-14 border-blue-400">
              <Star
                size={38}
                strokeWidth={0}
                className="text-blue-400 fill-[url(#superlike)] mb-0.5 scale-90 group-hover:scale-100"
              >
                <defs>
                  <linearGradient
                    id="superlike"
                    x1="0.14644660940672627"
                    x2="0.8535533905932737"
                    y1="0.8535533905932737"
                    y2="0.1464466094067262"
                    spreadMethod="pad"
                  >
                    <stop offset="0%" stopColor="#1786ff"></stop>
                    <stop offset="100%" stopColor="#74fef2"></stop>
                  </linearGradient>
                </defs>
              </Star>
            </RoundedButton>
            <RoundedButton
              className="border-none relative"
              onClick={() => imageRef.current?.like()}
            >
              <motion.span
                className="absolute bg-green-600  h-full w-full rounded-full"
                style={{ opacity: likeBackgroundOpacity, scale: likeScale }}
              ></motion.span>
              <motion.span
                className="absolute h-full w-full rounded-full grid place-items-center"
                style={{ opacity: likeBackgroundOpacity }}
              >
                <Heart
                  size={38}
                  strokeWidth={0}
                  className="fill-white mt-0.5 scale-90 group-hover:scale-100"
                />
              </motion.span>
              <motion.span
                className="absolute h-full w-full rounded-full grid place-items-center border border-green-600"
                style={{ opacity: likeSvgOpacity }}
              >
                <Heart
                  size={38}
                  strokeWidth={0}
                  className="fill-[url(#like)] mt-0.5 scale-90 group-hover:scale-100"
                >
                  <linearGradient
                    id="like"
                    x1="0.14644660940672627"
                    x2="0.8535533905932737"
                    y1="0.8535533905932737"
                    y2="0.1464466094067262"
                    spreadMethod="pad"
                  >
                    <stop offset="0%" stopColor="#2df187"></stop>
                    <stop offset="100%" stopColor="#74fef2"></stop>
                  </linearGradient>
                </Heart>
              </motion.span>
            </RoundedButton>
            <a href="#timeline">
              <RoundedButton className="h-14 w-14 border-fuchsia-600">
                <CalendarHeart
                  size={32}
                  className="scale-90 group-hover:scale-100 stroke-fuchsia-500 fill-fuchsia-700"
                />
              </RoundedButton>
            </a>
          </div>
        </div>

        <div className="h-12 flex items-center gap-4 lg:justify-between px-3">
          <span className="text-primary/90">Hiếu & Thảo Nguyên</span>
          <span className="text-muted-foreground/90 mt-px">20/12/2023</span>
        </div>
      </div>
    </section>
  );
};

type ImageRef = {
  nope: () => Promise<void>;
  like: () => Promise<void>;
};
type ImageProps = {
  src: string;
  z: number;
  xx: MotionValue;
  onNext: (like: boolean) => void;
};
const Image = forwardRef<ImageRef, ImageProps>(
  ({ src, z, xx, onNext }, ref) => {
    const x = useMotionValue(0);
    x.on("change", (value) => {
      if (z === SOLO_IMAGES.length) xx.set(value);
    });
    const rotate = useTransform(
      x,
      [-offsetTheshold, offsetTheshold],
      [-15, 15],
    );
    const opacityNope = useTransform(x, [-dragLimit * 2, 0], [1, 0]);
    const opacityLike = useTransform(x, [0, dragLimit * 2], [0, 1]);

    const anim = useAnimation();

    useImperativeHandle(
      ref,
      () => ({
        nope: () =>
          new Promise((resolve) => {
            opacityNope.set(1);
            setTimeout(
              () =>
                anim.start({ x: -1000, y: 0 }).then(() => {
                  onNext(false);
                  x.set(0);
                  resolve();
                }),
              500,
            );
          }),
        like: () =>
          new Promise((resolve) => {
            opacityLike.set(1);
            setTimeout(
              () =>
                anim.start({ x: 1000, y: 0 }).then(() => {
                  onNext(true);
                  x.set(0);
                  resolve();
                }),
              500,
            );
          }),
      }),
      [],
    );

    return (
      <motion.div
        className="absolute h-full w-full object-none rounded-lg cursor-pointer"
        style={{ x, rotate, zIndex: z }}
        animate={anim}
        transition={{ x: { duration: 0.3 }, opacity: { duration: 0.3 } }}
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
              .then(() => onNext(info.offset.x > 0));
            setTimeout(() => anim.set({ x: 0 }), 500);
          }
        }}
      >
        <motion.div
          className="absolute top-12 right-8 rotate-[15deg] border-[3px] border-destructive rounded-sm py-1.5 px-2 text-destructive leading-none text-4xl font-semibold"
          style={{ opacity: opacityNope, fontFamily: "Montserrat" }}
        >
          KHÔNG
        </motion.div>
        <motion.div
          className="absolute top-12 left-8 -rotate-[15deg] bg-secondary/30 border-[3px] border-green-400 rounded-sm py-1.5 px-2 text-green-400 leading-none text-4xl font-semibold"
          style={{ opacity: opacityLike, fontFamily: "Montserrat" }}
        >
          THÍCH
        </motion.div>
        <img
          src={src}
          className="h-[calc(100%-100px)] w-full object-cover pointer-events-none rounded-lg"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 border-black border-b-[100px] rounded-lg cursor-pointer">
          <div className="absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-black to-white/0"></div>
        </div>
      </motion.div>
    );
  },
);

const RoundedButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.ComponentProps<typeof motion.button>>) => (
  <motion.button
    type="button"
    className={cn(
      "group rounded-full h-16 w-16 border flex items-center justify-center [&>svg]:transition-transform",
      className,
    )}
    {...props}
  >
    {children}
  </motion.button>
);

const MatchDialog = (props: ComponentProps<typeof Dialog>) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent className="bg-secondary text-white/90 w-fit">
        <span className="text-2xl">Yay!</span>
        <span className="inline-flex gap-1">
          Ghép đôi thành công!
          <Star className="text-amber-500 fill-amber-500" />
          <Heart className="text-primary fill-primary" />
        </span>
        <Button
          type="button"
          className="bg-gradient-to-r from-primary to-accent"
          onClick={() => props.onOpenChange(false)}
        >
          Xem ảnh
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
