import classes from './Info.module.css';

const Info: React.FC<{}> = props => {
    return <div className={classes.Info}>
        <p>Want to test the FOMO Nouns mobile apps? Get the instructions in NounsDAO discord:</p>
        <a href="https://discord.com/channels/849745721544146955/892962966226473100/967151287479185449">Install app on Android</a>
        <br />
        <a href="https://discord.com/channels/849745721544146955/892962966226473100/967568231709704222">Install app on iOS</a>
    </div>
}

export default Info