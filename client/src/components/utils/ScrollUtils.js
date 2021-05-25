export const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = 250;
  window.scrollTo({ top: yCoordinate - yOffset, behavior: "smooth" });
};

export const scrollWithOffsetSmall = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = 80;
  window.scrollTo({ top: yCoordinate - yOffset, behavior: "smooth" });
};

export const cursorFocus = function (elem) {
  var x = window.scrollX,
    y = window.scrollY;
  elem.focus();
  window.scrollTo(x, y);
};
