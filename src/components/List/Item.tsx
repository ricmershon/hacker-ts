import { Story, Stories } from '../App';

/**
 * Item component
 * 
 * @param {Object} props:
 *      item - story,
 *      onRemoveStory - remove story handler
 * @returns Item component
 */

type ItemProps = {
    item: Story;
    onRemoveStory: (story: Story) => void
};

const Item = ({ item, onRemoveStory }: ItemProps) => (
    <div className='story'>
        <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title} </a>
        </span>
        <span style={{ width: '30%' }}>{item.author} </span>
        <span style={{ width: '10%' }}>{item.num_comments} </span>
        <span style={{ width: '10%' }}>{item.points} </span>
        <span style={{ width: '10%' }}>
            <button
                type='button'
                onClick={() => onRemoveStory(item)}
                className='button button-small'
            >
                Remove
            </button>
        </span>
    </div>
);

export default Item;