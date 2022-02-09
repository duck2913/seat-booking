const seatsContainer = document.querySelector(".seats");
const seats = document.querySelectorAll(".booking .seat:not(.occupied)");
const total = document.querySelector(".total");
const countEl = document.querySelector(".count");
const movieSelectBox = document.querySelector("#movie-select");
const bookingEl = document.querySelector(".booking");

let count = 0;
let totalPrice = 0;
let price;

movieSelectBox.addEventListener("input", function (e) {
	price = +e.target.value;
	const movieIndex = e.target.selectedIndex;
	localStorage.setItem("movieIndex", movieIndex);
	localStorage.setItem("price", price);
	updatePurchase();
});

seatsContainer.addEventListener("click", function (e) {
	const selectedSeat = e.target.closest(".seat");
	if (!selectedSeat || selectedSeat.classList.contains("occupied")) return;
	selectedSeat.classList.toggle("selected");
	updatePurchase();
});

const updatePurchase = function () {
	const selectedSeats = document.querySelectorAll(".booking .selected");
	const selectedIndexes = [...selectedSeats].map((seat) => [...seats].indexOf(seat)); // index of each selected seat
	// set the indexes of selected seats into local storage
	localStorage.setItem("indexes", JSON.stringify(selectedIndexes));
	count = selectedSeats.length;
	total.innerText = `${price * count}`;
	countEl.innerHTML = `${count}`;
};

const loadUI = function () {
	const selectedIndexes = JSON.parse(localStorage.getItem("indexes"));
	console.log("🚀 -> selectedIndexes", selectedIndexes);
	seats.forEach((seat, index) => {
		if (selectedIndexes?.length > 0 && selectedIndexes.indexOf(index) > -1) {
			seat.classList.add("selected");
		}
	});
	// load the already selected movie from the local storage
	const movieIndex = localStorage.getItem("movieIndex");
	movieSelectBox.selectedIndex = movieIndex;
	price = localStorage.getItem("price");
	updatePurchase();
};

//load UI when on load
loadUI();
