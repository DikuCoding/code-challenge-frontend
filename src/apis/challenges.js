import { DOMAIN } from "./config"



export const addChallenge = async(jwtToken, bodyObject) => {
    console.log("registerapi")
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        },
        body: JSON.stringify(bodyObject),
    }

    //Make the POST request
    try {
        const response = await fetch(`${DOMAIN}/api/v1/challenges`, requestOptions);
        if (response.ok) {
            return [response, `` ]
        }
        if(response.status === 401){
            return ['', `Unauthorized user, cannot add challenge`]
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`]
      } catch (error) {
        return ['', `Server down: ${error}` ]
      }
}

export const getActiveAndUpcomingChallenges = async(jwtToken) => {
    console.log("registerapi")
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        }
    }

    //Make the POST request
    try {
        const response = await fetch(`${DOMAIN}/api/v1/challenges/active_and_upcoming`, requestOptions);
        if (response.ok) {
            return [response, `` ]
        }
        if(response.status === 401){
            return ['', `Unauthorized user, cannot add challenge`]
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`]
      } catch (error) {
        return ['', `Server down: ${error}` ]
      }
}

export const getChallengeById = async(jwtToken, id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        }
    }

    //Make the POST request
    try {
        const response = await fetch(`${DOMAIN}/api/v1/challenges/${id}`, requestOptions);
        if (response.ok) {
            return [response, `` ]
        }
        if(response.status === 401){
            return ['', `Unauthorized user, cannot add challenge`]
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`]
      } catch (error) {
        return ['', `Server down: ${error}` ]
      }
}

// updateChallenge.js
export const updateChallenge = async (jwtToken, id, bodyObject) => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken,
      },
      body: JSON.stringify(bodyObject),
    };
  
    try {
      const response = await fetch(`${DOMAIN}/api/v1/challenges/${id}`, requestOptions);
      if (response.ok) {
        return [response, ``];
      }
      const errorMessage = await response.text();
      return ['', `Server side error: ${errorMessage}`];
    } catch (error) {
      return ['', `Server down: ${error}`];
    }
  };

  // deleteChallenge.js
export const deleteChallenge = async (jwtToken, id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtToken,
      },
    };
  
    try {
      const response = await fetch(`${DOMAIN}/api/v1/challenges/${id}`, requestOptions);
      if (response.ok) {
        return [response, ``];
      }
      const errorMessage = await response.text();
      return ['', `Server side error: ${errorMessage}`];
    } catch (error) {
      return ['', `Server down: ${error}`];
    }
  };

  export const fetchAdminEmail = async () => {
    const response = await fetch('/api/v1/challenges/admin_email');
    const data = await response.json();
    return data.admin_email;
  };
  
  export const fetchChallenges = async (cookies) => {
    const [response, error] = await getActiveAndUpcomingChallenges(cookies.jwt);
    if (error) {
      console.error("Error fetching challenges:", error);
    } else {
      const data = await response.json();
      return data
      // setActiveChallenges(data.active || []);
      // setUpcomingChallenges(data.upcoming || []);
    }
  };