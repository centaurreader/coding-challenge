import React from 'react';
import Button from './Button';

export interface ListItem {
  label: string,
  selected: boolean,
  id: string,
}

const PillList: React.FC<{
  list: Array<ListItem>,
  onClick: (item: ListItem) => void,
}> = ({ list, onClick }) => (
  <div className="u-flex u-flex--row">
    {list.map((item) => (
      <div className="u-pr-sm" key={item.id}>
        <Button
          pill={item.selected}
          pillHollow={!item.selected}
          type="button"
          onClick={() => onClick(item)}
        >
          {item.label}
        </Button>
      </div>
    ))}
  </div>
);

export default PillList;
