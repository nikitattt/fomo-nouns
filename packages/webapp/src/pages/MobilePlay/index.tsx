import { useEffect, useMemo } from 'react';
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
import dayjs from 'dayjs';
import { setNextNounId } from '../../state/slices/noun';
import { setAuctionEnd } from '../../state/slices/auction';
import { setBlockAttr } from '../../state/slices/block';

import { contract as AuctionContract } from '../../wrappers/nounsAuction';
import { provider } from '../../config';


const MobilePlay: React.FC<{}> = props => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { account } = useEthers();
    const dispatch = useAppDispatch();
    const useGreyBg = useAppSelector(state => state.noun.useGreyBg);
    const missedVotes = useAppSelector(state => state.vote.missedVotes);

    const height = new URLSearchParams(useLocation().search).get("height");
    const pageHeight = { height: `${height}px` };

    useMemo(async () => { // Initalized before mount
        const [{ number: blockNumber, hash: blockHash }, auction] = await Promise.all([
            provider.getBlock('latest'),
            AuctionContract.auction()
        ])

        // Setting block time to 1 min past now prevent players from
        // refreshing the page and passing multiple votes for the
        // current block
        const blockTime = dayjs().subtract(1, 'minute').valueOf();

        const nextNounId = parseInt(auction?.nounId) + 1;
        const auctionEnd = auction?.endTime.toNumber();

        dispatch(setNextNounId(nextNounId));
        dispatch(setAuctionEnd(auctionEnd));
        dispatch(setBlockAttr({ 'blockNumber': blockNumber, 'blockHash': blockHash, 'blockTime': blockTime }));
    }, [dispatch])

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
