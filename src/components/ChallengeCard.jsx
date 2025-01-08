import React from 'react';
import { formatDate } from '../utilities/date';
import { Link, useHistory } from 'react-router-dom';

const ChallengeCard = ({ challenge }) => {
  const history = useHistory();
  const dateText = () => {
    const startDate = new Date(challenge.start_date);
    const endDate = new Date(challenge.end_date);
    const currentDate = new Date();

    if (startDate > currentDate) {
      // Future challenge
      return (
        <p className="font-medium text-green-600">
          {`Start Date: ${formatDate(startDate)}`}
        </p>
      );
    } else if (startDate < currentDate && endDate > currentDate) {
      // Active challenge
      return (
        <p className="font-medium text-blue-600">
          {`Start Date: ${formatDate(startDate)}`}
        </p>
      );
    } else {
      return (
        <p className="font-medium text-gray-600">
          {`Start Date: ${formatDate(startDate)}`}
        </p>
      );
    }
  };

  return (
    <Link to={`/challenge/${challenge.id}`}>
    <div className="flex flex-col border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src={challenge.image || "https://via.placeholder.com/400"}
        alt={challenge.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 truncate ellipsis">
          {challenge.title}
        </h3>
        {dateText()}
        <p className="text-gray-600 text-sm">{challenge.description || 'No description provided.'}</p>
      </div>
    </div>
    </Link>
  );
};

export default ChallengeCard;
