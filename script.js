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
    <p>Name</p>
    <p>${user.name}</p>
    <p>Username</p>
    <p>${user.username}</p>
    <p>Email</p>
    <p>${user.email}</p>
    </div>
    `;
  });

document.querySelector('.existing-users-box').innerHTML = userCardsHTML;

}

logUserData()