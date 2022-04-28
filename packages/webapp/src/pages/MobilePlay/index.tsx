import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks';

import classes from './MobilePlay.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Noun from '../../components/Noun';
import Title from '../../components/Title';
import VoteBar from '../../components/VoteBar';
import VoteProgressBar from '../../components/VoteProgressBar';
import SettledAuctionModal from '../../components/SettledAuctionModal';

import { setActiveAccount } from '../../state/slices/account';
import { openVoteSocket, markVoterInactive } from '../../middleware/voteWebsocket';
import { openEthereumSocket } from '../../middleware/alchemyWebsocket';


const MobilePlay: React.FC<{}> = props => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { account } = useEthers();
    const dispatch = useAppDispatch();
    const useGreyBg = useAppSelector(state => state.noun.useGreyBg);
    const missedVotes = useAppSelector(state => state.vote.missedVotes);

    const height = new URLSearchParams(useLocation().search).get("height");
    const pageHeight = { height: `${height}px` };

    useEffect(() => {
        dispatch(setActiveAccount(account));
    }, [dispatch, account]);

    useEffect(() => { // Only initialize after mount
        dispatch(openVoteSocket());
        dispatch(openEthereumSocket());
    }, [dispatch]);

    // Deal with inactive users
    useEffect(() => {
        if (missedVotes > 3) {
            dispatch(markVoterInactive());
        }
    }, [dispatch, missedVotes]);


    return (
        <div className={`${classes.MobilePlay} ${useGreyBg ? classes.bgGrey : classes.bgBeige}`} style={pageHeight}>
            <Title />
            <VoteProgressBar />
            <SettledAuctionModal />
            <Noun alt={"Current Block Noun"} />
            <VoteBar />
        </div>
    );
}

export default MobilePlay;
