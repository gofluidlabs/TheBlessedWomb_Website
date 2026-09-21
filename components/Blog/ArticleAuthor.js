import SmartImage from "../SmartImage";
import { IMG } from "@/lib/images";
import { DOCTOR, CLINIC } from "@/lib/seo";

export default function ArticleAuthor() {
  return (
    <div className="article-author-box">
      <span className="article-author-photo">
        <SmartImage src={IMG.doc} alt={`${DOCTOR.name}, ${DOCTOR.jobTitle}`} sizes="64px" />
      </span>
      <div>
        <span className="article-author-label">Written &amp; medically overseen by</span>
        <strong>{DOCTOR.name}</strong>
        <span className="article-author-role">
          {DOCTOR.jobTitle} &middot; {DOCTOR.credentials}
        </span>
        <span className="article-author-clinic">
          {CLINIC.name}, {CLINIC.addressLocality}
        </span>
      </div>
    </div>
  );
}
