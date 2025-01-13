import React, { useEffect, useState } from 'react';
import { formatDate } from '../utilities/date';
import { Link, useNavigate } from 'react-router-dom';
import { deleteChallenge } from "../apis/challenges";
import { useCookies } from "react-cookie";
import { fetchChallenges } from '../apis/challenges';

const ChallengeCard = ({ challenge, setActiveChallenges, setUpcomingChallenges}) => {
  const [cookies] = useCookies(["jwt"]);
  const [user_cookie] = useCookies(["user"]);
  // const user = JSON.parse(user_cookie);
  const [adminEmail, setAdminEmail] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminEmail = async () => {
      const response = await fetch('/api/v1/admin_email');
      const data = await response.json();
      setAdminEmail(data.admin_email);
    };

    const fetchUserEmail = async () => {
      const userResponse = await fetch('/api/v1/current_user', {
        headers: { Authorization: `Bearer ${cookies.jwt}` }
      });
      const userData = await userResponse.json();
      setCurrentUserEmail(userData.email);
    };

    fetchAdminEmail();
    fetchUserEmail();
  }, [cookies.jwt]);

  const dateText = () => {
    const startDate = new Date(challenge.start_date);
    const currentDate = new Date();

    if (startDate > currentDate) {
      return (
        <p className="text-lg font-medium text-emerald-500">
          {`Start Date: ${formatDate(startDate)}`}
        </p>
      );
    } else {
      return (
        <p className="text-lg font-medium text-sky-500">
          {`Start Date: ${formatDate(startDate)}`}
        </p>
      );
    }
  };

  const handleEditClick = () => {
    console.log("CLicked on edit button")
    navigate(`/edit-challenge/${challenge.id}`);
  };

  const handleDelete = async () => {
    console.log("first Delete")
    const [response, error] = await deleteChallenge(cookies.jwt, challenge.id);
    if (error) {
      console.error(error);
    } else {
      
    }
    navigate('/');
    console.log("last Delete")
    let data = await fetchChallenges(cookies);
    // console.log(data);
    
    setActiveChallenges(data.active)
    setUpcomingChallenges(data.upcoming)
    // window.location.windreload(); // Refresh the page
  };

  return (
    <div className="relative bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* <img
        src={challenge.image || "https://via.placeholder.com/400"}
        alt={challenge.title}
        className="w-full h-48 object-cover rounded-t-lg"
      /> */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {challenge.title}
        </h3>
        {dateText()}
        <p className="text-gray-700 text-sm mb-3">
          {challenge.description || 'No description provided.'}
        </p>

        <Link to={`/challenge/${challenge.id}`}>
          <button className="px-4 py-2 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 transition duration-200">
            View Details
          </button>
        </Link>
                  {   console.log("ROle",user_cookie.user.role)}
        {user_cookie.user.role === "admin" && (
        
          <div className="mt-4 flex space-x-3">
           <button
              // disabled={user_cookie.role !== "admin"}
              onClick={handleEditClick}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm text-red-600 border  rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
