//load modules
npm = require("./NPM.js");
npm.npm();

module.exports = {
  onMessage: async function (message) {
    //ignore bots
    if (message.author.bot) return;

    //Direct Message handle
    if (message.channel.type == "dm") {
      return message.reply("Hello!");
    }

    //verify
    function verifyHuman(message) {
      let captcha = new Captcha2();
      const attachment = new Discord.Attachment(
        captcha.PNGStream,
        "captcha.png"
      );
      message.channel.send(
        "**Enter the text shown in the image below:**",
        attachment
      );
      let collector = message.channel.createMessageCollector(
        (m) => m.author.id === message.author.id
      );
      collector.on("collect", (m) => {
        if (m.content.toUpperCase() === captcha.value) {
          //add Role
          //Create a role called members, set up your channel permissions to only see the channels members are supposed to see
          let roleadd = message.guild.roles.find((r) => r.name === "~/Members");
          message.guild.members.get(message.author.id).addRole(roleadd).catch(console.error);

          //del Role
          //Create a role called muted make them only see what new members may see
          let roledel = message.guild.roles.find((r) => r.name === "Muted");
          message.guild.members.get(message.author.id).removeRole(roledel).catch(console.error);

          message.channel.send("Verified Successfully!");
        } else {
          message.channel.send("Failed Verification!\ntry again with `verify me`");
          collector.stop();
        }
      });
    }

    //start verification
    //change to your own channel
    if (message.channel.id === "661927473713381386") {
      //trigger to activate verify
      if (message.content == "verify me") {
        verifyHuman(message);
      }
    }

    //next
  },
};
