import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Configure, InstantSearch, Index } from 'react-instantsearch-dom';
import { CustomHitsModal } from '../Searchpage/Hits';
import { useSelector } from 'react-redux';

export const CarouselHome = () => {
    const searchClient = algoliasearch(window.appID, window.key);
    return (
        <InstantSearch indexName={window.index} searchClient={searchClient}>
            <Configure
                hitsPerPage={8}
                filters="categories.name: 'Gifts for Her'"
                distinct
            />
            <CustomHitsModal />
        </InstantSearch>
    );
};

export const CarouselLowPrice = () => {
    const { persona } = useSelector(state => state.selectedPersona);
    return (
        <Index indexName={window.index} indexId="lowPrice_carousel">
            <Configure ruleContexts="Low_Price" userToken={persona} distinct/>
            <CustomHitsModal />
        </Index>
    );
};

export const CarouselEngagement = () => {
    const { persona } = useSelector(state => state.selectedPersona);
    const searchClient = algoliasearch(window.appID, window.key);
    return (
        <InstantSearch indexName={window.index} searchClient={searchClient}>
            <Configure
                hitsPerPage={8}
                ruleContexts="loveEngagement"
                userToken={persona}
                distinct
            />
            <CustomHitsModal />
        </InstantSearch>
    );
};

export const CarouselNoResults = () => {
    const searchClient = algoliasearch(window.appID, window.key);
    const { persona } = useSelector(state => state.selectedPersona);
    return (
        <InstantSearch indexName={window.index} searchClient={searchClient}>
            <Configure hitsPerPage={8} userToken={persona} distinct/>
            <CustomHitsModal />
        </InstantSearch>
    );
};
