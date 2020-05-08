//Load Packages
npm = require("./NPM.js");
npm.npm();

module.exports = {
  onGuildMemberAdd: async function (guildMember) {
    //ignore bots
    if (guildMember.user.bot) return;

    //add Role
    //Create a role called muted, and give the muted role permission to see the channels you want new members to see.
    //Then in the other channels make sure that the muted role cannot see them, by example using a members role.
    let roleadd = guildMember.guild.roles.find((r) => r.name === "Muted");
    guildMember.addRole(roleadd).catch(console.error);

    //Account age
    var cdate = moment.utc(guildMember.user.createdAt).format("YYYYMMDD");
    let ageS = moment(cdate, "YYYYMMDD").fromNow(true);
    let ageA = ageS.split(" ");

    //notify them
    let veriChan = guildMember.client.channels.get("661927473713381386");
    return veriChan.send(
      ageA.join(" ") +
        " " +
        guildMember.user +
        "\nWelcome, you need to verify yourself first!\nTo begin write `verify me`"
    );
  },
};
