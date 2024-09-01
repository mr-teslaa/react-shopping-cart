import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import PropTypes from "prop-types";

function ProductItem({ product }) {
	const navigate = useNavigate();
	const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);

	function handleNavigateToProductDetailsPage(productId) {
		navigate(`/product/${productId}`);
	}

	return (
		<div className="relative group border border-cyan-700 p-6 cursor-pointer">
			<div className="overflow-hidden aspect-w-1 aspect-h-1">
				<img
					src={product?.thumbnail}
					alt={product?.title}
					className="oject-cover w-full h-full transition-all duration-300 group-hover:scale-125"
				/>
			</div>
			<div className="flex items-start justify-between mt-4 space-x-4">
				<div className="font-bold text-gray-900 sm:text-sm text-xs md:text-base">
					<p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
						{product?.title}
					</p>
				</div>
				<div className="text-right">
					<p className="text-xs font-bold text-gray-900 sm:text-sm md:text-[14px]">
						${product?.price}
					</p>
				</div>
			</div>
			<button
				onClick={() => handleNavigateToProductDetailsPage(product?.id)}
				className="px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
			>
				View Details
			</button>
			<button
				disabled={
					cartItems.findIndex((item) => item.id === product.id) > -1
				}
				onClick={() => handleAddToCart(product)}
				className="disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-black text-white font-bold text-lg"
			>
				Add To Cart
			</button>
		</div>
	);
}

ProductItem.propTypes = {
	product: PropTypes.object,
};

export default ProductItem;
