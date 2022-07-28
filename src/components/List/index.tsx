import { Story, Stories } from '../App';
import Item from './Item';

/**
 * List component
 * 
 * @param {Object} props:
 *      list - list of stories,
 *      onRemoveStory - remove story handler
 * @returns List component
 */

type ListProps = {
    list: Stories;
    onRemoveStory: (story: Story) => void
};

const List = ({ list, onRemoveStory }: ListProps) => (
    <>
        {list.map((item: Story) => (
            <Item
                key={item.objectID}
                item={item}
                onRemoveStory={onRemoveStory}
            />
        ))}
    </>
);

export default List;