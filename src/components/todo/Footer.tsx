import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {" "}
        You have <span className="font-medium">2</span> pending tasks, out of{" "}
        <span className="font-medium"> 4</span> tasks.
      </p>
      <Button className="mt-2">Clear Completed</Button>
    </div>
  );
}
