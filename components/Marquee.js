import { Flask, Dna } from "./Icons";

function Group() {
  return (
    <div className="marquee-item">
      <Dna className="m-ico" />
      <span className="m-outline">IVF Success</span>
      <Flask className="m-ico" />
      <span className="m-fill">Family Dreams</span>
      <Flask className="m-ico" />
      <span className="m-outline">Healthy Families</span>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track" data-dir="left">
        <Group />
        <Group />
        <Group />
        <Group />
      </div>
    </section>
  );
}
