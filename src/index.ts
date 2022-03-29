import 'reflect-metadata';
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server";
import * as path from "path";
import {DataSource} from "typeorm";
import {Container} from "typedi";

const bootstrap = async () => {
	//TODO: export data source from other file, set as service
	const dataSource = new DataSource({
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "test",
		password: "test",
		database: "test",
		synchronize: true,
		logging: true,
		entities: [],
		subscribers: [],
		migrations: [],
	});

	const schema = await buildSchema({
		resolvers: [] as any,
		emitSchemaFile: path.resolve(__dirname, "schema.gql"),
		container: Container
	});

	const server = new ApolloServer({ schema })

	server.listen().then(({ url }: {url: string}) => {
		console.log(`🚀  Server ready at ${url}`)
	})
};
bootstrap();