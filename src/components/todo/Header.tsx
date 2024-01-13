import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyVariant } from "@/lib/utils";
import { EFilter } from "@/types/enums";
import { FC, FormEventHandler } from "react";

type HeaderProps = {
  filter: EFilter;
  onAddTodo: FormEventHandler<HTMLFormElement>;
  onFilterChange: (filter: EFilter) => () => void;
};

const Header: FC<HeaderProps> = ({ filter, onAddTodo, onFilterChange }) => {
  return (
    <>
      <form className="flex mb-4" onSubmit={onAddTodo}>
        <Input
          className="flex-1 mr-2"
          placeholder="New todo"
          name="newTodoTitle"
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="mb-4">
        <Button
          variant={applyVariant(EFilter.ALL, filter)}
          className="mr-2"
          onClick={onFilterChange(EFilter.ALL)}
        >
          All
        </Button>
        <Button
          variant={applyVariant(EFilter.COMPLETED, filter)}
          className="mr-2"
          onClick={onFilterChange(EFilter.COMPLETED)}
        >
          Completed
        </Button>
        <Button
          variant={applyVariant(EFilter.INCOMPLETE, filter)}
          onClick={onFilterChange(EFilter.INCOMPLETE)}
        >
          Incomplete
        </Button>
      </div>
    </>
  );
};

export default Header;
