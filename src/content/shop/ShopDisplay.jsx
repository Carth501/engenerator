import { connect } from "react-redux";

const ShopDisplay = ({ shopString }) => (
    <div className='display'>
        {shopString}
    </div>
)

const mapStateToProps = state => {
    const { shopString } = state || "";
    return { shopString };
};

export default connect(mapStateToProps)(ShopDisplay);