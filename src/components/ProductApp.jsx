import React, { useReducer } from "react";
import productReducer, { initalProductState } from "../reducers/productReducer";
import types from "../types";

const ProductApp = () => {


	const [productState, dispatch] = useReducer(productReducer,initalProductState);

	const { products, cart, activeProduct } = productState;

	return (
		<div>
			<h2>Productos </h2>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.id}>
                            
							{product.title}  <br></br><h5>Price :{product.price}</h5>
                            <br></br>
							<button
								onClick={() =>
									dispatch({
										type: types.producAddToCart,
										payload: product.id,
									})
								}
							>
								           Add to cart
							</button>

							<button
								onClick={() =>
									dispatch({
										type: types.producShow,
										payload: product,
									})
								}
							>
								Show
							</button>
						</li>
					);
				})}
			</ul>



			<h2>Cart </h2>
			<ul>
				{cart.map((product) => {
					return (
						<li key={product.id}>
							{product.title}
							Price :{product.price}
							<button
								onClick={() =>
									dispatch({
										type: types.producRemoveFromCart,
										payload: product.id,
									})
								}
							>
								Remove All
							</button>
							<button
								onClick={() =>
									dispatch({
										type: types.producRemoveOneFromCart,
										payload: product.id,
									})
								}
							>
								Remove One
							</button>
							<h2>Cantidad: {product.quantity}</h2>
						</li>
					);
				})}
			</ul>



			<button onClick={() => dispatch({ type: types.productCostInCart })}>

				Pagar
			</button>
			<h2> Total: {productState.total}</h2>

			<h2> Preview</h2>

			<p>{activeProduct.title}</p>
		</div>
	);
};

export default ProductApp;
