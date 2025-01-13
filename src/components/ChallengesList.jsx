// import React, { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";

// const ChallengesList = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [editingChallenge, setEditingChallenge] = useState(null);
//   const [newChallengeData, setNewChallengeData] = useState({});
//   const [error, setError] = useState("");
//   const [cookies] = useCookies(["jwt"]);

//   const fetchChallenges = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:3000/api/v1/challenges", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${cookies.jwt}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setChallenges(data);
//       } else {
//         const errData = await response.json();
//         setError(errData.message || "Failed to fetch challenges.");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching challenges.");
//     }
//   };

//   useEffect(() => {
//     fetchChallenges();
//   }, [cookies.jwt]);

//   const handleEditClick = (challenge) => {
//     setEditingChallenge(challenge.id);
//     setNewChallengeData({
//       title: challenge.title,
//       description: challenge.description,
//       start_date: challenge.start_date,
//       end_date: challenge.end_date,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setNewChallengeData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdateChallenge = async (id) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:3000/api/v1/challenges/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${cookies.jwt}`,
//           },
//           body: JSON.stringify({ challenge: newChallengeData }),
//         }
//       );

//       if (response.ok) {
//         setEditingChallenge(null);
//         fetchChallenges(); // Refresh the list
//       } else {
//         const errData = await response.json();
//         setError(errData.message || "Failed to update challenge.");
//       }
//     } catch (err) {
//       setError("An error occurred while updating the challenge.");
//     }
//   };

//   const handleDeleteChallenge = async (id) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:3000/api/v1/challenges/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${cookies.jwt}`,
//           },
//         }
//       );

//       if (response.ok) {
//         setChallenges((prevChallenges) =>
//           prevChallenges.filter((challenge) => challenge.id !== id)
//         );
//       } else {
//         const errData = await response.json();
//         setError(errData.message || "Failed to delete challenge.");
//       }
//     } catch (err) {
//       setError("An error occurred while deleting the challenge.");
//     }
//   };

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
//         <div className="text-xl font-semibold">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
//           Explore Challenges
//         </h1>
//         {challenges.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">No challenges found.</p>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {challenges.map((challenge) =>
//               editingChallenge === challenge.id ? (
//                 <div
//                   key={challenge.id}
//                   className="bg-white shadow-lg rounded-xl p-6"
//                 >
//                   <input
//                     type="text"
//                     name="title"
//                     value={newChallengeData.title}
//                     onChange={handleEditChange}
//                     className="w-full mb-3 p-2 border border-gray-300 rounded"
//                     placeholder="Title"
//                   />
//                   <textarea
//                     name="description"
//                     value={newChallengeData.description}
//                     onChange={handleEditChange}
//                     className="w-full mb-3 p-2 border border-gray-300 rounded"
//                     placeholder="Description"
//                   />
//                   <input
//                     type="date"
//                     name="start_date"
//                     value={newChallengeData.start_date}
//                     onChange={handleEditChange}
//                     className="w-full mb-3 p-2 border border-gray-300 rounded"
//                   />
//                   <input
//                     type="date"
//                     name="end_date"
//                     value={newChallengeData.end_date}
//                     onChange={handleEditChange}
//                     className="w-full mb-3 p-2 border border-gray-300 rounded"
//                   />
//                   <button
//                     onClick={() => handleUpdateChallenge(challenge.id)}
//                     className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingChallenge(null)}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div
//                   key={challenge.id}
//                   className="bg-white shadow-lg rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-2xl"
//                 >
//                   <h2 className="text-2xl font-bold text-indigo-600 mb-3">
//                     {challenge.title}
//                   </h2>
//                   <p className="text-gray-600 mb-4">
//                     {challenge.description.length > 100
//                       ? `${challenge.description.slice(0, 100)}...`
//                       : challenge.description}
//                   </p>
//                   <div className="flex justify-between items-center text-sm text-gray-500">
//                     <p>
//                       <span className="font-medium text-gray-800">Start:</span>{" "}
//                       {new Date(challenge.start_date).toLocaleDateString()}
//                     </p>
//                     <p>
//                       <span className="font-medium text-gray-800">End:</span>{" "}
//                       {new Date(challenge.end_date).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="mt-4 flex space-x-3">
//                     <button
//                       onClick={() => handleEditClick(challenge)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteChallenge(challenge.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChallengesList;
import React from 'react'

const ChallengesList = () => {
  return (
    <div>
      
    </div>
  )
}

export default ChallengesList

