
/** @param {NS} ns */
export async function main(ns) {

    server = args[0]

    // Declare our variables
    server = args[1];

    // Whats our action?
        script = "/scripts/master_worker.script";
        scp('/scripts/attack/*.js’, server')

    ns.killall(server);;
    exec("/scripts/copy_scripts.script", "home", 1, server)

    threads = parseInt(getServerMaxRam(server) / getScriptRam(script))
    exec(script, server, threads, server)

    tprint(action, " executed on ", server, " with ", threads, " threads")
}