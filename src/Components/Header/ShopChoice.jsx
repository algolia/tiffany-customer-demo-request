import React from 'react';
import { useDispatch } from 'react-redux';
import { connectMenu } from 'react-instantsearch-dom';
import { selectShop } from '../../actions/selectShop';

const MenuSelect = ({ items, currentRefinement, refine, searchForItems }) => {
    console.log('items', items);
    const dispatch = useDispatch();
    return (
        <select
            value={currentRefinement || ''}
            onChange={event => {
                refine(event.currentTarget.value);
                dispatch(selectShop(event.currentTarget.value));
            }}
            className="shopSelection"
        >
            <option value="">Shop by location</option>
            <input
                type="search"
                onChange={event => searchForItems(event.currentTarget.value)}
            />
            {items.map(item => (
                <>
                    <option
                        key={item.label}
                        value={item.isRefined ? currentRefinement : item.value}
                    >
                        {item.label}
                    </option>
                </>
            ))}
        </select>
    );
};

const ShopDropdown = connectMenu(MenuSelect);

const ShopChoice = () => {
    return (
        <ShopDropdown
            attribute="storeName"
            limit={150}
            sortBy="label:asc"
            searchable={true}
        />
    );
};

export default ShopChoice;
