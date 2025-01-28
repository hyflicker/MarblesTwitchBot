import { Client } from "tmi.js";
import "dotenv/config";
var prefix = "!";
export const client = new Client({
	options: { debug: true },
	identity: {
		username: process.env.botuser,
		password: process.env.botpass,
	},
	channels: ["doctorsmooth"],
});

client.connect()
.then(() => {
	console.log("Bot Online!")
})

let playing = false;

client.on("message", async (channel, tags, message, self) => {
	if (self) return;
	var args = message.slice(1, message.length).split(" ");

	if(args[0] === "play"){
		// console.log(tags)
		if((playing === false) && ((tags.mod === true) || (tags.vip === true) || ((tags.username.toLowerCase() === "doctorsmooth")))){
			playing = true;
			client.say(channel,"!play");
			let d = new Date();
			let timestamp = `[${d.getHours()}:${d.getMinutes()}] Marbles: `;
			console.log(timestamp, `Joined Marbles on ${channel} stream.`)
			setTimeout(() => {
				playing = false;
			}, 120000);
		}
	}
});



