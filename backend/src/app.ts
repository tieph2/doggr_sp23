import Fastify, {FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import config from "./db/mikro-orm.config.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";

const app = Fastify();

await app.register(FastifyMikroOrmPlugin, config);

app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
	return 'Hello';
});

app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
	return request.em.find(User, {});
});

export default app;