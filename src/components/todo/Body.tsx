import { Checkbox } from "@radix-ui/react-checkbox";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Body() {
    return <ul className="space-y-2">
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div className="flex items-center space-x-2">
                <Checkbox />
                <span>Buy milk</span>
            </div>
            <Button size="icon" variant="ghost">
                <TrashIcon className="w-6 h-6" />
            </Button>
        </li>
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div className="flex items-center space-x-2">
                <Checkbox />
                <span>Walk the dog</span>
            </div>
            <Button size="icon" variant="ghost">
                <TrashIcon className="w-6 h-6" />
            </Button>
        </li>
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div className="flex items-center space-x-2">
                <Checkbox checked />
                <span className="line-through text-gray-500">Read a book</span>
            </div>
            <Button size="icon" variant="ghost">
                <TrashIcon className="w-6 h-6" />
            </Button>
        </li>
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div className="flex items-center space-x-2">
                <Checkbox checked />
                <span className="line-through text-gray-500">Write a report</span>
            </div>
            <Button size="icon" variant="ghost">
                <TrashIcon className="w-6 h-6" />
            </Button>
        </li>
    </ul>
}
