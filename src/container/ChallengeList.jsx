import React, { useEffect, useState } from "react";
import { getActiveAndUpcomingChallenges, fetchAdminEmail } from "../apis/challenges";
import { useCookies } from "react-cookie";
import ChallengeCard from "../components/ChallengeCard";
import subscribeToNotifications from "../channels/notificationsChannel";


const ChallengeList = () => {
  const [cookies] = useCookies([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [upcomingChallenges, setUpcomingChallenges] = useState([]);
  const [notification, setNotification] = useState(null);


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
  useEffect(() => {

    fetchChallenges();

     // Subscribe to WebSocket for notifications
      subscribeToNotifications((data) => {
      setNotification(data);
    });
  }, [cookies.jwt]);

  console.log(notification)
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Challenges Overview
        </h1>

        {notification && (
          <div className="p-4 mb-4 text-white bg-green-500 rounded">
            New Challenge Added: {notification.title}
          </div>
        )}
        {activeChallenges && activeChallenges.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Active Challenges
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} setActiveChallenges={setActiveChallenges} setUpcomingChallenges={setUpcomingChallenges}/>
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
                <ChallengeCard key={challenge.id} challenge={challenge} setActiveChallenges={setActiveChallenges} setUpcomingChallenges={setUpcomingChallenges}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
