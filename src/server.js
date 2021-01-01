import * as sapper from "@sapper/server"; // eslint-disable-line import/no-unresolved
import compression from "compression";
import express, { Express } from "express";
import sirv from "sirv";
import { createApolloServer } from "./graphql";

const PORT = process.env.PORT; // eslint-disable-line prefer-destructuring
const mode = process.env.NODE_ENV;
const dev = mode === "development";

const main = require.main === module || require.main?.filename.match(/__sapper__\/build\/index.js$/);

const createSapperAndApolloServer = async (graphqlPath = "/graphql") => {
	const app = express();

	const apolloServer = await createApolloServer();
	apolloServer.applyMiddleware({ app, path });

	if (main) {
		app.use(sirv("static", { dev }));
	}

	app.use(
		compression({ threshold: 0 }),
		sapper.middleware(),
	);

	return app;
};

if (main) {
	createSapperAndApolloServer("/graphql").then((app) => {
		app.listen(PORT, (err) => { // eslint-disable-line
			if (err) console.log("error", err);
		});
	});
}

export { createSapperAndApolloServer };

// For more Cloud Functions, write and export them here
// and import and set them up in `/index.js`
