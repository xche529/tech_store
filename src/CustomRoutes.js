import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CartPage from './components/checkout/CartPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import ItemDetails from './components/Item';

function CustomRoutes() {
    return (
        <Router>
        <Routes>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/items" element={<ItemDetails />} />
        </Routes>
        </Router>
    );
    }

export default CustomRoutes;
