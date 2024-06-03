const axios = require('axios').default;

/**
 * Fetches all users from a remote API.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of users.
 */
async function fetchAllUsers() {
  const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return users;
}

/**
 * Fetches a user by their ID from a remote API.
 * @async
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the user data.
 */
async function fetchUserById(userId) {
  const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return user;
}

module.exports = { fetchAllUsers, fetchUserById };
