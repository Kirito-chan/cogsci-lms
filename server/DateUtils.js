export const getCurrentDate = () => {
  return (
    new Date().toISOString().slice(0, 10) +
    " " +
    new Date().toLocaleTimeString("sk-SK")
  );
};

export const convertDateToSQLFormat = (date) => {
  return (
    new Date(date).toISOString().slice(0, 10) +
    " " +
    new Date(date).toLocaleTimeString("sk-SK")
  );
};

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
