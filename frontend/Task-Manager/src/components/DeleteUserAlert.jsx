import React from 'react'

const DeleteUserAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace:nowrap bg-rose-50 rounded-lg px-4 py-2 border border-rose-100 cursor-pointer"
          onClick={onDelete}
        >
          Delete User
        </button>
      </div>
    </div>
  )
}

export default DeleteUserAlert