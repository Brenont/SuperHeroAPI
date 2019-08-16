
function getHero() {
  const key = 2437561816310676;

  const inputId = document.querySelector(".input-id");
  const id = inputId.value;
  console.log(id);

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const URL = `https://superheroapi.com/api/${key}/${id}`;

  fetch(proxyUrl + URL).then(response =>
    response.json().then(data => {
      console.log(data);
      buildHero(data);
      openHero();
    })
  );
}

function buildHero(_data) {
  var heroContainer = document.querySelector(".hero-container");

  var heroBuild = "";

  heroBuild = `
    <span onclick="closeHero()" class="closer-hero flex-center">X</span>

    <img src="${_data.image.url}" alt="${_data.name}">
    <h3>${_data.name}, ${_data.biography["full-name"]}</h3>
    `;
  heroBuild =
    heroBuild +
    buildBiography(_data.biography) +
    buildAppearance(_data.appearance) +
    `<div class="info-hero powerstats">
      <h1>Power Stats</h1>
    `;

  heroContainer.innerHTML = heroBuild;

  buildPowerstats(_data.powerstats);
}

function buildBiography(_biography) {
  let divBio = `
    <div class="info-hero biography">
      <h1>Biography</h1>
      <p>Place of Birth: ${_biography["place-of-birth"]}</p>
      <p>Publisher: ${_biography.publisher}</p>
    </div>
    `;
  return divBio;
}

function buildAppearance(_appearance) {
  let divAppear = `
    <div class="info-hero appearance">
      <h1>Appearance</h1>
      
      <p>Eye Color: ${_appearance["eye-color"]}</p>
      <p>Hair Color: ${_appearance["hair-color"]}</p>
      <p>Heigth: ${_appearance.height[1]}</p>
      <p>Race: ${_appearance.race}</p>
    </div>
    `;
  return divAppear;
}

function buildPowerstats(_powerstats) {
  const powerTypes = ["combat","durability","intelligence","power","speed","strength"];

  let divPower = document.querySelector(".powerstats");

  let powers = "<h1>Power Stats</h1>";

  for(i = 0; i < powerTypes.length; i++){
    powers = powers + `
    <p>${powerTypes[i]}</p>
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: ${_powerstats[powerTypes[i]]}%;" aria-valuenow="${_powerstats[powerTypes[i]]}" aria-valuemin="0"
        aria-valuemax="100">${_powerstats[powerTypes[i]]}</div>
    </div>
    `
  }

  divPower.innerHTML = powers;
}

// FUNCTIONS TOOGLE HERO INFORMATIONS
var heroContainer = document.querySelector(".hero-container");

function openHero() {
  heroContainer.id = "open-hero";
}

function closeHero() {
  heroContainer.id = "";
}
