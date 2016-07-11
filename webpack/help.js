import colors from "colors";

export default function() {
    // usage
    console.log("Usage:".green);
    console.log("    wpl [options] [arguments]");
    console.log();
    // available commands
    console.log("Available commands:".green);
    console.log("    add".green + "                 Create app."); // add
    console.log("    remove".green + "              Remove app."); // remove
    console.log("    ls, list".green + "            Display all app list."); // list
    console.log("    develop".green + "             Run local web server for develop environment."); // develop
    console.log("    deploy".green + "              Deploy file."); // deploy
    console.log();
    // options
    console.log("Options:".green);
    console.log("    -H, --host".green + "          Web server hostname. (Default: localhost)");
    console.log("    -P, --port".green + "          Web server port. (Default: 8888)");
    console.log("    --no-color".green + "          Run local web server for develop environment.");
    console.log("    -h, --help".green + "          Deploy file.");
};
