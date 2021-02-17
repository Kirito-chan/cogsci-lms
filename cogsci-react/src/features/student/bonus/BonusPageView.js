import React from "react";
import formatDate from "../../../components/DateUtils";
import Navigation from "../../../components/Navigation";
import BonusVideo from "../bonuses/BonusVideo";
import Comments from "./Comments";

function BonusPageView({ bonus, bonusOrderId }) {
  const bonusCreated = bonus.created && formatDate(bonus.created);

  return (
    <div>
      <Navigation />
      <h2 className="mb-4 pl-2">
        Bonusová úloha č. {bonusOrderId}: {bonus.title}
      </h2>
      <article className="pl-2">
        <p className="small">Vytvorené: {bonusCreated}</p>
        <p>{bonus.content}</p>
        <BonusVideo url={bonus.video_URL} />
      </article>

      <Comments />
    </div>
  );
}

export default BonusPageView;
