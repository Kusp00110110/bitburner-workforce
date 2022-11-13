const DEF_DELAY = 1000;
const ONE_DAY = 86400000

/** @param {NS} ns */
export async function main(ns) {
    var count = 0
    var max = 100

    while (count <= max) {
        // Scan public hosts
        var list = ns.scan();
        var promises = []

        // Enumerate over the hosts
        for (let index in list) {
            let host = list[index]
            //Can we hack this guy?
            if (ns.hackAnalyze(host)) {

                //Do we need root access
                if (!ns.hasRootAccess(host)) {
                    ns.nuke(host);
                }
            }
            
            // fill the coffers
            while (ns.getServerMoneyAvailable() < getServerMaxMoney() * 0.8) {
                promises.push(ns.grow(host));
            }

            // break down the security
            promises.push(await ns.hack(host));
            promises.push(await ns.weaken(host));
        }
        count++;
        sleep(ONE_DAY);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}