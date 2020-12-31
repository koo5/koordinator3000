import * as sapper from "@sapper/server"; // eslint-disable-line import/no-unresolved
import compression from "compression";
import express, { Express } from "express";
import sirv from "sirv";
import { createApolloServer } from "./graphql";
import { auth } from 'express-openid-connect'

const PORT = process.env.PORT; // eslint-disable-line prefer-destructuring
const mode = process.env.NODE_ENV;
const dev = mode === "development";

const main = require.main === module || require.main?.filename.match(/__sapper__\/build\/index.js$/);

const createSapperAndApolloServer = async (graphqlPath = "/graphql"): Promise<Express> => {
	const app = express();

	const apolloServer = await createApolloServer();
	apolloServer.applyMiddleware({ app, path: graphqlPath });

	if (main) {
		app.use(sirv("static", { dev }));
	}

	app.use(
		compression({ threshold: 0 }),
		auth({
		  required: false,
		  auth0Logout: true,
		  baseURL: 'http://localhost:3000',
		  issuerBaseURL: 'https://your-hosted-url.auth0.com',
		  clientID: 'your-client-id',
		  appSession: {secret: 'your-session-secret'}
		}),
		(req, res, next) => {
		  return sapper.middleware({
			session: () => {
			  return {
				isAuthenticated: req.isAuthenticated(),
				  bla:"bla",
				user: req.openid.user
			  }
			}
		  })(req, res, next)},
		sapper.middleware(),
	);

	return app;
};

if (main) {
	createSapperAndApolloServer("/graphql").then((app) => {
		app.listen(PORT, (err?: any): void => { // eslint-disable-line
			if (err) console.log("error", err);
		});
	});
}

export { createSapperAndApolloServer };

// For more Cloud Functions, write and export them here
// and import and set them up in `/index.js`
