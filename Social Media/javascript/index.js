// SIDEBAR

const menuToggle = document.querySelector(".menu-toggle");
const menuItems = document.querySelectorAll(".menu-item");

let toggle_menu = false;

// TOGGLE THE SIDE MENU

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

	console.log("Yes it clicked: " + toggle_menu);
});

// REMOVE ACTIVE CLASS FOR ALL THE MENUS ITEMS
const changeActiveItems = () => {
	menuItems.forEach((item) => {
		item.classList.remove("active");
	});
};

menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		changeActiveItems();
		item.classList.add("active");

		if (item.id != "notifications") {
			document.querySelector(".notifications-popup").style.display = "none";
		}
	});
});
