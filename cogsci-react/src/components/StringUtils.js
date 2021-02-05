export default function formatTranslation(number, type) {
  number = parseInt(number);
  if (type === "príspevok") {
    if (number === 1) {
      return "príspevok";
    } else if (number > 1 && number < 5) {
      return "príspevky";
    } else {
      return "príspevkov";
    }
  } else if (type === "váš") {
    if (number === 1) {
      return "váš";
    } else if (number > 1 && number < 5) {
      return "vaše";
    } else {
      return "vašich";
    }
  } else if (type === "bod") {
    if (number === 1) {
      return "bod";
    } else if (number > 1 && number < 5) {
      return "body";
    } else {
      return "bodov";
    }
  }
  return type;
}
