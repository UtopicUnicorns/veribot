//NPM and such
const npm = require("./modules/NPM.js");
npm.npm();

//Shit
const client = new Client();

//Bot ready
client.once("ready", () => {
  //look at that a fucking welcome message to the console
  console.log(moment().format("MMMM Do YYYY, HH:mm:ss") + "\nBot ready");

  //next
});

//Reconnect
client.once("reconnecting", () => {
  //oh ok
  console.log(moment().format("MMMM Do YYYY, HH:mm:ss") + "\nBot reconnected");

  //next
});

//new member
client.on("guildMemberAdd", async (guildMember) => {
  //load module
  const onGuildMemberAdd = require("./modules/on_guildmemberadd.js");
  onGuildMemberAdd.onGuildMemberAdd(guildMember);

  //next
});

//the best thing here
client.on("message", async (message) => {
  //load module
  const onMessage = require("./modules/on_message.js");
  onMessage.onMessage(message);

  //next
});

//worthless errors, ignoring them fuck you
client.on("error", (e) => {});
client.on("warn", (e) => {});
client.on("debug", (e) => {});

//And login in the bot
client.login(configfile.token);
