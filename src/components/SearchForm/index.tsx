import React from 'react';

import InputWithLabel from '../InputWithLabel';

/**
 * SearchForm component
 * 
 * @param {Object} props:
 *      searchTerm - term for search,
 *      onSearchInput - input handler,
 *      onSearchSubmit - submit handler
 * @returns SearchForm component
 */

type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit
}: SearchFormProps) => (
    <form onSubmit={onSearchSubmit} className='search-form'>
        <InputWithLabel
            id='search'
            value={searchTerm}
            isFocused={true}
            onInputChange={onSearchInput}
        >
            <strong>Search:</strong>
        </InputWithLabel>
        &nbsp;
        <button
            type='submit'
            disabled={!searchTerm}
            className='button button-large'
        >
            Submit
        </button>
    </form>
);

export default SearchForm;