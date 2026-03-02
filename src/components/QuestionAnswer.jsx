import Answer from './Answer'
import { MdMoreVert, MdDelete } from "react-icons/md"
import { useState } from 'react'

const QuestionAnswer = ({ item, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  if (item.type === 'q') {
    return (
      <li className="ml-auto my-3 max-w-[70%] bg-zinc-300 dark:bg-zinc-700 rounded-3xl px-4 py-3 text-right w-fit">
        <p className="text-zinc-900 dark:text-white font-semibold">
          {item.text}
        </p>
      </li>
    )
  }

  return (
    <li className="mr-auto my-2 relative">
      <Answer ans={item.text} />
      {/* Three-dot menu for delete */}
      <div className="absolute top-0 right-0">
        <div className="relative inline-block">
          <MdMoreVert
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-zinc-800 border rounded shadow-lg z-10">
              <button
                onClick={onDelete}
                className="flex items-center w-full px-2 py-1 text-sm hover:bg-red-100 dark:hover:bg-red-600 text-red-600 dark:text-red-400"
              >
                <MdDelete className="mr-1" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default QuestionAnswer