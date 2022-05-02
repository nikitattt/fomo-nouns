import clsx from 'clsx';
import classes from './VoteButton.module.css';
import { VOTE_OPTIONS, setCurrentVote } from '../../state/slices/vote';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendVote } from '../../middleware/voteWebsocket';

export enum EMOJI_TYPE {
  dislike = '👎',
  shrug = '🤷‍♂️',
  like = '👍'
}

const voteToEmoji: Record<VOTE_OPTIONS, string> = {
  [VOTE_OPTIONS['voteDislike']]: '👎',
  [VOTE_OPTIONS['voteShrug']]: '🤷‍♂️',
  [VOTE_OPTIONS['voteLike']]: '👍'
};

function isLike(vote: VOTE_OPTIONS): boolean {
  return vote === VOTE_OPTIONS['voteLike'] ? true : false;
}

const VoteButton: React.FC<{ voteType: VOTE_OPTIONS }> = props => {
  const activeAuction = useAppSelector(state => state.auction.activeAuction);
  const currentVote = useAppSelector(state => state.vote.currentVote);
  const wsConnected = useAppSelector(state => state.vote.connected);
  const hash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId);
  const voteCounts = useAppSelector(state => state.vote.voteCounts);

  const votingActive = useAppSelector(state => state.vote.votingActive);

  const { voteType } = props;
  const voteNotSelected = (currentVote !== undefined) && currentVote !== voteType;
  const dispatch = useAppDispatch();
  const changeVote = () => {
    if (currentVote || !wsConnected) return;

    dispatch(setCurrentVote(voteType));
    dispatch(sendVote({ "nounId": nextNounId, "blockhash": hash, "vote": voteType }));
  }

  return (
    <button
      className={currentVote === voteType ? clsx(classes.voteButton, isLike(currentVote!) ? classes.selectedLike : classes.selectedDislike) : classes.voteButton}
      onClick={changeVote}
      disabled={voteNotSelected || (!votingActive || activeAuction)}
    >
      <span className={classes.voteEmojiText}> {voteToEmoji[voteType]} </span>
      <span className={classes.voteText}> {voteCounts[voteType]} </span>
    </button>
  );
};
export default VoteButton;