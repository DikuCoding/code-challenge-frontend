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