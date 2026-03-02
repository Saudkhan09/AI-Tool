import React from 'react'
import { MdDelete } from "react-icons/md"

const RecentSearch = ({
  recentHistory,
  setSelectedHistory,
  handledelete
}) => {
  return (
    <div className="col-span-1 bg-zinc-800 p-4 text-white overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-center flex-1">
          Recent Search
        </h2>

        <button onClick={handledelete}>
          <MdDelete
            size={20}
            className="text-red-500 cursor-pointer hover:text-red-600"
          />
        </button>
      </div>

      <ul className="text-left overflow-auto text-sm">
        {recentHistory.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelectedHistory(item)}
            className="text-zinc-300 truncate px-2 py-1 cursor-pointer hover:bg-zinc-600"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentSearch