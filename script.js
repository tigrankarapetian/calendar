window.onload = function () {
	initMonths();
	createYears();
}

let currentDate = new Date();

let WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let MONTHS_DURATIONS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let START_YEAR = 1990;
let END_YEAR = 2020;


//done by following steps in the guide @ http://jszen.blogspot.am/2007/03/how-to-build-simple-calendar-with.html

function Calendar(month, year) {
	this.month = (isNAN(month) || month == null) ? currentDate.getMonth() : month;
	this.year = (isNAN(year) || year == null) ? currentDate.getFullYear() : year;
	this.html = '';
}

Calendar.prototype.generateHTML = function() {
	let firstDay = new Date(this.year, this.month, 1);
	let startingDay = firstDay.getDay();
	let monthLength = MONTHS_DURATIONS[this.month];
	
	if (this.month == 1) {
		if (this.year % 4 === 0 && this.year % 100 != 0 || this.year % 400 === 0) {
			monthLength = 29;
		}
	}
}

// continued



//done during class

let thead = document.getElementsByTagName('thead');

function initMonths() {
	let select = document.getElementsByTagName('select')[0];

	MONTHS.forEach(function(current, index, arr) {
		let option = document.createElement('option');

		option.innerHTML = current;

		select.appendChild(option);
	});
}


function createYears() {
	let select = document.getElementsByTagName('select')[1];

	for (var i = START_YEAR; i <= END_YEAR; i++) {
		let option = document.createElement('option');
		option.innerHTML = i;

		select.appendChild(option);
	}
}

function initPrevButton() {
	let prevButton = document.getElementsByTagName('button')[0];

	prevButton.addEventListener('click', function(index) {
		MONTHS[index] = MONTHS[index - 1];
	});
}

//end

// continuation


function generateRows() {
	let day = 1;
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 6; j++) {
			let tbody = document.getElementsByTagName('tbody');
			let createCell = document.createElement('td');
			
		}
	}
}


