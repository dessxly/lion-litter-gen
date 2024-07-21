function getRandomAttribute(attributes) {
  const totalOdds = attributes.reduce((sum, attr) => sum + attr.odds, 0);
  let randomValue = Math.random() * totalOdds;

  for (const attribute of attributes) {
    randomValue -= attribute.odds;
    if (randomValue <= 0) {
      return attribute.type;
    }
  }

  return attributes[attributes.length - 1].type; // Fallback to the last attribute
}

function generateOffspring() {
  const parent1Color = document.getElementById('parent1').value.toLowerCase();
  const parent2Color = document.getElementById('parent2').value.toLowerCase();
  const parent1Trait = document.getElementById('parent1Trait').value.toLowerCase();
  const parent2Trait = document.getElementById('parent2Trait').value.toLowerCase();

  const colorRules = {
    "brown-brown": ["dark brown", "mocha"],
    "white-white": ["silver", "pale white"],
    "black-black": ["midnight black", "charcoal"],
    "gray-gray": ["steel gray", "cloud gray"],
    "golden-golden": ["rich gold", "sun-kissed"],
    "fawn-fawn": ["light fawn", "warm tan"],
    "cream-cream": ["ivory", "buttercream"],
    "copper-copper": ["copper", "rust"],
    "lightcream-lightcream": ["pearl", "vanilla"],
    "brown-white": ["golden", "cream"],
    "white-brown": ["golden", "cream"],
    "brown-black": ["dark brown", "charcoal"],
    "black-brown": ["dark brown", "charcoal"],
    "white-black": ["light gray", "smoky gray"],
    "black-white": ["light gray", "smoky gray"],
    "brown-gray": ["dark gray", "muted brown"],
    "gray-brown": ["dark gray", "muted brown"],
    "white-gray": ["silver", "pale white"],
    "gray-white": ["silver", "pale white"],
    "golden-fawn": ["light golden", "amber"],
    "fawn-golden": ["light golden", "amber"],
    "golden-cream": ["champagne", "honey"],
    "cream-golden": ["champagne", "honey"],
    "fawn-cream": ["peach", "blush"],
    "cream-fawn": ["peach", "blush"],
    "copper-lightcream": ["rose gold", "caramel"],
    "lightcream-copper": ["rose gold", "caramel"],
    "brown-cream": ["light brown", "butterscotch"],
    "cream-brown": ["light brown", "butterscotch"],
    "white-cream": ["pale white", "cream"],
    "cream-white": ["pale white", "cream"],
    "black-cream": ["dark gray", "smoky gray"],
    "cream-black": ["dark gray", "smoky gray"],
    "gray-cream": ["light gray", "muted brown"],
    "cream-gray": ["light gray", "muted brown"],
    "golden-copper": ["gold", "copper"],
    "copper-golden": ["gold", "copper"],
    "golden-lightcream": ["light gold", "vanilla"],
    "lightcream-golden": ["light gold", "vanilla"],
    "fawn-copper": ["dark fawn", "light copper"],
    "copper-fawn": ["dark fawn", "light copper"],
    "golden-black": ["bronze", "dark gold"],
    "black-golden": ["bronze", "dark gold"],
    "copper-black": ["deep copper", "bronze"],
    "black-copper": ["deep copper", "bronze"]
    // Add more combinations as needed
  };

  const traitRules = {
    "none-none": ["none"],
    "large fangs-large fangs": ["large fangs"],
    "bob tail-bob tail": ["bob tail"],
    "fluffy tail-fluffy tail": ["fluffy tail"],
    "large fangs-none": ["none", "large fangs"],
    "none-large fangs": ["none", "large fangs"],
    "bob tail-none": ["none", "bob tail"],
    "none-bob tail": ["none", "bob tail"],
    "fluffy tail-none": ["none", "fluffy tail"],
    "none-fluffy tail": ["none", "fluffy tail"],
    "large fangs-bob tail": ["large fangs", "bob tail"],
    "bob tail-large fangs": ["large fangs", "bob tail"],
    "large fangs-fluffy tail": ["large fangs", "fluffy tail"],
    "fluffy tail-large fangs": ["large fangs", "fluffy tail"],
    "bob tail-fluffy tail": ["bob tail", "fluffy tail"],
    "fluffy tail-bob tail": ["bob tail", "fluffy tail"]
    // Add more combinations as needed
  };

  const traitProbabilities = {
    "none": 70,
    "large fangs": 15,
    "bob tail": 5,
    "fluffy tail": 10
  };

  const keyColor = `${parent1Color}-${parent2Color}`;
  const keyTrait = `${parent1Trait}-${parent2Trait}`;
  const possibleOutcomesColor = colorRules[keyColor];
  const possibleOutcomesTrait = traitRules[keyTrait];
  const minCubs = 2;
  const maxCubs = 5;
  const numCubs = Math.floor(Math.random() * (maxCubs - minCubs + 1)) + minCubs;

  const genders = ["Male", "Female"];
  const mutationTypes = [
    { type: 'Albinism', odds: 2 },
    { type: 'Piebaldism', odds: 5 },
    { type: 'Chimerism', odds: 5 },
    { type: 'Melanism', odds: 2 },
    { type: 'Bob Tail', odds: 5 },
    { type: 'Maned', odds: 10, gender: 'Female' },
    { type: 'No Mutation', odds: 80 }
  ];

  const offspringDetails = document.getElementById('offspringDetails');
  offspringDetails.innerHTML = ''; // Clear previous details

  for (let i = 1; i <= numCubs; i++) {
    const randomProbability = Math.random(); // Random number between 0 and 1

    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const mutation = getRandomAttribute(mutationTypes.filter(attr => attr.gender === undefined || attr.gender === randomGender));

    let cubColor;
    let cubTrait;

    if (randomProbability < 0.2) { // 20% probability for parent 1 color
      cubColor = parent1Color;
    } else if (randomProbability < 0.4) { // 20% probability for parent 2 color
      cubColor = parent2Color;
    } else {
      // Select a different color for each cub
      cubColor = Array.isArray(possibleOutcomesColor) ? getRandomAttribute(possibleOutcomesColor.map(color => ({ type: color, odds: 1 }))) : possibleOutcomesColor;
    }

    if (randomProbability < 0.2) { // 20% probability for parent 1 trait
      cubTrait = parent1Trait;
    } else if (randomProbability < 0.4) { // 20% probability for parent 2 trait
      cubTrait = parent2Trait;
    } else {
      // Select a different trait for each cub with probabilities
      cubTrait = Array.isArray(possibleOutcomesTrait) ? getRandomAttribute(possibleOutcomesTrait.map(trait => ({ type: trait, odds: traitProbabilities[trait] || 1 }))) : possibleOutcomesTrait;
    }

    const listItem = document.createElement('li');
    listItem.classList.add('cub-details');

    const title = document.createElement('div');
    title.classList.add('cub-title');
    title.textContent = `Cub ${i}`;
    listItem.appendChild(title);

    const gender = document.createElement('div');
    gender.classList.add('gender-color');
    gender.textContent = `Gender: ${randomGender}`;
    listItem.appendChild(gender);

    const color = document.createElement('div');
    color.classList.add('gender-color');
    color.textContent = `Color: ${cubColor}`;
    listItem.appendChild(color);

    const traitElement = document.createElement('div');
    traitElement.classList.add('traits');
    traitElement.textContent = `Traits: ${cubTrait}`;
    listItem.appendChild(traitElement);

    const mutationElement = document.createElement('div');
    mutationElement.classList.add('mutation');
    mutationElement.textContent = `Mutation: ${mutation}`;
    listItem.appendChild(mutationElement);

    offspringDetails.appendChild(listItem);
  }
}
