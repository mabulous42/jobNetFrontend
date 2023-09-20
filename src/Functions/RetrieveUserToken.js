// Function to retrieve the user token from localStorage
const retrieveUserToken = () => {
    try {
        // Attempt to retrieve the user token from localStorage
        let userToken = JSON.parse(localStorage.getItem("token"))
        // const token = localStorage.getItem("userToken");

        // If the token is found in localStorage, return it
        if (userToken) {
            return Promise.resolve(userToken);
        } else {
            // If the token is not found, you can return null or an empty string
            return Promise.resolve(null);
        }
    } catch (error) {
        // Handle any errors that may occur during retrieval
        return Promise.reject(error);
    }
};

export default retrieveUserToken;
