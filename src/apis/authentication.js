import { DOMAIN } from "./config"

export const registerApi = async(bodyObject) => {
    console.log("registerapi")
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObject),
    }

    //Make the POST request
    try {
        const response = await fetch(`${DOMAIN}/users`, requestOptions);
        if (response.ok) {
            return [response, `` ]
        }
        if(response.status === 422){
            return ['', `User already exists`]
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`]
      } catch (error) {
        return ['', `Server down: ${error}` ]
      }
}

// export const loginApi = async(bodyObject) => {
//     console.log("Attempting to log in...")
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bodyObject),
//     }

//     //Make the POST request
//     try {
//         const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);
//         if (response.ok) {
//             const data = await response.json(); // Parse the response JSON
//             return [data, ""]; // Return the data and no error message
//         }
//         if(response.status === 401){
//             return ['', `Invalid email or password`]
//         }
//         const errorMessage = await response.text();
//         return ['', `Server side error: ${errorMessage}`]
//       } catch (error) {
//         return ['', `Server down: ${error}` ]
//       }
// }

export const loginApi = async (bodyObject) => {
    console.log("Attempting to log in...");
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObject),
    };

    try {
        const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);

        if (!response.ok) {
            const errorMessage = response.status === 401 
                ? "Invalid email or password" 
                : await response.text(); // Fallback to response text for other errors
            return [null, `Error: ${errorMessage}`];
        }

        // Return the entire response object for further processing
        return [response, null];
    } catch (error) {
        return [null, `Server error: ${error.message}`];
    }
};
    

export const logoutApi = async(jwtToken) => {
    console.log("registerapi")
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken
        },
    }

    //Make the POST request
    try {
        const response = await fetch(`${DOMAIN}/users/sign_out`, requestOptions);
        if (response.ok) {
            return [response, `` ]
        }
        if(response.status === 401){
            return ['', `Invalid email or password`]
        }
        const errorMessage = await response.text();
        return ['', `Server side error: ${errorMessage}`]
      } catch (error) {
        return ['', `Server down: ${error}` ]
      }
}
