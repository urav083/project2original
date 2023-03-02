// create namespaced object
const pokemon = {};

// DOM Query selector variables in global scope to be used later, at multiple stages
pokemon.playerSprite = document.querySelector('.ashImg');
pokemon.pqSpriteType = document.querySelector('.playerType');


// define endpoint
// filter array down to 3 types(water, fire, grass)
pokemon.urls = ['https://pokeapi.co/api/v2/type/10/', 'https://pokeapi.co/api/v2/type/11/', 'https://pokeapi.co/api/v2/type/12/'];
pokemon.urlPokeSprite = ['https://pokeapi.co/api/v2/pokemon/'];


//onclick from battlepage.html - function to help with showing/hiding pokemon menu selection
pokemon.hideFunction = function() {
    document.getElementById("menu").style.display = "flex";
}

// fetch url, sorted by map so to interact as an array with objects within
pokemon.myResult = pokemon.urls.map((url) => {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
});

// since fetch is returned, need to use promise so to open fulfilled array from pokemon.myResult
pokemon.promise = function() {
    Promise.all(pokemon.myResult)
        .then(pokedata => {

            //storing values to use for later, for each type for player Team
            const pokeTypeF = pokedata[0].name;
            const pokeTypeW = pokedata[1].name;
            const pokeTypeG = pokedata[2].name;

            //We used 50 instead of .length function due to the fact that in higher numbers sprite images are not available
            const playerFirePoke = pokedata[0].pokemon[pokemon.getRandomInt(50)];
            const playerWaterPoke = pokedata[1].pokemon[pokemon.getRandomInt(50)];
            const playerGrassPoke = pokedata[2].pokemon[pokemon.getRandomInt(50)];

            //stored variables for the enemy 
            const chosenObj = pokedata[pokemon.getRandomInt(3)];
            const randomChoice = pokemon.getRandomInt(50);
            const finalPoke = chosenObj.pokemon[randomChoice];
            const finalPokeType = chosenObj.name;

            //function to append player team, called 3 times for each type
            pokemon.teamCreator(playerFirePoke, pokeTypeF);
            pokemon.teamCreator(playerWaterPoke, pokeTypeW);
            pokemon.teamCreator(playerGrassPoke, pokeTypeG);

            // event listener for clicking when play makes selection
            pokemon.EventListenerMenu(finalPoke);

            //function to display/hide enemy pokemon before battle starts
            pokemon.enemyDisplayer(finalPoke, finalPokeType);

        });
}

// function to append menu selection for player pokemon team
pokemon.teamCreator = function(playerTypePoke, type) {

    const pokeUrl = playerTypePoke.pokemon.url;

    const title = document.createElement('h3');
    title.innerText = playerTypePoke.pokemon.name.toUpperCase();

    const pokeType = document.createElement('p');
    pokeType.innerText = type.toUpperCase();

    const image = document.createElement('img');
    image.src = '';
    image.alt = playerTypePoke.pokemon.name;
    image.classList.add(`${type}${type}`)

    //if statement used so that when function is called 3 times with different arguments in order to append on page for each type
    if (type === "fire") {
        const fq = document.querySelector('.fire')
        fq.appendChild(title);
        fq.appendChild(image);
        fq.appendChild(pokeType);

        fetch(pokeUrl)
            .then(results => {
                return results.json();
            }).then(data => {
                const sprite = data.sprites.other["official-artwork"].front_default;
                const fqI = document.querySelector('.firefire');
                fqI.src = sprite;
            });

    } else if (type === "water") {
        const wq = document.querySelector('.water')
        wq.appendChild(title);
        wq.appendChild(image);
        wq.appendChild(pokeType);

        fetch(pokeUrl)
            .then(results => {
                return results.json();
            }).then(data => {
                const sprite = data.sprites.other["official-artwork"].front_default;
                const wqI = document.querySelector('.waterwater');
                wqI.src = sprite;
            });
    } else if (type === "grass") {
        const gq = document.querySelector('.grass')
        gq.appendChild(title);
        gq.appendChild(image);
        gq.appendChild(pokeType);

        fetch(pokeUrl)
            .then(results => {
                return results.json();
            }).then(data => {
                const sprite = data.sprites.other["official-artwork"].front_default;
                const gqI = document.querySelector('.grassgrass');
                gqI.src = sprite;
            });
    }
}

//event listener to replace image to the player image to that of the chosen pokemon, while also putting Fight button to appear after selection, and to put enemy pokemon after player's choice
pokemon.EventListenerMenu = function(finalPoke) {
    document.querySelector('.fire').addEventListener('click', function() {

        const fqI = document.querySelector('.firefire');
        pokemon.playerSprite.src = fqI.src;
        pokemon.playerSprite.alt = fqI.alt;


        const fNqI = document.querySelector('.ashName');
        fNqI.innerText = fqI.alt.toUpperCase();

        document.getElementById("menu").style.display = "none";

        pokemon.pqSpriteType.innerText = "fire";

        const fightButton = document.querySelector(".button");
        fightButton.style.display = "flex"

        pokemon.enemySprite(finalPoke);

    });
    document.querySelector('.water').addEventListener('click', function() {
        const wqI = document.querySelector('.waterwater');
        pokemon.playerSprite.src = wqI.src;
        pokemon.playerSprite.alt = wqI.alt;

        const wNqI = document.querySelector('.ashName');
        wNqI.innerText = wqI.alt.toUpperCase();

        document.getElementById("menu").style.display = "none";

        pokemon.pqSpriteType.innerText = "water";

        const fightButton = document.querySelector(".button");
        fightButton.style.display = "flex"

        pokemon.enemySprite(finalPoke);

    });
    document.querySelector('.grass').addEventListener('click', function() {
        const gqI = document.querySelector('.grassgrass');
        pokemon.playerSprite.src = gqI.src;
        pokemon.playerSprite.alt = gqI.alt;

        const gNqI = document.querySelector('.ashName');
        gNqI.innerText = gqI.alt.toUpperCase();

        document.getElementById("menu").style.display = "none";

        pokemon.pqSpriteType.innerText = "grass";

        const fightButton = document.querySelector(".button");
        fightButton.style.display = "flex"

        pokemon.enemySprite(finalPoke);
    });
}

//function to append enemy pokemon onto html and its name
pokemon.enemySprite = function(enemyPokeGary) {
    const pokeUrl = enemyPokeGary.pokemon.url;
    fetch(pokeUrl)
        .then(results => {
            return results.json();
        }).then(data => {
            const sprite = data.sprites.other["official-artwork"].front_default;
            const eqI = document.querySelector('.garyImg');
            eqI.src = sprite;
            eqI.alt = `${enemyPokeGary.pokemon.name}`;

            const pokeEnemyName = document.querySelector('.GaryName');
            pokeEnemyName.innerText = enemyPokeGary.pokemon.name.toUpperCase();

        });
}


// Function to display enemy pokemon, before battle starts to show player
pokemon.enemyDisplayer = function(finalPoke, finalPokeType) {
    const enemyName = (finalPoke.pokemon.name);
    const enemyPic = document.querySelectorAll('.enemyPic');

    fetch(`https://pokeapi.co/api/v2/pokemon/${enemyName}`)
        .then((response) => {
            return response.json();
        }).then(data => {
            const sprites = data.sprites;
            const spritesURL = sprites.other.home.front_default;
            enemyPic[0].src = spritesURL;
            enemyPic[1].src = spritesURL;
            enemyPic[2].src = spritesURL;
        })
        .catch(error => console.error(error));
    const enemyTypeSpan = document.querySelector(".enemyType");
    enemyTypeSpan.textContent = `${finalPokeType}`;
    const enemyNameSpan = document.querySelector(".enemyName");
    enemyNameSpan.textContent = `${finalPoke.pokemon.name}`;
}

//randomizing function
pokemon.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
}

// function to help hide certain queries, so to progress on the same page
pokemon.pageTurnerOne = function() {

    const button1 = document.querySelector("#continueToFight");
    const pageOne = document.querySelector(".testWrapper");
    const pageTwo = document.querySelector(".indexBattleScreen");

    button1.addEventListener('click', () => {
        pageOne.style.display = "none"
        pageTwo.style.display = "flex"

    });
}

//function to determine the result of the battle, and to edit the innertext of the box that will be displayed, and un-hide it 
pokemon.battleResults = function() {
    document.querySelector('input').addEventListener('click', function() {

        const chosenPlayerType = pokemon.pqSpriteType.innerText;

        const brEnemyType = document.querySelector(".enemyType");
        const randomizedEnemyType = brEnemyType.innerText;

        console.log(randomizedEnemyType);

        const fO = document.querySelector(".finalOutcome");
        const fO2 = document.querySelector(".box5");


        if (chosenPlayerType === "fire" && randomizedEnemyType === "fire") {
            fO.innerText = "Draw";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "fire" && randomizedEnemyType === "water") {
            fO.innerText = "You Lose";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "fire" && randomizedEnemyType === "grass") {
            fO.innerText = "Victory";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "water" && randomizedEnemyType === "fire") {
            fO.innerText = "Victory";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "water" && randomizedEnemyType === "water") {
            fO.innerText = "Draw";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "water" && randomizedEnemyType === "grass") {
            fO.innerText = "You Lose";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "grass" && randomizedEnemyType === "fire") {
            fO.innerText = "You Lose";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "grass" && randomizedEnemyType === "water") {
            fO.innerText = "Victory";
            fO2.style.display = "flex";

        } else if (chosenPlayerType === "grass" && randomizedEnemyType === "grass") {
            fO.innerText = "Draw";
            fO2.style.display = "flex";

        }


    })
}


pokemon.init = function() {

    pokemon.promise();

    pokemon.pageTurnerOne();

    pokemon.battleResults();
};

pokemon.init();