// SIDEBAR

const menuToggle = document.querySelector(".menu-toggle");
const menuItems = document.querySelectorAll(".menu-item");

let toggle_menu = false;

//MESSAGES
const messsageNotifications = document.querySelector("#notification-message");
const message = document.querySelectorAll(".messages .message");
const messageSearch = document.querySelector("#message-search");

let toggle_notification = false;

//THEME

// ---------------------------- TOGGLE THE SIDE MENU -------------------------------------

menuToggle.addEventListener("click", () => {
	if (!toggle_menu) {
		document.querySelector(".side-bar").style.display = "none";
		document.querySelector("main .container").style.gridTemplateColumns =
			"0 auto";
		toggle_menu = true;
	} else {
		document.querySelector("main .container").style.gridTemplateColumns =
			"0 auto 5rem";
		document.querySelector(".side-bar").style.display = "block";
		toggle_menu = false;
	}

	// console.log("Yes it clicked: " + toggle_menu);
});

// ------------------REMOVE ACTIVE CLASS FOR ALL THE MENUS ITEMS ------------------------

function changeActiveItems() {
	menuItems.forEach((item) => {
		item.classList.remove("active");
	});
}

menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		changeActiveItems();
		item.classList.add("active");

		if (item.id != "notifications") {
			document.querySelector(".notifications-popup").style.display = "none";
		} else if (screen.width <= 992) {
			document.querySelector("main .container .right").style.display = "none";
			if (!toggle_notification) {
				document.querySelector(".notifications-popup").style.display = "block";
				document.querySelector(
					".side-bar i .notification-count"
				).style.display = "none";
				toggle_notification = true;
			} else {
				document.querySelector(".notifications-popup").style.display = "none";
				changeActiveItems();
				toggle_notification = false;
			}
		} else {
			if (!toggle_notification) {
				document.querySelector(".notifications-popup").style.display = "block";
				document.querySelector(
					".side-bar i .notification-count"
				).style.display = "none";
				toggle_notification = true;
			} else {
				document.querySelector(".notifications-popup").style.display = "none";
				changeActiveItems();
				toggle_notification = false;
			}
		}
	});
});

//------------------------ MESSAGE NOTIFICATION ---------------------------------------

// ------------- highlight message --------------------------
messsageNotifications.addEventListener("click", () => {
	document.querySelector("main .container .right").style.display = "block";
	document.querySelector(".right .messages").style.boxShadow =
		"0 0 1rem var(--color-primary)";
	setTimeout(() => {
		document.querySelector(".right .messages").style.boxShadow = "none";
	}, 500);
});

// ------------- message search -------------------------------

function searchMessage() {
	const val = messageSearch.value.toLowerCase();
	// console.log(val);
	message.forEach((chat) => {
		let name = chat.querySelector("h4").textContent.toLowerCase();
		if (name.indexOf(val) != -1) {
			chat.style.display = "flex";
		} else {
			chat.style.display = "none";
		}
	});
}

messageSearch.addEventListener("keyup", searchMessage);
