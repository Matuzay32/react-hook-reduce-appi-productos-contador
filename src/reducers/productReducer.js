import { useReducer } from "react";
import types from "../types";

const initalProductState = {
	products: [
		{ id: 1, title: "CocaCola", price: 150 },
		{ id: 2, title: "Flan", price: 150 },
		{ id: 3, title: "Hamburguesas", price: 1400 },
	],

	cart: [],

	activeProduct: {  },
	total: 0,
};

const productReducer = (state, action) => {
	if (action.type === types.producShow) {
		return {
			...state,
			activeProduct: action.payload,
		};
	}

	if (action.type === types.producAddToCart) {
		const id = action.payload;

		const searchProduct = state.products.find((element) => element.id === id);

		const inTheCart = state.cart.find((element) => element.id === id);

		const newProduct = { ...searchProduct, };


		return inTheCart
			? {
					...state,
					cart: state.cart.map((product) =>
						product.id === id
							? { ...product, quantity: product.quantity + 1 }
							: product
					),
			  }
			: { ...state, cart: [...state.cart, { ...newProduct, quantity: 1 }] };
	}

	if (action.type === types.producRemoveFromCart) {
		return {
			...state,
			cart: state.cart.filter((product) => product.id !== action.payload),
		};
	}

	if (action.type === types.producRemoveOneFromCart) {
		const productDelete = state.cart.find((e) => e.id === action.payload);

		return productDelete.quantity > 1
			? {
					...state,

					cart: state.cart.map((product) =>
						product.id === action.payload
							? { ...product, quantity: product.quantity - 1 }
							: product
					),
			  }
			: {
					...state,

					cart: state.cart.filter((e) => e.id !== action.payload),
			  };
	}

	if (action.type === types.productCostInCart) {
		return {
			...state,
			total: state.cart
				.map((e) => e.price * e.quantity)
				.reduce((prev, currentValue) => prev + currentValue),
		};
	}

	return state;
};

export { initalProductState };

export default productReducer;
