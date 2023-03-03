const getHole = index => document.getElementById(`hole${index}`);

let countWin = Math.floor(document.getElementById(`dead`).textContent);
let hole;
let lost = Math.floor(document.getElementById(`lost`).textContent);

for (let i = 1; i <= 9; i++) {
	hole = getHole(i);
  hole.onclick = clickHole;
}

function clickHole() {

  //if (hole.className.includes('hole_has-mole')) {
  if (hole.classList.contains('hole_has-mole')) {
  	countWin += 1;
    document.getElementById(`dead`).textContent = countWin;
  } else {
    lost += 1;
    document.getElementById(`lost`).textContent = lost;
  }

  if (countWin === 10) {
    alert("Win");
    countWin = 0;
    document.getElementById(`dead`).textContent = countWin;
    lost = 0;
    document.getElementById(`lost`).textContent = lost;
  }

  if (lost === 5) {
    alert("Game over");
    lost = 0;
    document.getElementById(`lost`).textContent = lost;
    countWin = 0;
    document.getElementById(`dead`).textContent = countWin;
  }

 } 

