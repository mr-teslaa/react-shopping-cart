import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductItem from "../../components/productItem";

const ProductListPage = () => {
	const { listOfProducts, loading } = useContext(ShoppingCartContext);
	if (loading) {
		return <h1>Loading........</h1>;
	}

	return (
		<div className="container mx-auto px-4">
			<div className="py-5">
				<h1 className="text-3xl text-center">
					Shop anything, from anywhere
				</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{listOfProducts.map((product) => (
					<ProductItem key={product?.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default ProductListPage;
