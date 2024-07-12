export function writeCharacterText(characterData) {
    let characterString = "";
    characterString += "Name: " + characterData.name + "\n";
    characterString += "Occupation: " + characterData.occupation;
    return characterString;
}