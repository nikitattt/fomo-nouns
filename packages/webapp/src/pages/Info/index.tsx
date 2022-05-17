import classes from "./Info.module.css";

import phonePreview from "../../assets/iphone-preview.png";

const Info: React.FC<{}> = (props) => {
  return (
    <div className={classes.Info}>
      <p className={classes.title}>Want to test the FOMO Nouns mobile apps?</p>
      <div>
        <a href="https://play.google.com/store/apps/details?id=com.fomonouns.ng.mobileapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
          <img
            className={classes.badge}
            alt="Get it on Google Play"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          />
        </a>
      </div>
      <br />
      <a href="https://twitter.com/nikitago_/status/1518775085070487552">
        How to install app on iOS
      </a>
      <br />
      <img
        className={classes.phone}
        alt="Fomo Nouns app preview on iPhone"
        src={phonePreview}
      />
    </div>
  );
};

export default Info;
