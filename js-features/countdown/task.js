let time = `00:00:${document.getElementById('timer').textContent}`
timer.textContent = time;

let parts = time.split(':');

let intervalId = setInterval(() => {	
 	parts[2] -= 1;	 	
 	parts[2] = String(parts[2]).padStart(2, `0`);

 	timer.textContent = `00:00:${parts[2]}`;

	if (parts[2] === "00") {
		alert("Вы победили в конкурсе!");
		clearInterval(intervalId);
		window.location.href = "https://www.google.com/";
	}
 }, 1000);

