import Loader from "../Loader";

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

export function showLoaderIfAnyNull() {
  for (var i = 0; i < arguments.length; i++) {
    const object = arguments[i];
    if (object == null || object == "null" || object == undefined) {
      return (
        <div className="text-center">
          <Loader />
        </div>
      );
    }
  }
  return false;
}

export function showLoaderIfEmptyArray(array) {
  if (array?.length == 0) {
    return <Loader />;
  }
  return false;
}

export const isValidEmail = (email) => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !email || emailPattern.test(String(email).toLowerCase());
};
