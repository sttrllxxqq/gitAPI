const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const userContainer = document.querySelector('.user-container');

searchBtn.addEventListener('click', fetchUserData);
randomBtn.addEventListener('click', fetchRandomUser);

async function fetchUserData() {
    const username = usernameInput.value;
    if (!username) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();

        displayUserData(userData);
    } catch (error) {
        displayError();
    }
}

function displayUserData(userData) {
    userContainer.innerHTML = `
        <img src="${userData.avatar_url}" alt="User Avatar">
        <h2>${userData.login}</h2>
        <p>${userData.bio || 'No bio available'}</p>
        <p>Location: ${userData.location || 'Not specified'}</p>
        <p>Followers: ${userData.followers}</p>
    `;
}

function displayError() {
    userContainer.innerHTML = '<p>User not found or an error occurred.</p>';
}

async function fetchRandomUser() {
    try {
        const response = await fetch('https://api.github.com/users');
        const users = await response.json();

        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        fetchUserData(randomUser.login);
    } catch (error) {
        console.error(error);
    }
}