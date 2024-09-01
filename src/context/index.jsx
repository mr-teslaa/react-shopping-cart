import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [listOfProducts, setListOfProducts] = useState([]);
	const [productDetails, setProductDetails] = useState();
	const [cartItems, setCartItems] = useState([]);

	const fetchListOfProducts = async () => {
		const apiResponse = await fetch("https://dummyjson.com/products");
		const result = await apiResponse?.json();

		if (result && result?.products) {
			setLoading(false);
			setListOfProducts(result?.products);
		}
	};

	const handleAddCart = (productDetails) => {
		const copyCartItems = [...cartItems];
		const findIndexOfCurrentProduct = copyCartItems.findIndex(
			(cartItem) => cartItem?.id === productDetails?.id
		);

		if (findIndexOfCurrentProduct === -1) {
			copyCartItems.push({
				...productDetails,
				quantity: 1,
				totalPrice: productDetails?.price,
			});
		} else {
			copyCartItems[findIndexOfCurrentProduct] = {
				...copyCartItems[findIndexOfCurrentProduct],
				quantity: copyCartItems[findIndexOfCurrentProduct].quantity + 1,
				totalPrice:
					(copyCartItems[findIndexOfCurrentProduct].quantity + 1) *
					copyCartItems[findIndexOfCurrentProduct].price,
			};
		}

		setCartItems(copyCartItems);
		localStorage.setItem("cartItems", JSON.stringify(copyCartItems));
		navigate("/cart");
	};

	const handleRemoveFromCart = (getProductDetails, isFullyRemoveFromCart) => {
		let copyExistingCartItems = [...cartItems];
		console.log(copyExistingCartItems);

		const findIndexOfCurrentCartItem = copyExistingCartItems.findIndex(
			(item) => item.id === getProductDetails.id
		);

		if (isFullyRemoveFromCart) {
			copyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
		} else {
			copyExistingCartItems[findIndexOfCurrentCartItem] = {
				...copyExistingCartItems[findIndexOfCurrentCartItem],
				quantity:
					copyExistingCartItems[findIndexOfCurrentCartItem].quantity -
					1,
				totalPrice:
					(copyExistingCartItems[findIndexOfCurrentCartItem]
						.quantity -
						1) *
					copyExistingCartItems[findIndexOfCurrentCartItem].price,
			};
		}

		localStorage.setItem(
			"cartItems",
			JSON.stringify(copyExistingCartItems)
		);
		setCartItems(copyExistingCartItems);
	};

	useEffect(() => {
		fetchListOfProducts();
		setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{
				listOfProducts,
				loading,
				setLoading,
				productDetails,
				setProductDetails,
				cartItems,
				handleAddCart,
				handleRemoveFromCart,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};

ShoppingCartProvider.propTypes = {
	children: PropTypes.object,
};

export default ShoppingCartProvider;
