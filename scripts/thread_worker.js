const DEF_DELAY = 1000;
const ONE_DAY = 86400000

/** @param {NS} ns */
export async function main(ns) {
    var count = 0
    var max = 100

    while (count <= max) {
        var list = ns.scan();
        var promises = []
        for (let index in list) {
            let host = list[index]
            if (ns.hackAnalyze(host)) {
                ns.nuke(host);
            }
            promises.push(await ns.hack(host));
            promises.push(await ns.grow(host));
            promises.push(await ns.weaken(host));
        }
        while (true) {
            let responses = await Promise.all(promises)
        }
        count++;
        sleep(ONE_DAY);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}