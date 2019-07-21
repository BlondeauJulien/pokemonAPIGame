class UI {
	constructor() {
		this.resultIsDisplayed = false;
		this.ableToChangeCard = true;
		this.fightSpeed = 1000;
	}

	landingDisplayNone() {
		document.querySelector('.landing').style.display = 'none';
	}

	createPlayerName() {
		let playerName = document.querySelector('.player-name');
		let inputName = document.querySelector('.input-name').value;
		if (inputName === '') {
			playerName.innerText = 'Ash';
		} else {
			playerName.innerText = inputName;
		}
	}

	start(e) {
		ui.landingDisplayNone();
		ui.createPlayerName();
		ui.createPokemonPlayer();
		ui.enemyPokemon();
		ui.uncheckCheckboxes();
		ui.savedPlayerInfo();

		e.preventDefault();
	}

	savedPlayerInfo() {
		let playerName = document.querySelector('.player-name').innerText;
		if (localStorage.getItem(playerName) === null) {
			let globalScores = {
				globalPlayerScore: 0,
				globalEnemyScore: 0
			};
			localStorage.setItem(playerName, JSON.stringify(globalScores));
		} else {
			let globalScores = JSON.parse(localStorage.getItem(playerName));
			document.querySelector('.global-score-player').innerText = globalScores.globalPlayerScore;
			document.querySelector('.global-score-enemy').innerText = globalScores.globalEnemyScore;
		}
	}

	uncheckCheckboxes() {
		let checkboxes = document.querySelectorAll('input[type=checkbox]');

		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});
	}

	clickabled() {
		if (ui.ableToChangeCard === true) {
			let checkboxes = document.querySelectorAll('input[type=checkbox]');
			for (let i = 0; i < checkboxes.length; i++) {
				if (i == this.id.replace('card', '')) {
					if (checkboxes[i].checked === false) {
						checkboxes[i].checked = true;
						this.style.opacity = '0.75';
					} else {
						checkboxes[i].checked = false;
						this.style.opacity = '1';
					}
				}
			}
		}
	}

	speedSetting(e) {
		let speedSettingElements = document.querySelector('.speed-setting').children;

		for (let i = 0; i < speedSettingElements.length; i++) {
			speedSettingElements[i].style['font-weight'] = 'normal';
		}

		if (e.target.className === 'slow-speed') {
			e.target.style['font-weight'] = 'bold';
			ui.fightSpeed = 2000;
		} else if (e.target.className === 'normal-speed') {
			e.target.style['font-weight'] = 'bold';
			ui.fightSpeed = 1000;
		} else if (e.target.className === 'fast-speed') {
			e.target.style['font-weight'] = 'bold';
			ui.fightSpeed = 500;
		} else if (e.target.className === 'instant-speed') {
			e.target.style['font-weight'] = 'bold';
			ui.fightSpeed = 1;
		}
	}

	async createPokemonPlayer() {
		for (let i = 0; i < 5; i++) {
			let random = Math.floor(Math.random() * 151);
			let randomPokemon = await pokemon.getPokemon(random);

			let cardsContainer = document.querySelector('.cards-pick');

			// card creation

			let card = document.createElement('div');
			card.className = 'card';
			card.id = 'card' + i;
			card.setAttribute('draggable', false);
			card.addEventListener('click', ui.clickabled);
			cardsContainer.append(card);

			let health = document.createElement('p');
			health.className = 'health-point';
			health.innerText = `HP: ${randomPokemon.stats[5].base_stat}`;
			card.append(health);

			let imgContainer = document.createElement('div');
			let img = document.createElement('img');
			imgContainer.className = 'img-card-container';
			img.setAttribute('draggable', false);
			img.src = `${randomPokemon.sprites.front_default}`;
			card.append(imgContainer);
			imgContainer.append(img);

			let cardInfo = document.createElement('div');
			cardInfo.className = 'info-card-container';
			card.append(cardInfo);

			let name = document.createElement('p');
			name.className = 'name';
			name.innerText = `Name: ${randomPokemon.name}`;
			cardInfo.append(name);

			let weight = document.createElement('p');
			weight.className = 'weight';
			weight.innerText = `Weight: ${randomPokemon.weight}`;
			cardInfo.append(weight);

			let speed = document.createElement('p');
			speed.className = 'speed';
			speed.innerText = `Speed: ${randomPokemon.stats[0].base_stat}`;
			cardInfo.append(speed);

			let attack = document.createElement('p');
			attack.className = 'attack';
			attack.innerText = `Attack: ${randomPokemon.stats[2].base_stat}`;
			cardInfo.append(attack);

			let defense = document.createElement('p');
			defense.className = 'defense';
			defense.innerText = `Defense: ${randomPokemon.stats[1].base_stat}`;
			cardInfo.append(defense);

			let pokemonType = document.createElement('div');
			pokemonType.className = 'pokemon-type';
			card.append(pokemonType);

			// Get all pokemon types
			for (let y = 0; y < randomPokemon.types.length; y++) {
				pokemonType.innerHTML += `<div>${randomPokemon.types[y].type.name}</div>`;
			}

			let checkbox = document.getElementsByClassName('checkbox-content');
			let checkboxContent = checkbox[i]; // doublou avec celui du gros comment

			checkboxContent.innerText = `Change ${randomPokemon.name}?`;
		}
	}

	change() {
		let checkbox = document.querySelectorAll('input[type=checkbox]');

		ui.cardAreDraggable();

		ui.deleteCheckboxContainer();
		for (let i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked) {
				ui.changePokemon(i);
			}
		}

		ui.ableToChangeCard = false;
	}

	///////////////  Drag event functions

	cardAreDraggable() {
		let cards = document.getElementsByClassName('card');
		let pokemonDropDiv = document.querySelector('.drop-box');
		let playerPokemonContainer = document.querySelector('.cards-pick');

		for (const card of cards) {
			card.setAttribute('draggable', true);
			card.addEventListener('dragstart', ui.dragStart);
			card.addEventListener('dragend', ui.dragEnd);
		}

		pokemonDropDiv.addEventListener('dragover', ui.dragOver);
		pokemonDropDiv.addEventListener('dragenter', ui.dragEnter);
		pokemonDropDiv.addEventListener('drop', ui.dragDrop);
		playerPokemonContainer.addEventListener('dragover', ui.dragOver);
		playerPokemonContainer.addEventListener('dragenter', ui.dragEnter);
		playerPokemonContainer.addEventListener('drop', ui.dragDrop);
	}

	dragStart(e) {
		dragged = e.target;

		if (this.parentElement.className === 'drop-box') {
			this.parentElement.style.border = '#2f3e75 1px dashed';
		}

		e.dataTransfer.setData('text', '');
		setTimeout(() => (this.className = 'invisible'), 0); // 'this' here refere to the original 'fill'. When we drag we create a duplicate so if we don't hide the original there will be two elements showing
	}

	dragEnd() {
		this.className = 'card';
		if (this.parentElement.className === 'drop-box') {
			this.parentElement.style.border = 'none';
		}
	}

	dragOver(e) {
		e.preventDefault(); // else the drop function don't show
	}

	dragEnter(e) {
		e.preventDefault();
	}

	dragDrop(e) {
		this.append(dragged);
		ui.checkIfCardDropContIsFilled();
	}

	////////// End drag event functions

	async changePokemon(cardNumber) {
		let cards = document.getElementsByClassName('card');
		let random = Math.floor(Math.random() * 151);
		let randomPokemon = await pokemon.getPokemon(random);
		let card = cards[cardNumber];

		card.children[0].innerText = `HP: ${randomPokemon.stats[5].base_stat}`;
		card.children[1].firstElementChild.src = `${randomPokemon.sprites.front_default}`;
		card.children[2].children[0].innerText = `Name: ${randomPokemon.name}`;
		card.children[2].children[1].innerText = `Weight: ${randomPokemon.weight}`;
		card.children[2].children[2].innerText = `Speed: ${randomPokemon.stats[0].base_stat}`;
		card.children[2].children[3].innerText = `Attack: ${randomPokemon.stats[2].base_stat}`;
		card.children[2].children[4].innerText = `Defense: ${randomPokemon.stats[1].base_stat}`;

		// Get all pokemon types
		card.children[3].innerHTML = '';
		for (let y = 0; y < randomPokemon.types.length; y++) {
			card.children[3].innerHTML += `<div>${randomPokemon.types[y].type.name}</div>`;
		}

		//Make all player cards dragable
		for (let i = 0; i < cards.length; i++) {
			cards[i].setAttribute('draggable', true);
		}

		card.style.opacity = '1';
	}

	async enemyPokemon() {
		let card = document.querySelector('.enemy-card');
		let random = Math.floor(Math.random() * 151);
		let randomPokemon = await pokemon.getPokemon(random);

		card.children[0].innerText = `HP: ${randomPokemon.stats[5].base_stat}`;
		card.children[1].firstElementChild.src = `${randomPokemon.sprites.front_default}`;
		card.children[2].children[0].innerText = `Name: ${randomPokemon.name}`;
		card.children[2].children[1].innerText = `Weight: ${randomPokemon.weight}`;
		card.children[2].children[2].innerText = `Speed: ${randomPokemon.stats[0].base_stat}`;
		card.children[2].children[3].innerText = `Attack: ${randomPokemon.stats[2].base_stat}`;
		card.children[2].children[4].innerText = `Defense: ${randomPokemon.stats[1].base_stat}`;

		// Get all pokemon types
		card.children[3].innerHTML = '';
		for (let y = 0; y < randomPokemon.types.length; y++) {
			card.children[3].innerHTML += `<div class="type">${randomPokemon.types[y].type.name}</div>`;
		}
	}

	deleteCheckboxContainer() {
		let enemyPokName = document.querySelector('.enemy-card').querySelector('.name').innerText.replace('Name: ', '');

		let checkBoxDiv = document.querySelector('.change-radio-buttons-container');
		for (let i = 0; i < checkBoxDiv.children.length; i++) {
			checkBoxDiv.children[i].style.display = 'none';
		}

		document.querySelector('.change').style.display = 'none';

		document.querySelector('h3').innerText = `Drag the pokemon you want to fight against ${enemyPokName} in the left (dotted) box below`;
	}

	checkIfCardDropContIsFilled() {
		let pokemonDropDiv = document.querySelector('.drop-box');
		let playerPokemonContainer = document.querySelector('.cards-pick');
		let cardsStillInContainer = playerPokemonContainer.children;

		if (pokemonDropDiv.firstChild) {
			for (const card of cardsStillInContainer) {
				card.setAttribute('draggable', false);
			}
		} else if (!pokemonDropDiv.firstChild) {
			for (const card of cardsStillInContainer) {
				card.setAttribute('draggable', true);
			}
		}
	}

	startFight() {
		let pokemonDropDiv = document.querySelector('.drop-box');

		if (!pokemonDropDiv.firstChild) {
			alert('You need to drag a card in the dotted container');
		} else {
			let enemyCard = document.querySelector('.enemy-card');
			let playerPokemonContainer = document.querySelector('.cards-pick');

			document.querySelector('.fight-button').className = 'invisible';
			pokemonDropDiv.firstChild.setAttribute('draggable', false);

			let fightInfoDiv = document.querySelector('.fight-info');

			// +++-+-+-+-+-+-+   PLAYER POKEMON STATS And Name +-+-+-+-+-+-+-+++ \\

			let namePlayerPok = pokemonDropDiv.firstChild.querySelector('.name').innerText.replace('Name: ', '');
			let scorePlayer = document.querySelector('.score-player');
			let healthPlayerPok = parseFloat(
				pokemonDropDiv.firstChild.querySelector('.health-point').innerText.replace('HP: ', '')
			);
			let speedPlayerPok = parseFloat(
				pokemonDropDiv.firstChild.querySelector('.speed').innerText.replace('Speed: ', '')
			);
			let attackPlayerPok = parseFloat(
				pokemonDropDiv.firstChild.querySelector('.attack').innerText.replace('Attack: ', '')
			);
			let defensePlayerPok = parseFloat(
				pokemonDropDiv.firstChild.querySelector('.defense').innerText.replace('Defense: ', '')
			);

			// Get all player Pokemn Typetype
			let typesPlayerPokArr = [];
			let typesPlayerPok = pokemonDropDiv.firstChild.lastElementChild.children;

			for (let i = 0; i < typesPlayerPok.length; i++) {
				typesPlayerPokArr.push(typesPlayerPok[i].innerText);
			}

			// +++-+-+-+-+-+-+   Enemy POKEMON STATS And Name and score+-+-+-+-+-+-+-+++ \\

			let nameEnemyPok = enemyCard.querySelector('.name').innerText.replace('Name: ', '');
			let scoreEnemy = document.querySelector('.score-enemy');
			let healthEnemyPok = parseFloat(enemyCard.querySelector('.health-point').innerText.replace('HP: ', ''));
			let speedEnemyPok = parseFloat(enemyCard.querySelector('.speed').innerText.replace('Speed: ', ''));
			let attackEnemyPok = parseFloat(enemyCard.querySelector('.attack').innerText.replace('Attack: ', ''));
			let defenseEnemyPok = parseFloat(enemyCard.querySelector('.defense').innerText.replace('Defense: ', ''));

			// Get all Enemy Pokemon Types
			let typesEnemyPokArr = [];
			let typesEnemyPok = enemyCard.lastElementChild.children;

			for (let i = 0; i < typesEnemyPok.length; i++) {
				typesEnemyPokArr.push(typesEnemyPok[i].innerText);
			}

			// **************** Fight ******************

			if (speedPlayerPok >= speedEnemyPok) {
				playerAttack();
			} else {
				EnemyAttack();
			}

			function playerAttack() {
				setTimeout(function() {
					if (healthPlayerPok <= 0) {
						fightEnd();
					} else {
						let randomBonus = Math.random() * 10;
						let defense = 0;
						if (defenseEnemyPok < 20) {
							defense;
						} else if (defenseEnemyPok >= 20 && defenseEnemyPok < 40) {
							defense = 0.5;
						} else if (defenseEnemyPok >= 40 && defenseEnemyPok < 60) {
							defense = 1;
						} else if (defenseEnemyPok >= 60 && defenseEnemyPok < 80) {
							defense = 1.5;
						} else if (defenseEnemyPok >= 80 && defenseEnemyPok < 100) {
							defense = 2;
						} else if (defenseEnemyPok > 100) {
							defense = 2.5;
						}

						let damage = attackPlayerPok * 0.06 - defense + randomBonus;

						let p = document.createElement('p');
						p.className = 'fight-player-attack-text';
						if (damage <= 0 || randomBonus <= 0.5) {
							p.innerText = `${namePlayerPok} missed his attack on ${nameEnemyPok}`;
							fightInfoDiv.prepend(p);
						} else {
							p.innerText = `${namePlayerPok} give ${damage.toFixed(2)} damage to ${nameEnemyPok}`;
							fightInfoDiv.prepend(p);

							healthEnemyPok -= damage;
							healthEnemyPok < 0
								? (enemyCard.querySelector('.health-point').innerText = `HP: 0`)
								: (enemyCard.querySelector('.health-point').innerText = `HP: ${healthEnemyPok.toFixed(2)}`);
						}

						EnemyAttack();
					}
				}, ui.fightSpeed);
			}

			function EnemyAttack() {
				setTimeout(function() {
					if (healthEnemyPok <= 0) {
						fightEnd();
					} else {
						let randomBonus = Math.random() * 10;
						let defense = 0;
						if (defensePlayerPok < 20) {
							defense;
						} else if (defensePlayerPok >= 20 && defensePlayerPok < 40) {
							defense = 0.5;
						} else if (defensePlayerPok >= 40 && defensePlayerPok < 60) {
							defense = 1;
						} else if (defensePlayerPok >= 60 && defensePlayerPok < 80) {
							defense = 1.5;
						} else if (defensePlayerPok >= 80 && defensePlayerPok < 100) {
							defense = 2;
						} else if (defensePlayerPok > 100) {
							defense = 2.5;
						}

						let damage = attackEnemyPok * 0.06 - defense + randomBonus;

						let p = document.createElement('p');
						p.className = 'fight-enemy-attack-text';
						if (damage <= 0 || randomBonus <= 0.5) {
							p.innerText = `${nameEnemyPok} missed his attack on ${namePlayerPok}`;
							fightInfoDiv.prepend(p);
						} else {
							p.innerText = `${nameEnemyPok} give ${damage.toFixed(2)} damage to ${namePlayerPok}`;
							fightInfoDiv.prepend(p);

							healthPlayerPok -= damage;
							healthPlayerPok < 0
								? (pokemonDropDiv.firstChild.querySelector('.health-point').innerText = `HP: 0`)
								: (pokemonDropDiv.firstChild.querySelector('.health-point').innerText = `HP: ${healthPlayerPok.toFixed(2)}`);
						}

						playerAttack();
					}
				}, ui.fightSpeed);
			}

			function fightEnd() {
				let buttonsFightContainer = document.querySelector('.button-fight-event-container');
				if (healthPlayerPok <= 0) {
					console.log('fini');

					let p = document.createElement('p');
					p.className = 'fight-ended-text';
					p.innerText = `${nameEnemyPok} defeated ${namePlayerPok} YOU LOST this fight!`;
					fightInfoDiv.prepend(p);

					scoreEnemy.innerText = parseFloat(scoreEnemy.innerText) + 1;
				} else if (healthEnemyPok <= 0) {
					console.log('fini');

					let p = document.createElement('p');
					p.className = 'fight-ended-text';
					p.innerText = `${namePlayerPok} is victorious: YOU WON this fight!`;
					fightInfoDiv.prepend(p);

					scorePlayer.innerText = parseFloat(scorePlayer.innerText) + 1;
				}

				if ((scorePlayer.innerText == 3 || scoreEnemy.innerText == 3) && ui.resultIsDisplayed === false) {
					let playerName = document.querySelector('.player-name').innerText;

					let finalResultText = document.createElement('p');
					if (scorePlayer.innerText == 3) {
						let globalPlayerScore = document.querySelector('.global-score-player');

						finalResultText.className = 'final-victory';
						finalResultText.innerText = `${playerName} WON the match`;
						globalPlayerScore.innerText = parseFloat(globalPlayerScore.innerText) + 1;

						let savedScores = JSON.parse(localStorage.getItem(playerName));
						savedScores.globalPlayerScore = parseFloat(savedScores.globalPlayerScore) + 1;
						localStorage.setItem(playerName, JSON.stringify(savedScores));
					} else {
						let globalEnemyScore = document.querySelector('.global-score-enemy');

						finalResultText.className = 'final-defeat';
						finalResultText.innerText = `${playerName} LOST the match`;
						globalEnemyScore.innerText = parseFloat(globalEnemyScore.innerText) + 1;

						let savedScores = JSON.parse(localStorage.getItem(playerName));
						savedScores.globalEnemyScore = parseFloat(savedScores.globalEnemyScore) + 1;
						localStorage.setItem(playerName, JSON.stringify(savedScores));
					}

					let continueText = document.createElement('p');
					continueText.className = 'continue-match-text';
					continueText.innerText = `You can either move on to the next match or finish this one for fun`;

					let button = document.createElement('button');
					button.className = 'new-match';
					button.innerText = 'New Match';
					button.addEventListener('click', ui.newMatch);

					buttonsFightContainer.append(finalResultText);
					buttonsFightContainer.append(continueText);
					buttonsFightContainer.append(button);

					ui.resultIsDisplayed = true;
				}

				if (playerPokemonContainer.children.length > 0) {
					let buttonNextFight = document.createElement('button');
					buttonNextFight.className = 'next-fight-button';
					buttonNextFight.innerText = 'Next Fight';
					buttonNextFight.addEventListener('click', ui.nextFight);
					buttonsFightContainer.appendChild(buttonNextFight);
				}
			}
		}
	}

	nextFight() {
		let pokemonDropDiv = document.querySelector('.drop-box');

		pokemonDropDiv.firstElementChild.remove();
		ui.enemyPokemon();

		let fightInfoCont = document.querySelector('.fight-info');

		for (let i = fightInfoCont.childNodes.length - 1; i >= 0; i--) {
			fightInfoCont.removeChild(fightInfoCont.childNodes[i]);
		}

		ui.checkIfCardDropContIsFilled();
		pokemonDropDiv.style.border = '#2f3e75 1px dashed';

		let nextFightButton = document.querySelector('.next-fight-button');

		if (nextFightButton !== null) {
			document.querySelector('.next-fight-button').remove();
		}

		let buttonFight = document.createElement('button');
		buttonFight.className = 'fight-button';
		buttonFight.innerText = 'Fight';
		buttonFight.addEventListener('click', ui.startFight);
		document.querySelector('.button-fight-event-container').appendChild(buttonFight);

		setTimeout(() => {
			let enemyPokName = document
				.querySelector('.enemy-card')
				.querySelector('.name')
				.innerText.replace('Name: ', '');
			console.log(enemyPokName);
			document.querySelector('h3').innerText = `Drag the pokemon you want to fight against ${enemyPokName} in the left (dotted) box below`;
		}, 500);
	}

	newMatch() {
		document.querySelector('.score-player').innerText = '0';
		document.querySelector('.score-enemy').innerText = '0';

		let buttonsAndResultTextDiv = document.querySelector('.button-fight-event-container');
		for (let i = buttonsAndResultTextDiv.childNodes.length - 1; i >= 0; i--) {
			buttonsAndResultTextDiv.removeChild(buttonsAndResultTextDiv.childNodes[i]);
		}

		let playerPokemonContainer = document.querySelector('.cards-pick');
		if (playerPokemonContainer.childNodes.length > 0) {
			for (let i = playerPokemonContainer.childNodes.length - 1; i >= 0; i--) {
				playerPokemonContainer.removeChild(playerPokemonContainer.childNodes[i]);
			}
		}

		let checkBoxDiv = document.querySelector('.change-radio-buttons-container');
		for (let i = 0; i < checkBoxDiv.children.length; i++) {
			checkBoxDiv.children[i].style.display = 'block';
		}

		document.querySelector('.change').style.display = 'block';

		ui.nextFight();
		ui.createPokemonPlayer();
		ui.uncheckCheckboxes();

		setTimeout(() => {
			document.querySelector('h3').innerText = `Check the cards you want to change:`;
		}, 500);

		ui.resultIsDisplayed = false;
		ui.ableToChangeCard = true;
	}
}
