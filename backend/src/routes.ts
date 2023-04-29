import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import app from "./app.js";
import {User} from "./db/entities/User.js";
import {ICreateUserBody} from "./types.js";



async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fasityf instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'Hello';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	
	//CRUD
	
	//C
	app.post<{ Body: ICreateUserBody }>("/users", async(req, reply) => {
		const {name, email, petType} = req.body;
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				petType
			});
			
			await req.em.flush();
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
	
	//R
	app.search( "/users", async (req, reply) => {
		const {email} = req.body;
		
		try {
			const theUser = await req.em.findOne(User, {email});
			console.log(theUser);
			reply.send(theUser);
		} catch(err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	//U
	app.put<{ Body: ICreateUserBody }>( "/users", async(req, reply) => {
		const { name, email, petType} = req.body;
		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		userToChange.petType = petType;
		
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
	});
	
	//D
	
	app.delete<{ Body: {email} }>("/users", async(req, reply) => {
		const {email} = req.body;
		
		try {
			const theUser = await req.em.findOne(User, {email});
			await req.em.remove(theUser)
				.flush();
			console.log(theUser);
			reply.send(theUser);
		} catch(err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
}

export default DoggrRoutes;