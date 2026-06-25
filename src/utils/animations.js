import gsap from "gsap";

export const fadeUp = (
  element
) => {
  gsap.from(element, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
};

export const fadeIn = (
  element
) => {
  gsap.from(element, {
    opacity: 0,
    duration: 1,
  });
};