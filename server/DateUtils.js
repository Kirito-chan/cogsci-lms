export const getCurrentDate = () => {
  return (
    new Date().toISOString().slice(0, 10) +
    " " +
    new Date().toLocaleTimeString("en-GB")
  );
};

export const convertDateToSQLFormat = (date) => {
  return (
    new Date(date).toISOString().slice(0, 10) +
    " " +
    new Date(date).toLocaleTimeString("en-GB")
  );
};
