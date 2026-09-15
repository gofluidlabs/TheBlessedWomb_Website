import ProcessJourneyCard from "./ProcessJourneyCard";
import ProcessJourneyVisual from "./ProcessJourneyVisual";

export default function ProcessJourneyRow({ phase }) {
  const imageSide = phase.side === "left" ? "right" : "left";

  return (
    <div className={`pj-item ${phase.side}`}>
      <ProcessJourneyCard {...phase} />
      <ProcessJourneyVisual
        image={phase.image}
        imagePosition={phase.imagePosition}
        side={imageSide}
        alt={phase.title}
      />
    </div>
  );
}
