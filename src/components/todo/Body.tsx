import { Todo, selectId } from "@/app/todo/model/todo";
import { FC } from "react";
import ListItem from "./TodoItem";

type BodyProps = {
  items: Todo[];
  onToggle: (todo: Todo) => () => void;
  onDelete: (todo: Todo["id"]) => () => void;
};

const Body: FC<BodyProps> = ({ items, onDelete, onToggle }) => {
  const TodoItems = items.map((item) => (
    <ListItem
      key={selectId(item)}
      todo={item}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  ));

  return <ul className="space-y-2">{TodoItems}</ul>;
};

export default Body;
