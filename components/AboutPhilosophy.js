export default function AboutPhilosophy() {
  return (
    <section className="section about" id="philosophy">
      <div className="container" style={{ textAlign: "center", maxWidth: 780, margin: "0 auto" }}>
        <span className="eyebrow reveal" data-anim="up">
          Our Philosophy
        </span>
        <h2 className="section-title reveal" data-anim="up" data-delay="0.05">
          Complete Care
          <br />
          <span className="accent">of Motherhood</span>
        </h2>
        <p className="about-desc reveal" data-anim="up" data-delay="0.1" style={{ maxWidth: 640, margin: "0 auto" }}>
          Care built around attentive, compassionate support for women,
          mothers and growing families at every stage — from antenatal care
          through gynaecological and infertility-related care — guided
          personally by Dr. Jyoti Gupta.
        </p>
      </div>
    </section>
  );
}
