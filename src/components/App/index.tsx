import './App.css';
import React, {
    useEffect,
    useState,
    useRef,
    useReducer,
    useCallback
} from 'react';
import axios from 'axios';

import SearchForm from '../SearchForm';
import List from '../List';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export type Story = {
    objectID: string,
    url: string,
    title: string,
    author: string,
    num_comments: string,
    points: number
};

export type Stories = Array<Story>;

type StoriesState = {
    data: Stories;
    isLoading: boolean;
    isError: boolean;
};

interface StoriesFetchInitaction {
    type: 'STORIES_FETCH_INIT';
};

interface StoriesFetchSuccessAction {
    type: 'STORIES_FETCH_SUCCESS';
    payload: Stories;
};

interface StoriesFetchFailureAction {
    type: 'STORIES_FETCH_FAILURE';
};

interface StoriesRemoveAction {
    type: 'REMOVE_STORY';
    payload: Story;
};

type StoriesAction =
    | StoriesFetchInitaction
    | StoriesFetchSuccessAction
    | StoriesFetchFailureAction
    | StoriesRemoveAction;

/**
 * @function storiesReducer
 * Returns new stories state object depending on action.
 * 
 * @param {Object} state - current state
 * @param {Object} action - object containing type and payload
 * @returns new state object
 */
const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter((story) => (
                    action.payload.objectID !== story.objectID
                ))
            }
        default:
            throw new Error();
    }
}

/**
 * @function useSemiPersistentState
 * Creates a semi-persitent state for local storage given a key and its
 * initial state. Returns a value and setter for the key.
 * 
 * @param {string} key 
 * @param {string} initialState 
 * @returns {[string, string]} [value, setValue]
 */
const useSemiPersistentState = (
    key: string, initialState: string
): [string, (newValue: string) => void] => {
    const isMounted = useRef(false);
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    );

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            console.log('A');
            localStorage.setItem(key, value);
        }
    }, [value, key]);

    return [value, setValue]
};

/**
 * App component
 * Entry point for application.
 * 
 * @returns App component
 */
const App = () => {
    const [searchTerm, setSearchTerm] = useSemiPersistentState(
        'search',
        'React'
    );

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        { data: [], isLoading: false, isError: false});

    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

    /**
     * @function
     * handleFetchStories - memoized callback function to fetch data based
     * on the searchTerm.
     */
    const handleFetchStories = useCallback(async () => {
        if (!searchTerm) {
            return;
        }

        dispatchStories({ type: 'STORIES_FETCH_INIT' });

        try {
            const result = await axios.get(url);
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits
            });
        } catch {
            dispatchStories(
                { type: 'STORIES_FETCH_FAILURE' }
            )
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    // Load async data
    useEffect(() => {
        handleFetchStories()
    }, [handleFetchStories]);
 
    const handleSearchInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (
        event: React.ChangeEvent<HTMLFormElement>
    ) => {
        setUrl(`${API_ENDPOINT}${searchTerm}`);
        event.preventDefault();
    }

    const handleRemoveStory = useCallback((item: Story) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        });
    }, []);

    console.log('B:App');

    // const sumComments = useMemo(() => 
    //     getSumComments(stories),
    //     [stories]
    // );

    return (
        <div className='container'>
            <h1 className='headling-primary'>
                Hacker Stories.
            </h1>

            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />
            &nbsp;


            <p>
                Searching for {searchTerm}
            </p>

            <hr />
            
            {stories.isError && <p>Something went wrong...</p>}

            {stories.isLoading ? (
                <p>Loading...</p>
            ) : (
                <List
                    list={stories.data}
                    onRemoveStory={handleRemoveStory}
                />
            )}
        </div>
    );
};






export default App;
