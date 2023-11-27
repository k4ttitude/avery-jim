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

const dragLimit = 100;
const offsetTheshold = dragLimit * 2.5;

const Persons = { ME: "me", HER: "her", US: "us" };
const SOLO_IMAGES = [
  { src: "/solo/hieu1.jpeg", person: Persons.ME },
  { src: "/solo/thaonguyen2.jpeg", person: Persons.HER },
  { src: "/solo/hieu2.jpeg", person: Persons.ME },
];
const COUPLE_IMAGES = [
  { src: "/couple/match.png", person: Persons.US },
  { src: "/couple/DN_02619.jpg", person: Persons.US },
  { src: "/couple/DN_02677.jpg", person: Persons.US },
  { src: "/couple/DN_02703.jpg", person: Persons.US },
  { src: "/couple/DN_03091.jpg", person: Persons.US },
  { src: "/couple/DN_03105.jpg", person: Persons.US },
  { src: "/couple/DN_03223.jpg", person: Persons.US },
];

export const ImageSwiper = () => {
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

      <div className="h-[670px] w-96 relative">
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

        <div className="absolute z-10 bottom-0 h-[100px] right-0 left-0 flex items-center justify-center gap-3">
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
    const opacityNope = useTransform(x, [-dragLimit * 4, 0], [1, 0]);
    const opacityLike = useTransform(x, [0, dragLimit * 4], [0, 1]);

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
        className="absolute h-full w-96 object-none rounded-lg cursor-pointer"
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
          className="absolute top-12 left-8 -rotate-[15deg] border-[3px] border-green-400 rounded-sm py-1.5 px-2 text-green-400 leading-none text-4xl font-semibold"
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
