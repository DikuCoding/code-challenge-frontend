import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getChallengeById } from '../apis/challenges';
import { useCookies } from 'react-cookie';

const Challenge = () => {
  const location = useLocation();
  const [cookies] = useCookies([]);
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const segments = location.pathname.split('/');
    const challengeId = segments[segments.length - 1];
    fetchChallenge(challengeId);
  }, []);

  const fetchChallenge = async (id) => {
    const [result, error] = await getChallengeById(cookies.jwt, id);
    handleResponse([result, error]);
  };

  const handleResponse = async ([response, error]) => {
    if (error) {
      console.error('Error:', error);
    } else {
      const data = await response.json();
      setChallenge(data.data);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-12 bg-gradient-to-br flex justify-center py-2 px-4">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="text-gray-500 font-medium text-lg">Loading challenge details...</div>
        </div>
      ) : challenge ? (
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8">
            <h1 className="text-3xl font-extrabold text-center">{challenge.title}</h1>
          </div>
          {/* Content Section */}
          <div className="p-6 space-y-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              <span className="font-semibold">Description:</span> {challenge.description}
            </p>
            <div className="flex justify-between items-center text-gray-600">
              <p className="text-md">
                <span className="font-medium text-gray-700">Start Date:</span> {challenge.start_date}
              </p>
              <p className="text-md">
                <span className="font-medium text-gray-700">End Date:</span> {challenge.end_date}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 font-medium">Challenge not found.</div>
      )}
    </div>
  );
};

export default Challenge;
