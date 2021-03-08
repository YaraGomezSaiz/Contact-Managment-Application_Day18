import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";

import { Contacts } from "./views/Contacts.js";
import { AddContact } from "./views/AddContact.js";
import Navbar from "./component/navbar.js";

export const Layout = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Switch>
						<Route
							exact
							path="/index.html"
							render={() => (
								<div>
									<Navbar />
									<Contacts />
								</div>
							)}
						/>
						<Route
							exact
							path="/"
							render={() => (
								<div>
									<Navbar />
									<Contacts />
								</div>
							)}
						/>
						<Route exact path="/contacts" component={Contacts} />
						<Route
							exact
							path="/add"
							render={() => (
								<div>
									<Navbar />
									<AddContact />
								</div>
							)}
						/>
						<Route
							exact
							path="/edit"
							render={() => (
								<div>
									<Navbar />
									<AddContact />
								</div>
							)}
						/>

						<Route render={() => <h1 className="notfound">Not found!</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
