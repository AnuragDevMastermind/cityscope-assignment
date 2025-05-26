import React, { useEffect, useState } from 'react';

interface Props {
  selectedBadge?: string
  onClick: (postType: string) => void;
}

const SelectFilterBadge: React.FC<Props> = ({ onClick, selectedBadge }) => {

  const handleBadgeClick = (badge: string) => {
    onClick(badge)
  }

  return (
    <>
      <p className="font-medium text-lg text-txt-3 mt-7 mb-3">Select Badge</p>
      <div className="flex gap-3">
        <div onClick={() => handleBadgeClick('recommend')} className={`cursor-pointer w-fit font-bold px-3 py-1 rounded-md text-xs ${(selectedBadge === 'recommend') ? "bg-primary text-white" : "bg-foreground-2 text-black"}`}>
          Recommend a place
        </div>
        <div onClick={() => handleBadgeClick('ask')} className={`cursor-pointer w-fit font-bold px-3 py-1 rounded-md text-xs ${(selectedBadge === 'ask') ? "bg-primary text-white" : "bg-foreground-2 text-black"}`}>
          Ask for help
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <div onClick={() => handleBadgeClick('update')} className={`cursor-pointer w-fit font-bold px-3 py-1 rounded-md text-xs ${(selectedBadge === 'update') ? "bg-primary text-white" : "bg-foreground-2 text-black"}`}>
          Share a local update
        </div>
        <div onClick={() => handleBadgeClick('event')} className={`cursor-pointer w-fit font-bold px-3 py-1 rounded-md text-xs ${(selectedBadge === 'event') ? "bg-primary text-white" : "bg-foreground-2 text-black"}`}>
          Event announcement
        </div>
      </div>
    </>
  );
};

export default SelectFilterBadge;
