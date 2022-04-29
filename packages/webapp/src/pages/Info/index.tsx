import classes from './Info.module.css';

const Info: React.FC<{}> = props => {
    return <div className={classes.Info}>
        <p>Want to test the FOMO Nouns mobile apps?</p>
        <a href="https://twitter.com/nikitago_/status/1518775085070487552">How to install app on iOS</a>
        <br />
        <div>
            <a href='https://play.google.com/store/apps/details?id=com.fomonouns.ng.mobileapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                <img className={classes.badge} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
            </a>
        </div>
    </div>
}

export default Info