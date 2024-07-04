import { ShopDisplay } from './ShopDisplay.jsx';
import { ShopOptions } from './ShopOptions.jsx';
import './ShopPage.css';

function ShopPage() {

    return (
        <div className='content'>
            <ShopOptions />
            <ShopDisplay />
        </div>
    )
}

export default ShopPage;
