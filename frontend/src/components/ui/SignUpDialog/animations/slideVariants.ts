export const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? -100 : 100,
      opacity: 0,
    };
  },
};
