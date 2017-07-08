window.onload = function () {
	initMonths();
	createYears();
	initPrevButton();
// 	listenMonths();
	var cal = new Calendar(currentMonth, currentYear);
	listenMonths();
	cal.generateHTML();
	cal.fillTheRows();
	
	
}


//globals

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let MONTHS_DURATIONS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let START_YEAR = 1990;
let END_YEAR = 2020;

let thead = document.getElementsByTagName('thead');

// Header

function initMonths() {
	let select = document.getElementsByTagName('select')[0];
	MONTHS.forEach(function(current, index, arr) {
		let option = document.createElement('option');
		option.setAttribute('value', index);
		option.innerHTML = current;
		
		if (index === currentMonth) {
			option.setAttribute('selected', 'selected');
		}

		select.appendChild(option);
	});
}

// Months event listener
function listenMonths() {
	let select = document.getElementById('months');//('select')[0]; //getElementById('months');
/*
	select.onchange = changeEventHandler('change');
	
	function changeEventHandler(event) {
		currentMonth = this.value; // event.target.value;
	}
*/
	console.log(select);
	select.addEventListener('change', function() {
		currentMonth = this.value;
		let cal = new Calendar(currentMonth, currentYear);
		cal.clearRows();
		cal.fillTheRows();
	})
	
	
}



function createYears() {
	let select = document.getElementsByTagName('select')[1];

	for (var i = START_YEAR; i <= END_YEAR; i++) {
		let option = document.createElement('option');
		option.setAttribute('value', i);
		option.innerHTML = i;
		
		if (i === currentYear) {
			option.setAttribute('selected', 'selected');
		}
		
		select.appendChild(option);
	}
}

function initPrevButton() {
	let prevButton = document.getElementsByTagName('button')[0];

	prevButton.addEventListener('click', function(index) {
		MONTHS[index] = MONTHS[index - 1];
	});
}



// body

function Calendar(month, year) {
	this.month = (isNaN(month) || month == null) ? currentDate.getMonth() : month;
	this.year = (isNaN(year) || year == null) ? currentDate.getFullYear() : year;
	
	let firstDay = new Date(year, month, 0);
	let startingDay = firstDay.getDay();
	let monthLength = MONTHS_DURATIONS[month];
		
	this.generateHTML = function() {
		if (this.month == 1) {
			if (this.year % 4 === 0 && this.year % 100 != 0 || this.year % 400 === 0) {
				monthLength = 29;
			}
		}
		
		function getWeekdayNames() {
			let createRow = document.createElement('tr');
			createRow.setAttribute('id', 'weekdayNames');
			let thead = document.getElementsByTagName('thead')[0];
			thead.appendChild(createRow);
			let weekdayRow = document.getElementById('weekdayNames');
			for (let i = 0; i <= 6; i++) {
				let createCell = document.createElement('td');
				createCell.innerHTML = WEEK_DAYS[i];
				weekdayRow.appendChild(createCell);
			}
		}
		
		getWeekdayNames();
		
		function generateRows() {
			
			let tbody = document.getElementById('tableBody');
			//rows or weeks
			let condition = (startingDay >= 4) ? 6 : 5;
			for (let i = 0; i < condition; i++) {
				let createRow = document.createElement('tr');
				createRow.setAttribute('id', 'row' + i);
				tbody.appendChild(createRow);
				//columns or weekdays
				for (let j = 0; j <= 6; j++) { 
					let createCell = document.createElement('td');
					createCell.setAttribute('id', 'cell' + i + j);
					let currentRow = document.getElementById('row' + i);						
					currentRow.appendChild(createCell);
				}
			}
		}
		generateRows();
	}
	
	this.fillTheRows = function() {
		let day = 1;
		
		//rows
		let condition = (startingDay >= 4) ? 6 : 5;
		for (let i = 0; i < condition; i++) {
			
			if (i === 5  && !document.getElementById('row' + i)) {
				let sundayOfThe5thWeek = document.getElementById('cell' + 4 + 6);
				if (sundayOfThe5thWeek.innerHTML < monthLength) {
					let createRow = document.createElement('tr');
					createRow.setAttribute('id', 'row' + 5);
					for (let k = 0; k <= 6; k++) {
						createCell = document.createElement('td');
						createCell.setAttribute('id', 'cell' + 5 + k);
						createRow.appendChild(createCell);
					}
					let tbody = document.getElementById('tableBody');
					tbody.appendChild(createRow);
				}
			}
			//columns or weekdays
			let j = i === 0 ? startingDay : 0;
			for (j; j <= 6; j++) {
				if (day <= monthLength) {
					let currentRow = document.getElementById('row' + i);
					let currentCell = document.getElementById('cell' + i + j);
					currentCell.innerHTML = day;
					if (day === monthLength && currentRow.nextSibling) {
						currentRow.nextSibling.remove();						
					}
					day++;
				}
				
				if (day > monthLength) {
					break;
				}
			}
		}
	}
	
	this.clearRows = function() {
		let monthLength = MONTHS_DURATIONS[month];
		
		for (let i = 0; i < 6; i++) {
			//columns or weekdays
			for (let j = 0; j <= 6; j++) {
				let currentRow = document.getElementById('row' + i);
				let currentCell = document.getElementById('cell' + i + j);
				if(!currentCell) {
                    break;
                }
				currentCell.innerHTML = '';
			}
		}
	}
}











