import { useSelector } from "react-redux"
import { getCharacterDisplay } from "../../redux/selectors"

export function CharacterDisplay() {
    const displayString = useSelector(
        getCharacterDisplay
    )

    return (
        <div className='display'>
            {displayString}
        </div>)
}
