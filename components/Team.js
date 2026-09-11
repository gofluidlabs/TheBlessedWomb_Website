import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import {
  Plus,
  Phone,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
} from "./Icons";

const MEMBERS = [
  { name: "Leslie Alexander", role: "Doctor", img: IMG.team1, dark: false },
  { name: "Ronald Richards", role: "Manager", img: IMG.team2, dark: false },
  {
    name: "Cody Fisher",
    role: "Medical Assistant",
    img: IMG.team3,
    dark: true,
  },
  { name: "Ralph Edwards", role: "Senior Excitative", img: IMG.team4, dark: false },
];

export default function Team() {
  return (
    <section className="section team" id="team">
      <img className="team-cross" src={IMG.crossDeco} alt="" aria-hidden="true" />
      <img className="team-silhouette" src={IMG.silhouette} alt="" aria-hidden="true" />
      <div className="container">
        <div className="team-head">
          <div className="reveal" data-anim="left">
            <span className="eyebrow">Our Leadership</span>
            <h2 className="section-title">
              Dedicated team creating
              <br />
              <span className="accent">new beginnings</span>
            </h2>
          </div>
          <p className="th-note reveal" data-anim="right">
            Our IVF treatments use cutting-edge technology to help you on your
            journey to parenthood, with care tailored to your unique needs.
          </p>
        </div>

        <div className="team-grid" data-stagger>
          {MEMBERS.map((m) => (
            <article
              key={m.name}
              className={`team-card ${m.dark ? "dark" : ""}`}
            >
              {m.dark ? (
                <div className="team-social">
                  <a href="#" aria-label="Facebook">
                    <Facebook />
                  </a>
                  <a href="#" aria-label="Twitter">
                    <Twitter />
                  </a>
                  <a href="#" aria-label="Instagram">
                    <Instagram />
                  </a>
                </div>
              ) : (
                <span className="team-plus">
                  <Plus />
                </span>
              )}
              <SmartImage src={m.img} alt={m.name} className="team-photo" />
              <div className="team-info">
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="team-foot reveal">
          <div className="tf-avatars">
            <span className="av">
              <SmartImage src={IMG.doc} alt="" />
            </span>
            <span className="av call">
              <Phone width={18} height={18} />
            </span>
          </div>
          <span>let&rsquo;s make something great work together.</span>
          <a href="#" className="viewall">
            View All Doctors <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
