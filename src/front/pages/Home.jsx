import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FormLogin } from "../components/FormLogin.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()



	return (
		<div className="text-center mt-5">
			<FormLogin />
		</div>
	);
}; 