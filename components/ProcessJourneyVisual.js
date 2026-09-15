import SmartImage from "./SmartImage";

export default function ProcessJourneyVisual({ image, imagePosition, side, alt }) {
  return (
    <div className={`pj-visual ${side}`} style={{ "--img-pos": imagePosition || "center" }}>
      {image && <SmartImage src={image} alt={alt} />}
    </div>
  );
}
