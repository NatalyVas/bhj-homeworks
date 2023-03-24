function findOfChildren(obj) {
	let children = [];
	let first = obj.firstElementChild;
	while (first) {
		children.push(first);
		first = first.nextElementSibling;
	}
	return children;
}

let ch = findOfChildren(document.querySelector(`ul`));
findEvent(ch);

function findParent(obj) {
	let parent = null;
	if (obj.closest(`ul`) != null) {
		if (obj.closest(`ul`).closest(`li`) != null) {
			parent = obj.closest(`ul`).closest(`li`).querySelector(`.interest__check`);
		}
	}
	return parent;
}

function findBrothers(obj) {
	let parent = obj.closest(`ul`);
	let brothers = findOfChildren(parent);
	return brothers;
}

function findEvent(obj) {
	for (let kid of obj) {
		if (kid.tagName === `LABEL`) {
			let checkbox = kid.querySelector(`.interest__check`);
			checkbox.addEventListener(`change`, () => {
				let checkboxIn = checkbox.closest(`li`).querySelectorAll(`.interest__check`);
				for (let into of checkboxIn) {
					into.checked = checkbox.checked;
				}
				let parent = findParent(checkbox);
				if (parent != null) {
					let sister = findBrothers(checkbox);

					parent.indeterminate = true;

					let flag = true;
					for (let i = 0; i < sister.length - 1; i++) {
						if (sister[i].querySelector(`.interest__check`).checked != sister[i+1].querySelector(`.interest__check`).checked) {
							flag = false;
						}
					}
					if (flag) {
						parent.indeterminate = false;
						parent.checked = sister[0].querySelector(`.interest__check`).checked;
					}
				}

			});
		} else {
			let find = findOfChildren(kid);
			findEvent(find);
		}
	}
}

