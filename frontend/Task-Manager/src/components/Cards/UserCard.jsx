import React, { useState } from 'react';
import { X } from "lucide-react";
import DeleteUserAlert from '../DeleteUserAlert';
import Modal from '../Modal';

const DEFAULT_AVATAR = "https://tinyurl.com/defaultUserImageTaskManagerApp";

const UserCard = ({ userInfo, onRemove }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  return (
    <div className="user-card p-2 relative border rounded-xl shadow bg-white">
      {/* Remove Button */}
      <button
        onClick={() => setOpenDeleteAlert(true)} // ✅ open modal instead of direct delete
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <X size={16} />
      </button>

      {/* Confirm Delete User Modal */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete User"
      >
        <DeleteUserAlert
          content="Are you sure you want to delete this user?"
          onDelete={() => {
            onRemove(userInfo._id || userInfo.id); // ✅ call parent delete fn
            setOpenDeleteAlert(false);
          }}
        />
      </Modal>

      <div className="flex items-center gap-3">
        <img
          src={userInfo?.profileImageUrl || DEFAULT_AVATAR}
          alt={'Avatar'}
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
        <div>
          <p className="text-sm font-medium">{userInfo?.name}</p>
          <p className="text-xs text-gray-500">{userInfo?.email}</p>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;


const StatCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-[#fdc700] bg-gray-50";
      case "Completed":
        return "text-[#05df72] bg-gray-50";
      default:
        return "text-[#ff6467] bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[10px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded `}
    >
      <span className="text-[12px] font-semibold">{count}</span> <br /> {label}
    </div>
  );
};
