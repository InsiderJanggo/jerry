const { readdirSync } = require("fs");

const ascii = require("ascii-table");

let table = new ascii("Command");
table.setHeading("Command", "Load Status");

module.exports = (jerry) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                jerry.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => jerry.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}