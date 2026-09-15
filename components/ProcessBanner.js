import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";

export default function ProcessBanner() {
  return (
    <section className="pj-banner-hero">
      <SmartImage
        src={IMG.processBanner}
        alt="Your journey with The Blessed Womb — from your first visit to your next chapter"
        className="pj-banner-hero-img reveal"
      />
    </section>
  );
}
