import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";

export default function ContactBanner() {
  return (
    <section className="contact-banner">
      <h1 className="sr-only">
        Contact The Blessed Womb — Find Us in Alpha I, Greater Noida
      </h1>
      <SmartImage
        src={IMG.contactBanner}
        alt="Map and walking directions to The Blessed Womb, Obs & Gynae Clinic — from Alpha 1 Main Market, near St. Joseph's School"
        className="contact-banner-img reveal"
      />
    </section>
  );
}
