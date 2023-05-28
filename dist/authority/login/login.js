const emailInp = document.querySelector(".email");
const passwordInp = document.querySelector(".password");
const loginBtn = document.querySelector(".login");
const friendlyMsElm = document.querySelector(".friendly-massege");

loginBtn.addEventListener("click", async function login(e) {
  const email = emailInp.value;
  const password = passwordInp.value;
  const user = {
    email: email,
    password: password,
  };

  const res = await fetch("http://localhost:8000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();

  if (!res.ok) {
    friendlyMsElm.textContent = data.message;
    friendlyMsElm.classList.remove("displayNone");
  } else {
    location.assign("http://127.0.0.1:5500/public/products.html");
  }
});
