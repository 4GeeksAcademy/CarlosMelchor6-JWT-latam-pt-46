import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link className="link-underline-primary link-offset-2" to="/">
					<span className="navbar-brand mb-0 h1 fs-3 text-primary fw-bolder" >
						<i className="fa-solid fa-book"></i>
						Diary.com
					</span>
				</Link>
			</div>
		</nav>
	);
};