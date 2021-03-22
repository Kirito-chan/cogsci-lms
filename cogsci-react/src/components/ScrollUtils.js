export const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = 96;
  window.scrollTo({ top: yCoordinate - yOffset, behavior: "smooth" });
};
