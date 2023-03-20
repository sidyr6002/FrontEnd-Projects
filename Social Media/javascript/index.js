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
const theme = document.querySelector("#notification-theme");
const themeModal = document.querySelector(".customize-theme");
const themeCard = document.querySelector(".customize-theme .card");

const fontSizes = document.querySelectorAll(
	".customize-theme .font-size .choose-size span"
);
const colors = document.querySelectorAll(
	".customize-theme .color .choose-color span"
);
const bg1 = document.querySelector(
	".customize-theme .background .choose-bg .bg-1"
);
const bg2 = document.querySelector(
	".customize-theme .background .choose-bg .bg-2"
);
const bg3 = document.querySelector(
	".customize-theme .background .choose-bg .bg-3"
);

var root = document.querySelector(":root");

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

//------------------------ THEME CUSTOMISATION ---------------------------------------

theme.addEventListener("click", () => {
	themeModal.style.display = "grid";
	console.log("Notification-theme is clicked");
});

themeModal.addEventListener("click", function (ev) {
	if (ev.target.classList.contains("customize-theme")) {
		themeModal.style.display = "none";
		console.log("Outside the card");
	}
});

// themeCard.addEventListener(
// 	"click",
// 	function (ev) {
// 		console.log("Inside the card");
// 		ev.stopPropagation();
// 	},
// 	false
// );

//------------------ Font Size -----------------------------

function removeActiveFont() {
	fontSizes.forEach((font) => {
		font.classList.remove("active");
	});
}

fontSizes.forEach((size) => {
	size.addEventListener("click", function () {
		removeActiveFont();
		size.classList.add("active");

		let fontSize;

		if (size.classList.contains("font-size-1")) {
			fontSize = "10px";
			console.log("f-size 1");
		} else if (size.classList.contains("font-size-2")) {
			fontSize = "11.5px";
			console.log("f-size 2");
		} else if (size.classList.contains("font-size-3")) {
			fontSize = "12.5px";
			console.log("f-size 3");
		} else if (size.classList.contains("font-size-4")) {
			fontSize = "14px";
			console.log("f-size 4");
		} else if (size.classList.contains("font-size-5")) {
			fontSize = "16px";
			console.log("f-size 5");
		}

		//change the font size of html root
		document.querySelector("html").style.fontSize = fontSize;
	});
});

//------------------ Color -----------------------------

function removeActiveColor() {
	colors.forEach((color) => {
		color.classList.remove("active");
	});
}

colors.forEach((color) => {
	color.addEventListener("click", function () {
		removeActiveColor();
		color.classList.add("active");
		let primaryHue;

		if (color.classList.contains("color-1")) {
			primaryHue = 252;
			console.log("color-1");
		} else if (color.classList.contains("color-2")) {
			primaryHue = 52;
			console.log("color-2");
		} else if (color.classList.contains("color-3")) {
			primaryHue = 352;
			console.log("color-3");
		} else if (color.classList.contains("color-4")) {
			primaryHue = 152;
			console.log("color-4");
		} else if (color.classList.contains("color-5")) {
			primaryHue = 202;
			console.log("color-5");
		}

		root.style.setProperty("--primary-color-hue", primaryHue);
	});
});

//------------------ Background -----------------------------

let whiteColorLightness;
let lightColorLightness;
let darkColorLightness;

function changeBG() {
	root.style.setProperty("--white-color-lightness", whiteColorLightness);
	root.style.setProperty("--light-color-lightness", lightColorLightness);
	root.style.setProperty("--dark-color-lightness", darkColorLightness);
}

bg1.addEventListener("click", function () {
	whiteColorLightness = "100%";
	lightColorLightness = "95%";
	darkColorLightness = "17%";

	document
		.querySelectorAll(".request .action .btn-reject")
		.forEach((reject) => {
			reject.style.color = "black";
		});

	document.querySelector(".customize-theme .font-size > div").style.color =
		"var(--color-black)";

	bg1.classList.add("active");
	bg2.classList.remove("active");
	bg3.classList.remove("active");

	changeBG();
});

bg2.addEventListener("click", function () {
	whiteColorLightness = "20%";
	lightColorLightness = "15%";
	darkColorLightness = "95%";

	document
		.querySelectorAll(".request .action .btn-reject")
		.forEach((reject) => {
			reject.style.color = "white";
		});

	document.querySelector(".customize-theme .font-size > div").style.color =
		"white";

	bg2.classList.add("active");
	bg1.classList.remove("active");
	bg3.classList.remove("active");

	changeBG();
});

bg3.addEventListener("click", function () {
	whiteColorLightness = "10%";
	lightColorLightness = "0%";
	darkColorLightness = "95%";

	document
		.querySelectorAll(".request .action .btn-reject")
		.forEach((reject) => {
			reject.style.color = "white";
		});

	document.querySelector(".customize-theme .font-size > div").style.color =
		"white";

	bg3.classList.add("active");
	bg1.classList.remove("active");
	bg2.classList.remove("active");

	changeBG();
});
