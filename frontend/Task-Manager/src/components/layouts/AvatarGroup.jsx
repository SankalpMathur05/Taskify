import React from 'react';

const DEFAULT_AVATAR = "https://tinyurl.com/defaultUserImageTaskManagerApp";

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar || DEFAULT_AVATAR}
          alt={`Avatar ${index}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop
            e.target.src = DEFAULT_AVATAR;
          }}
        />
      ))}

      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
