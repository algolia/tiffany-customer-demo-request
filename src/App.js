import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { VoiceSearch } from 'react-instantsearch-dom';

//CSS / SCSS

import './SCSS/index.scss';

// Assets
import img1 from './Assets/Images/img1.png';

//COMPONENTS
import Header from './Components/Header/Header';
import SearchResults from './Components/Searchpage/SearchResult';
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    const searchClient = algoliasearch(window.appID, window.key);
    return (
        <div>
            <InstantSearch searchClient={searchClient} indexName={window.index}>
                <div className="home__images">
                    <img src={img1} alt="home" />
                </div>
                <Header />
                <SearchResults />
                <Homepage />
            </InstantSearch>
        </div>
    );
};

export default App;
