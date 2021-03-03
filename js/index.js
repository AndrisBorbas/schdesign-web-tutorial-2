const events = JSON.parse(window.localStorage.getItem("events")) ?? [];
console.log(events);
events.forEach((event) => addEventToDom(event));

const portal = document.getElementById("portal");
const addEventDialogBox = document.getElementById("addEventDialogBox");
const editEventDialogBox = document.getElementById("editEventDialogBox");
const addEventForm = document.getElementById("addEventForm");

function openPortal(type, id) {
	portal.style.display = "block";
	if (type == "add") {
		addEventDialogBox.style.display = "block";
		document.getElementById("addEventDay").value =
			id.charAt(0).toUpperCase() + id.slice(1);
	}
	if (type == "edit") {
		editEventDialogBox.style.display = "block";
	}
}

function closePortal() {
	portal.style.display = "none";
	addEventDialogBox.style.display = "none";
	editEventDialogBox.style.display = "none";
}

function dayEventListener(e) {
	console.log(e);
	openPortal("add", e.target.id);
}

function addEventToDom(event) {
	const container = document.createElement("div");
	container.classList.add("event");
	const offset =
		parseInt(event.startTime.split(":")[0]) * 60 +
		parseInt(event.startTime.split(":")[1]);
	const height =
		parseInt(event.endTime.split(":")[0]) * 60 +
		parseInt(event.endTime.split(":")[1]) -
		offset;
	container.style.top = `${offset}px`;
	container.style.height = `${height < 36 ? 36 : height}px`;

	const title = document.createElement("h4");
	title.innerHTML = event.name;
	title.classList.add("eventTitle");
	title.style.webkitLineClamp = `${parseInt(height / 13)}`;
	container.appendChild(title);

	const time = document.createElement("p");
	time.innerHTML = `${event.startTime}-${event.endTime}`;
	time.classList.add("eventTime");
	container.appendChild(time);

	document.getElementById(event.day).appendChild(container);

	container.addEventListener("click", (e) => {
		e.stopPropagation();
	});
}

function submitAddEventForm(e) {
	e.preventDefault();
	console.log(e);
	console.log(addEventForm.elements.addEventStartTime.value);

	const event = {
		name: addEventForm.elements.addEventName.value,
		day: addEventForm.elements.addEventDay.value.toLowerCase(),
		startTime: addEventForm.elements.addEventStartTime.value,
		endTime: addEventForm.elements.addEventEndTime.value,
	};
	events.push(event);
	window.localStorage.setItem("events", JSON.stringify(events));

	addEventToDom(event);

	closePortal();
}

function addSeparators() {
	const dayTimes = document.getElementsByClassName("dayTimes")[0];
	const container = document.createElement("div");

	for (let i = 0; i < 23; i++) {
		const line = document.createElement("hr");
		line.classList.add("line");
		line.style.top = `${60 * i + 120}px`;
		container.appendChild(line);
	}
	dayTimes.appendChild(container);
}

function addClickListeners() {
	const days = document.getElementsByClassName("dayEvents");
	console.log(days);
	Array.from(days).forEach((day) => {
		day.addEventListener("click", dayEventListener);
	});

	portal.addEventListener("click", () => {
		closePortal();
	});
	addEventDialogBox.addEventListener("click", (e) => {
		e.stopPropagation();
	});
	editEventDialogBox.addEventListener("click", (e) => {
		e.stopPropagation();
	});

	addEventForm.addEventListener("submit", submitAddEventForm);
}

addClickListeners();
addSeparators();
