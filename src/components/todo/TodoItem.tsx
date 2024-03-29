import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import * as todoM from "@/app/todo/model/todo";

type ListItemProps = {
  todo: todoM.Todo;
  onDelete: (todo: todoM.Todo["id"]) => any;
  onToggle: (todo: todoM.Todo) => any;
};

const ListItem: FC<ListItemProps> = ({ todo, onDelete, onToggle }) => {
  const id = todoM.selectId(todo);
  const title = todoM.selectTitle(todo);
  const completed = todoM.selectCompleted(todo);

  return (
    <li className="dark:text-gray-900 flex items-center justify-between p-2 bg-gray-100 rounded">
      <div
        role="button"
        onKeyDown={onToggle(todo)}
        tabIndex={0}
        className="flex items-center space-x-2"
        onClick={onToggle(todo)}
      >
        <Checkbox checked={completed} />
        <span className={cn(completed && "line-through text-gray-500")}>
          {title}
        </span>
      </div>
      <Button
        aria-label="Delete"
        size="icon"
        variant="ghost"
        onClick={onDelete(id)}
      >
        <TrashIcon className="w-6 h-6" />
      </Button>
    </li>
  );
};

export default ListItem;
