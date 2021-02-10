import React, { useEffect } from "react";
import BonusesList from "./BonusesList";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../app/currentUserSlice";
import { loadBonuses, getBonuses } from "../homeSlice";

function Bonuses() {
  const dispatch = useDispatch();

  const bonuses = useSelector(getBonuses);
  const currentUserId = useSelector(getCurrentUserId);

  useEffect(() => {
    if (currentUserId) dispatch(loadBonuses(currentUserId));
  }, [currentUserId]);

  return <BonusesList bonuses={bonuses} />;
}

export default Bonuses;
