import React, { useEffect, useState } from "react";
import { getActiveAndUpcomingChallenges } from "../apis/challenges";
import { useCookies } from "react-cookie";
import ChallengeCard from "../components/ChallengeCard";

const ChallengeList = () => {
  const [cookies] = useCookies([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const [response, error] = await getActiveAndUpcomingChallenges(cookies.jwt);
      if (error) {
        console.error("Error fetching challenges:", error);
      } else {
        const data = await response.json();
        setActiveChallenges(data.active || []);
        setUpcomingChallenges(data.upcoming || []);
      }
    };

    fetchChallenges();
  }, [cookies.jwt]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Challenges Overview
        </h1>
        {activeChallenges && activeChallenges.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Active Challenges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </>
        )}
        {upcomingChallenges && upcomingChallenges.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mt-12 mb-6">
              Upcoming Challenges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
