import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/productList";
import ProductDetailsPage from "./pages/productDetails";
import CartListPage from "./pages/cartList";
import "./App.css";

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path="/products" element={<ProductListPage />}></Route>
				<Route
					path="/product/:id"
					element={<ProductDetailsPage />}
				></Route>
				<Route path="/cart" element={<CartListPage />}></Route>
			</Routes>
		</Fragment>
	);
}

export default App;
