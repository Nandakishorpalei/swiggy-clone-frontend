import { useRef, useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import classNames from "classnames";

const Carousel = ({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(false);

  const updateScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setLeftDisabled(scrollLeft === 0);
      setRightDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 1000;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState);
    return () => carousel.removeEventListener("scroll", updateScrollState);
  }, [carouselRef.current, children]);

  return (
    <div className="relative w-full mx-auto">
      <div
        className={classNames("w-full flex items-center mb-4", {
          "justify-end": !title,
          "justify-between": title,
        })}
      >
        {title}
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            disabled={leftDisabled}
            className={classNames(
              "h-9 w-9 bg-neutral-20 text-black rounded-full flex items-center justify-center transition-opacity",
              {
                "opacity-50 cursor-not-allowed": leftDisabled,
              }
            )}
          >
            <WestIcon fontSize="small" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={rightDisabled}
            className={classNames(
              "h-9 w-9 bg-neutral-20 text-black rounded-full flex items-center justify-center transition-opacity",
              {
                "opacity-50 cursor-not-allowed": rightDisabled,
              }
            )}
          >
            <EastIcon fontSize="small" />
          </button>
        </div>
      </div>
      <motion.div
        ref={carouselRef}
        className="flex gap-10 overflow-x-auto cursor-grab scrollbar-hide"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Carousel;
