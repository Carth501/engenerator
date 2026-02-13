export function writeCharacterText(characterData) {
    let characterString = "";
    characterString += "Name: " + characterData.name + "\n";
    characterString += "Occupation: " + characterData.occupation + "\n";
    if (characterData.age !== undefined) {
        characterString += "Age: " + characterData.age + "\n";
    }
	else {
		console.warn("Age is undefined for character: " + characterData.name);
	}
    characterString += "Personality: " + characterData.personality + "\n";
    return characterString;
}  