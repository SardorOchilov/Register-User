const emailInp = document.querySelector(".email");
const passwordInp = document.querySelector(".password");
const usernameInp = document.querySelector(".username");
const registerBtn = document.querySelector(".register");
const friendlyMsElm = document.querySelector(".friendly-massege");

registerBtn.addEventListener("click", async function register(e) {
	const username = usernameInp.value;
	const email = emailInp.value;
	const password = passwordInp.value;
	const user = {
		username: username,
		email: email,
		password: password,
	};

	const res = await fetch("http://localhost:8000/api/users/register", {
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
		location.assign("http://127.0.0.1:5500/public/login.html");
	}
});
