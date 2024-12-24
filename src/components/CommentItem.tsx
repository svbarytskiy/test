import React from 'react';

interface CommentItemProps {
  description: string;
  date: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ description, date }) => {
  return (
    <div className="border-b pb-2 mb-2 bg-blue-400">
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  );
};

export default CommentItem;
