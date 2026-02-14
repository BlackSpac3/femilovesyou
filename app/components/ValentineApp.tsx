"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const generateHearts = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    duration: 5 + Math.random() * 5,
    delay: Math.random() * 5,
    size: 20 + Math.random() * 40,
    isFilled: Math.random() > 0.5,
  }));
};

interface HeartItem {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  isFilled: boolean;
}

export default function ValentineApp() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState<HeartItem[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setHearts(generateHearts(15));
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.5);

    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const newX = (Math.random() - 0.5) * (container.width * 0.8);
      const newY = (Math.random() - 0.5) * (container.height * 0.8);

      setNoButtonPos({ x: newX, y: newY });
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF2D55", "#FFB2D1", "#FFFFFF"],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If noCount is high enough, hide the no button behind yes
  const isNoHidden = noCount > 10;

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure??",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely sure?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of mind?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-transparent"
    >
      <AnimatePresence mode="wait">
        {!yesPressed ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="z-10 flex flex-col items-center w-full max-w-2xl py-12 space-y-16"
          >
            {/* 1. Sophisticated Header */}
            <header className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 mb-6"
              >
                <Heart className="w-6 h-6 text-accent fill-accent" />
              </motion.div>

              <h1 className="flex flex-col items-center">
                <span className="text-sm font-black tracking-[0.4em] uppercase text-accent/50 mb-4">
                  A Special Request
                </span>
                <span className="text-6xl md:text-8xl font-serif italic text-foreground tracking-tight">
                  Will You Be My
                </span>
                <span className="text-7xl md:text-9xl font-black text-gradient -mt-4 drop-shadow-2xl">
                  Valentine?
                </span>
              </h1>
            </header>

            {/* 2. Floating "Modal" Image Style */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              {/* Outer Glow / Aura */}
              <div className="absolute -inset-10 bg-linear-to-br from-accent/20 to-secondary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              {/* The "Modal" Frame */}
              <div className="relative z-10 p-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[4rem] shadow-2xl overflow-hidden transform group-hover:rotate-1 transition-transform duration-500">
                <div className="relative size-80 md:size-100 rounded-[3.5rem] overflow-hidden">
                  <Image
                    src="/couple_pics/i_and_bae.jpeg"
                    alt="I & Bae"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover object-bottom grayscale-10 group-hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  {/* Glass Overlay on Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                    <p className="text-white/80 font-medium tracking-widest text-xs uppercase">
                      Created with love
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 z-20 bg-accent text-white p-4 rounded-full shadow-xl rotate-12"
              >
                <Heart className="w-6 h-6 fill-white" />
              </motion.div>
            </motion.div>

            {/* 3. Re-imagined Button Stack */}
            <div className="flex flex-col items-center gap-6 w-full px-6">
              {/* Massive Main Action */}
              <motion.button
                onClick={handleYesClick}
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale + 0.05 }}
                whileTap={{ scale: yesScale - 0.05 }}
                className="w-full md:w-80 py-6 bg-accent text-white rounded-[2rem] font-black text-2xl shadow-[0_20px_40px_rgba(255,77,141,0.4)] hover:shadow-[0_25px_50px_rgba(255,77,141,0.6)] transition-all relative overflow-hidden group/btn"
              >
                <span className="relative z-10 uppercase tracking-widest font-black">
                  Yes, I will!
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </motion.button>

              {/* The "No" Button - Positioned Subtly Below */}
              <AnimatePresence>
                {!isNoHidden && (
                  <motion.button
                    key="no-button"
                    onClick={handleNoClick}
                    animate={{
                      x: noButtonPos.x,
                      y: noButtonPos.y,
                      opacity: 1 - noCount * 0.1,
                    }}
                    className="px-10 py-3 text-accent/60 font-bold hover:text-accent transition-colors underline decoration-2 underline-offset-8"
                  >
                    {getNoButtonText()}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 flex flex-col items-center gap-12 text-center py-20 w-full max-w-5xl"
          >
            {/* Unique Layout Header */}
            <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-8 px-6">
              <motion.div
                initial={{ x: -100, opacity: 0, rotate: -15 }}
                animate={{ x: 0, opacity: 1, rotate: -5 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex-1 text-left order-2 md:order-1"
              >
                <h2 className="text-4xl md:text-6xl font-black italic mb-2">
                  That&apos;s my <span className="text-gradient">baby</span>
                </h2>
                <div className="h-1 w-32 bg-accent/40 rounded-full mb-4" />
                <p className="text-xl md:text-2xl text-accent/80 font-medium italic">
                  I knew you would say yes 😏
                </p>
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative order-1 md:order-2"
              >
                <div className="absolute -inset-4 bg-accent/20 blur-2xl rounded-full animate-pulse" />
                <Heart className="size-24 md:size-32 text-accent fill-accent relative z-10" />
              </motion.div>
            </div>

            {/* Letter Content - No Background */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-2xl px-6"
            >
              <div className="text-xl md:text-2xl text-foreground font-medium leading-relaxed text-left space-y-6">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-accent"
                >
                  Hi Adunni,
                </motion.p>

                <div className="space-y-4 text-foreground/90">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    I don’t even know where to begin.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    Firstly I don’t feel so good about this year’s Val, what I
                    had imagined isn’t what it came to be.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Regardless, you’re my heartbeat and my valentine every year
                    😘
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    You’ve been peach, you’ve been sweet, you’ve been stubborn,
                    you’ve been challenging, you’ve been a source of energy and
                    inspiration, you’ve been a good helper, source of insight
                    and good advice.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    You’ve been nothing but a good introduction to my life.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    You were the best stranger I ever met even though we are not
                    anymore.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="pt-8 border-t border-accent/10"
                  >
                    <p className="font-bold">
                      Thank you for an amazing four years run. I love you.
                    </p>
                    <p className="text-accent font-black text-2xl mt-2.5 italic">
                      I hope we can make it to forever.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Signature Placement */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, type: "spring" }}
              className="flex items-center gap-3 px-8 py-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-accent/20 rotate-3 self-end mr-4 md:mr-20"
            >
              <Heart className="w-6 h-6 fill-accent text-accent animate-bounce" />
              <div className="flex flex-col items-start">
                <span className="text-sm text-accent/60 uppercase tracking-widest font-bold">
                  Forever Yours,
                </span>
                <span className="font-black text-2xl text-accent">Akinola</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed  top-0 w-screen h-screen pointer-events-none z-0">
        <div className="relative w-full h-full">
          <div className="absolute bg-accent/20 top-1/4 left-1/4 size-32 md:size-64  rounded-full blur-[80px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 size-48 md:size-72 bg-accent/20 rounded-full blur-[80px] animate-pulse delay-700" />
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{
                left: `${50 + heart.x}%`,
                top: `${50 + heart.y}%`,
                opacity: 0,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                delay: heart.delay,
              }}
              className="absolute pointer-events-none"
            >
              <Heart
                className="text-accent/20"
                size={heart.size}
                strokeWidth={1}
                fill={heart.isFilled ? "currentColor" : "none"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
