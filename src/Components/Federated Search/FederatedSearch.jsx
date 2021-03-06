import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ALGOLIA IMPORT
import {
    Configure,
    Index,
    connectQueryRules,
    connectStateResults
} from 'react-instantsearch-dom';

// COMPONENT IMPORT
import { CustomHits } from '../Searchpage/Hits';
import CustomSuggestions from '../Searchpage/Suggestions';
import { CarouselHome } from '../Homepage/Carousel';
// import RecipesSearch from './RecipesSearch';
import {
    federatedSearchVisible,
    searchVisible
} from '../../actions/visibility';
import { getQuery } from '../../actions/getQuery';

const FederatedSearch = () => {
    // const { persona } = useSelector(state => state.selectedPersona);
    const dispatch = useDispatch();
    const { shop } = useSelector(state => state.selectShop);
    const { query } = useSelector(state => state.getQuery);
    return (
        <div className="federatedSearch">
            <div className="federatedSearch-wrapper">
                <div className="federatedSearch-recentSearches">
                    <RecentSearches />
                    <ContentInjected />
                    {/* {query ? (
                        <div className="recipes-content">
                            <RecipesSearch />
                        </div>
                    ) : (
                        ''
                    )} */}
                </div>

                <div className="federatedSearch-products">
                    <div className="product-federated-header">
                        <ResultsTitle>
                            <h3 className="federated-title">Products</h3>
                        </ResultsTitle>
                    </div>
                    <Configure
                        hitsPerPage={6}
                        // userToken={persona}
                        // filters={shop ? `shop_availability:'${shop}'` : ''}
                    />
                    <Results>
                        <CustomHits />
                    </Results>
                </div>
                <div className="federatedSearch-suggestions">
                    <ResultsTitle>
                        <h3>Suggestions</h3>
                    </ResultsTitle>
                    <Index indexName={window.indexSugg} indexId="suggestions">
                        <Configure
                            hitsPerPage={6}
                            // userToken={persona}
                        />
                        <CustomSuggestions />
                    </Index>
                </div>
            </div>
            <div className="close-tag">
                <p
                    onClick={() => {
                        dispatch(federatedSearchVisible(false));
                    }}
                >
                    X
                </p>
            </div>
        </div>
    );
};

const RecentSearches = () => {
    const dispatch = useDispatch();
    const getSearches = localStorage.getItem('recentSearches');
    const cleanSearches = JSON.parse(getSearches);
    if (cleanSearches) {
        return (
            <>
                <h3 className="federated-title">Recent Searches</h3>
                <div className="federatedSearch-recentSearches_items">
                    {cleanSearches.map((search, index) => {
                        return (
                            <p
                                onClick={e => {
                                    dispatch(getQuery(search));
                                    dispatch(searchVisible(true));
                                    dispatch(federatedSearchVisible(false));
                                }}
                                key={index}
                            >
                                {search}
                            </p>
                        );
                    })}
                </div>
            </>
        );
    } else {
        return '';
    }
};

const InjectedContent = ({ items }) => {
    return (
        <div className="injectedContent__wrapper">
            {items.map(({ button, image, target, value }) => {
                if (button) {
                    return (
                        <div className="injected-content">
                            <img src={image} alt={value} />
                            <h3>{value}</h3>
                            <a href={target} target="_blank">
                                {button}
                            </a>
                        </div>
                    );
                }
            })}
        </div>
    );
};

const ContentInjected = connectQueryRules(InjectedContent);

const Results = connectStateResults(
    ({ searchState, searchResults, children }) =>
        searchResults && searchResults.nbHits !== 0 ? (
            children
        ) : (
            <div className="no-results-hits">
                <h3>NO RESULTS FOUND for {searchState.query}.</h3>
                <p>You can look at our product suggestion below </p>
                <CarouselHome />
            </div>
        )
);

const ResultsTitle = connectStateResults(({ searchResults, children }) =>
    searchResults && searchResults.nbHits !== 0 ? children : ''
);

export default FederatedSearch;
