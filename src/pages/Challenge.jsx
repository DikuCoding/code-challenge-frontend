import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getActiveAndUpcomingChallenges, getChallengeById } from '../apis/challenges';
import { useCookies } from 'react-cookie';

const Challenge = () => {
  const location = useLocation();
  const [cookies] = useCookies([]);
  const [challenge, setChallenge] = useState(null);

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
      // TODO: handle error
      console.error('Error:', error);
    } else {
      const data = await response.json();
      setChallenge(data.data);
    }
  };

  return (
    <div className="min-h-auto bg-gray-50 flex justify-center items-center p-6">
      {challenge ? (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 text-center">{challenge.title}</h1>
          <p className="text-lg text-gray-600 text-justify">{challenge.description}</p>
        </div>
      ) : (
        <div className="text-gray-600 font-medium">Loading challenge details...</div>
      )}
    </div>
  );
};

export default Challenge;
