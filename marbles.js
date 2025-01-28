import { Client } from "tmi.js"; //Imports the Client Object from tmi.js package (Use NPM install tmi.js)
import "dotenv/config"; //Imports the dotenv package for environment variables (Use NPM install dotenv)

const client = new Client({ 
	options: { debug: true }, 
	identity: {
		username: process.env.botuser, //Grabs the bots name dotenv file
		password: process.env.botpass, //Grabs the bots oauth  dotenv file
	},
	channels: ["doctorsmooth"], //Array of channels you want your bot to join
});

//Starts the bot by connecting client to twitch IRC
client.connect()
.then(() => {
	console.log("Bot Online!")
})

// Global variable
let playing = false;

// client on function to listen to messages
client.on("message", async (channel, tags, message, self) => {
	if (self) return; // This ignores messages from yourself.
	var args = message.slice(1, message.length).split(" ");
	
	if(args[0] === "play"){
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



