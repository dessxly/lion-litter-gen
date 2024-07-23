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
  const parent1Mutation = document.getElementById('parent1Mutation').value.toLowerCase();
  const parent2Mutation = document.getElementById('parent2Mutation').value.toLowerCase();

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

  const mutationRules = {
      "none-none": ["none"],
      "albinism-albinism": ["albinism"],
      "piebaldism-piebaldism": ["piebaldism"],
      "piebaldism-chimerism": [
        { type: "piebaldism", odds: 0.5 },
        { type: "none", odds: 0.2 },
        { type: "chimerism", odds: 0.5 }
    ],
    "chimerism-piebaldism": [
        { type: "piebaldism", odds: 0.5 },
        { type: "none", odds: 0.2 },
        { type: "chimerism", odds: 0.5 }
    ],
      "chimerism-chimerism": ["chimerism"],
      "melanism-melanism": ["melanism"],
      "bob tail-bob tail": ["bob tail"],
      "maned-maned": ["maned"],
      "albinism-none": ["none", "albinism"],
      "none-albinism": ["none", "albinism"],
      "piebaldism-none": ["none", "piebaldism"],
      "none-piebaldism": ["none", "piebaldism"],
      "chimerism-none": ["none", "chimerism"],
      "none-chimerism": ["none", "chimerism"],
      "melanism-none": ["none", "melanism"],
      "none-melanism": ["none", "melanism"],
      "bob tail-none": ["none", "bob tail"],
      "none-bob tail": ["none", "bob tail"],
      "maned-none": ["none", "maned"],
      "none-maned": ["none", "maned"],
      // Add more combinations as needed
  };

  const traitProbabilities = {
      "none": 70,
      "large fangs": 15,
      "bob tail": 5,
      "fluffy tail": 10
  };

  const mutationProbabilities = {
      "none": 80,
      "albinism": 2,
      "piebaldism": 5,
      "chimerism": 5,
      "melanism": 2,
      "bob tail": 5,
      "maned": 1
  };

  const keyColor = `${parent1Color}-${parent2Color}`;
  const keyTrait = `${parent1Trait}-${parent2Trait}`;
  const keyMutation = `${parent1Mutation}-${parent2Mutation}`;
  const possibleOutcomesColor = colorRules[keyColor];
  const possibleOutcomesTrait = traitRules[keyTrait];
  const possibleOutcomesMutation = mutationRules[keyMutation];
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

      let cubColor;
      let cubTrait;
      let cubMutation;

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
          cubTrait = Array.isArray(possibleOutcomesTrait) ? getRandomAttribute(possibleOutcomesTrait.map(trait => ({ type: trait, odds: traitProbabilities[trait] }))) : possibleOutcomesTrait;
      }

       // Mutation logic
    if (parent1Mutation === parent2Mutation && parent1Mutation !== 'none') {
        cubMutation = Math.random() < 0.9 ? parent1Mutation : 'none';
    } else if (parent1Mutation === 'none' && parent2Mutation === 'none') {
        cubMutation = getRandomAttribute(mutationTypes);
    } else {
        const possibleOutcomesMutation = mutationRules[keyMutation];
        if (Array.isArray(possibleOutcomesMutation)) {
            // Handle mutation probabilities
            let randomValue = Math.random();
            for (const outcome of possibleOutcomesMutation) {
                randomValue -= outcome.odds;
                if (randomValue <= 0) {
                    cubMutation = outcome.type;
                    break;
                }
            }
        } else {
            cubMutation = possibleOutcomesMutation;
        }
    }


      const cubDetails = document.createElement('li');
cubDetails.innerHTML = `
 
  <div class="cub-title">Cub ${i}</div>
  <div class="gender-color">Gender: ${randomGender}</div>
   <div class="cub-color">Color: ${cubColor}</div>
  
  <div class="cub-trait traits">Trait: ${cubTrait}</div>
  <div class="cub-mutation mutation ${cubMutation.toLowerCase()}">Mutation: ${cubMutation}</div>
`;
offspringDetails.appendChild(cubDetails);

  }
}
