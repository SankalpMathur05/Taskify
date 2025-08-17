import React from 'react';

const Progress = ({ progress, status }) => {
    const getColor = () => {
        switch (status) {
        case 'In Progress':
            return 'text-[#fdc700] bg-[#fdc700]/70 border border-[#fdc700]/50'

        case 'Completed':
            return 'text-[#05df72] bg-[#05df72]/60 border border-[#05df72]/20'

        default:
            return 'text-[#ff6467] bg-[#ff6467]/70 border border-[#ff6467]/10'
        }
    }

    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{ width: `${progress}%` }} />
        </div>
    )
};

export default Progress;
