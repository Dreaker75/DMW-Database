// TODO: Add an option to choose between Japanese, English or In-Game Digimon names

// TODO: Use the following property for graying out attributes that have not been maxed:
// filer: grayscale(100%)
// NOTE: Might also need to add something else to show when the attribute has been maxed, to help with color blindness

// DEBUG: Function to show the portraits of all currently added Digimon to spot any errors. Remove when releasing
function DEBUG_DISPLAY() {
    // Displays the info cards for every Digimon (Will later become the Digimon menu)
    let baseDigimonArray = [];
    Object.values(DIGIMON).forEach(digimonId => {
        Object.values(DIGIMON_DATA[digimonId].base).forEach(baseDigimon => {
            if (baseDigimonArray.indexOf(baseDigimon) == -1) {
                displayDigimon(baseDigimon);
                baseDigimonArray.push(baseDigimon);
            }
        });
    });

    // Displays the icons for every Digimon
    let image;
    Object.values(DIGIMON).forEach(digimonData => {
        image = document.createElement("img");
        image.src = "images/icons/digimon/" + DIGIMON_DATA[digimonData].id + ".png";
        image.alt = DIGIMON_DATA[digimonData].id;
        document.getElementsByTagName("body")[0].appendChild(image);
    });
}

// Function to display the Digimon passed in in the preview
function displayDigimon(digimonID) {
    let template = document.getElementById("digimon-preview");
    let digimonPreviewDiv = document.getElementById("digimon-list");
    // html div holding all the Digimon's information
    let digimonInfo;
    // Array holding all the different evolutions of this Digimon
    let evolutions = [];
    // Array to hold all the attributes the Digimon has
    let typeAttributes = [];
    let elementAttributes = [];
    // Temp array to check the attributes of all evolutions
    let digimonLeftToCheck = [];
    // Creates a new image for the Digimon's Icon
    let digimonImage = document.createElement("img");
    digimonImage.dataset.icon = "digimon";
    digimonImage.src = "images/icons/digimon/"
    // Creates a new image for the Digimon's Attribute
    let attributeImage = document.createElement("img");
    // Set the data attribute of the element to 'data-icon="attribute"'
    attributeImage.dataset.icon = "attribute";
    attributeImage.src = "images/icons/attributes/"

    digimonLeftToCheck.push(digimonID);
    evolutions.push(digimonID);
    rides = 0;

    while (digimonLeftToCheck.length > 0) {
        // Grab the last Digimon in the array to check its attributes
        let digimonToCheck = digimonLeftToCheck.pop();

        console.log(digimonToCheck);
        // Save its attributes if they're not already in the array
        if (!typeAttributes.includes(DIGIMON_DATA[digimonToCheck].type)) {
            typeAttributes.push(DIGIMON_DATA[digimonToCheck].type);
        }
        if (!elementAttributes.includes(DIGIMON_DATA[digimonToCheck].element)) {
            elementAttributes.push(DIGIMON_DATA[digimonToCheck].element);
        }

        // Add whether the evolution has a ride mode
        rides += DIGIMON_DATA[digimonToCheck].ride_item.itemRequired == RIDE_ITEMS.NONE ? 0 : 1;

        // Add this Digimon's evolutions to check their attributes as well
        DIGIMON_EVOLUTIONS[digimonToCheck].forEach(evolution => {
        // If the evolution evolves from the Digimon being displayed && it was not already checked
            if (evolution.baseDigimon == digimonID && !evolutions.includes(evolution.evolvesTo)) {
                digimonLeftToCheck.push(evolution.evolvesTo);
                evolutions.push(evolution.evolvesTo);
            }
        });
    }

    digimonInfo = template.content.cloneNode(true);
    // TODO: Change names to use the one selected by the player, instead of specifically "japanese"
    let digimonImagesDiv = digimonInfo.querySelector(".image-container");
    digimonInfo.querySelector("p").innerHTML = DIGIMON_DATA[digimonID].names.japanese;
    let newDigimon;

    evolutions.forEach(evolution => {
        newDigimon = digimonImage.cloneNode(true);
        newDigimon.src += DIGIMON_DATA[evolution].id + ".png";
        newDigimon.alt = DIGIMON_DATA[evolution].names.japanese + " portrait";
        digimonImagesDiv.appendChild(newDigimon);
    });
    
    // Display all the evolution's attributes
    let newAttribute;
    typeAttributes.forEach(attribute => {
        newAttribute = attributeImage.cloneNode(true);
        newAttribute.src += attribute + ".png";
        newAttribute.alt = attribute + " Icon";
        digimonInfo.querySelector('p[data-list=attributes]').appendChild(newAttribute);
    });

    elementAttributes.forEach(attribute => {
        newAttribute = attributeImage.cloneNode(true);
        newAttribute.src += attribute + ".png";
        newAttribute.alt = attribute + " Icon";
        digimonInfo.querySelector('p[data-list=attributes]').appendChild(newAttribute);
    });

    digimonInfo.querySelector('span[data-skill-mastery=current]').innerHTML = 0;
    digimonInfo.querySelector('span[data-skill-mastery=total]').innerHTML = evolutions.length;
    // TODO: Uptade once Riding Modes are taken into account
    digimonInfo.querySelector('span[data-rides=current]').innerHTML = 0;
    digimonInfo.querySelector('span[data-rides=total]').innerHTML = rides;

    digimonPreviewDiv.appendChild(digimonInfo);
}

function getLine(digimon) {
    return DIGIMON_DATA[digimon].base[Math.floor(Math.random() * DIGIMON_DATA[digimon].base.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    // let randomDigimonArray = [];
    // let randomDigimon;
    // for (let index = 0; index < 3; index++) {
    //     do {
    //         digimon = Object.values(DIGIMON)[Math.floor(Math.random() * Object.values(DIGIMON).length)];
    //         console.log(digimon);
    //         randomDigimon = getLine(digimon);
    //     } while (randomDigimonArray.indexOf(randomDigimon) != -1);
    //     console.log(randomDigimon);
    //     randomDigimonArray.push(randomDigimon);
    // }
    // displayDigimon(randomDigimonArray[0]);
    // displayDigimon(randomDigimonArray[1]);
    // displayDigimon(randomDigimonArray[2]);

    DEBUG_DISPLAY();
})