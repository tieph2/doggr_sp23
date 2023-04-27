import 'chai/register-should.js';

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from '../src/app.js';

teardown( () => app.close());

test( "Request the /hello route", async () => {
	const response = await app.inject({
	  method: 'GET',
	  url: "/hello"
	});
	response.statusCode.should.equal(200);
	response.body.should.equal("Hello");
});


test( "List all users from /deTest", async () => {
	const response = await app.inject({
		method: "GET",
		url: "/dbTest"
	});
	
	response.statusCode.should.equal(200);
});