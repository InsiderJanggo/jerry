module.exports = (jerry) => {
    const {TOKEN, VERSION} = process.env;
    console.log(`Logged in as ${jerry.user.tag}!`);
    console.log(`Version : ${VERSION}!`);
    jerry.user.setActivity("jerry is my prefix", {type: "STREAMING", url: "https://www.twitch.tv/doonalive"});
}