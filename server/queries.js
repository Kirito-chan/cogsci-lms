import pool from "./db.js";

const execute = async (queryString, paramsArr) => {
  const [row] = await pool.promise().query(queryString, paramsArr);
  return row;
};

export const getSubjectValuation = async (subjectId) => {
  const [
    row,
  ] = await execute("SELECT * FROM subject_valuation WHERE subject_id = ?", [
    subjectId,
  ]);
  return row;
};
