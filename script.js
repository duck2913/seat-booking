const seatsContainer = document.querySelector(".seats");
const total = document.querySelector(".total");
const countEl = document.querySelector(".count");
const movieSelect = document.querySelector("#movie-select");
const bookingEl = document.querySelector(".booking");

let count = 0;
let totalPrice = 0;
let price = 10; // default when we load the page is avenger movie with price 10

movieSelect.addEventListener("input", function (e) {
	price = +e.target.value;
	updatePurchase();
});

seatsContainer.addEventListener("click", function (e) {
	const selectedSeat = e.target.closest(".seat");
	if (!selectedSeat || selectedSeat.classList.contains("occupied")) return;
	selectedSeat.classList.toggle("selected");
	updatePurchase();
});

const updatePurchase = function () {
	count = document.querySelectorAll(".booking .selected").length;
	total.innerText = `${price * count}`;
	countEl.innerHTML = `${count}`;
};

//implement local storage
