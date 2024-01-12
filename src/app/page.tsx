/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/jsEiL0r4EyG
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <form className="flex mb-4">
          <Input className="flex-1 mr-2" placeholder="New todo" />
          <Button type="submit">Add</Button>
        </form>
        <div className="mb-4">
          <Button className="mr-2">All</Button>
          <Button className="mr-2">Completed</Button>
          <Button>Incomplete</Button>
        </div>
        <ul className="space-y-2">
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
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You have
            <span className="font-medium">2</span> pending tasks, out of <span className="font-medium">4</span>
            tasks.
          </p>
          <Button className="mt-2">Clear Completed</Button>
        </div>
      </div>
    </main>
  )
}


function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2v2" />
    </svg>
  )
}
