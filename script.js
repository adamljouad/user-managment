let userData = [];

async function getUserData() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json();
    userData = data;
    console.log("Ecco gli utenti:", data);
    renderUsers();
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
}

function renderUsers() {
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

async function addUserData() {
  let newName = document.querySelector('.name-input-box').value;
  let newEmail = document.querySelector('.email-input-box').value;
  let newUsername = document.querySelector('.username-input-box').value;

  if (!newName || !newEmail || !newUsername) {
    alert("Per favore, compila tutti i campi!");
    return;
  }

  let newId = userData.length + 1;

  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: newId,
        name: newName,
        email: newEmail,
        username: newUsername
      })
    });

    let newUser = await response.json();
    userData.push(newUser);
    renderUsers();

    document.querySelector('.name-input-box').value = '';
    document.querySelector('.email-input-box').value = '';
    document.querySelector('.username-input-box').value = '';

  } catch (error) {
    console.error("Errore nell'aggiunta dell'utente:", error);
  }
}

async function deleteUser(userId) {
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully`);

      userData = userData.filter(user => user.id !== userId);
      renderUsers(); 
    } else {
      console.log("Failed to delete user");
    }
  } catch (error) {
    console.error("Error in the request:", error);
  }
}

getUserData();
