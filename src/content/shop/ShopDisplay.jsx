import { useSelector } from "react-redux"
import { getShopDisplay } from "../../redux/selectors"

export function ShopDisplay() {
    const displayString = useSelector(
        getShopDisplay
    )

    return (
        <div className='display'>
            {displayString}
        </div>)
}
