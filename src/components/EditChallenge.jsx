import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChallengeById, updateChallenge } from "../apis/challenges";
import { useCookies } from "react-cookie";

const EditChallenge = () => {
  const [cookies] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchChallenge = async () => {
      const [response, error] = await getChallengeById(cookies.jwt, id);
      if (error) {
        console.error(error);
      } else {
        const data = await response.json();
        setTitle(data.data.title);
        setDescription(data.data.description);
        setStartDate(data.data.start_date);
        setEndDate(data.data.end_date);
      }
    };

    fetchChallenge();
  }, [cookies.jwt, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [response, error] = await updateChallenge(cookies.jwt, id, {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
    });

    if (error) {
      console.error(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Edit Challenge
        </h1>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-1"
            >
              Challenge Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter challenge title"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Challenge Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter challenge description"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Start Date Input */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-medium mb-1"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* End Date Input */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-gray-700 font-medium mb-1"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Update Challenge
        </button>
      </form>
    </div>
  );
};

export default EditChallenge;
