let userData = [];

async function getUserData() {

  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    userData = data
    console.log("Ecco gli utenti:", data);
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  };
};

getUserData();


async function logUserData() {
  
  await getUserData();
  console.log(userData);

  let userCardsHTML = "";

  userData.forEach((user) => {
    userCardsHTML += `
    <div class="user-card-${user.id} js-user-card">
    <p>NAME</p>
    <p>${user.name}</p>
    <p>USERNAME</p>
    <p>${user.username}</p>
    <p>EMAIL</p>
    <p>${user.email}</p>
    <button class="delete-user-button-${user.id}" onclick="deleteUser(${user.id})">Delete User</button>
    </div>
    `;
  });

document.querySelector('.existing-users-box').innerHTML = userCardsHTML;

}

logUserData();

let userId = 10

async function addUserData() {
  let newName = document.querySelector('.name-input-box').value;
  let newEmail = document.querySelector('.email-input-box').value;
  let newPassword = document.querySelector('.username-input-box').value;
  let newId = userData.length
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        id: newId + 1,
        name: newName,
        email: newEmail,
        username: newPassword
      })
    })
    let data1 = await response.json();
    console.log(data1)
    userData.push(data1)
    console.log(userData)
    let userCardsHTML = ""
    userData.forEach((user) => {
      userCardsHTML += `
      <div class="user-card-${newId} js-user-card">
      <p>NAME</p>
      <p>${user.name}</p>
      <p>USERNAME</p>
      <p>${user.username}</p>
      <p>EMAIL</p>
      <p>${user.email}</p>
      <button class="delete-user-button-${user.id}" onclick="deleteUser(${user.id})">Delete User</button>
      </div>
      `;
  })
  document.querySelector('.existing-users-box').innerHTML = userCardsHTML;
  } catch (error) {
    console.error(error)
  }
}

async function deleteUser(userId) {
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully`)
      document.querySelector(`.user-card-${userId}`).remove();
    } else {
      console.log("failed to delete user")
    }
  } catch (error) {
    console.error("Error in the request:", error)
  }
}