const os = require("os");

class WhoIAmController {
    static get(req, res) {
        const interfaces = os.networkInterfaces();
        const addresses = [];

        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    addresses.push(iface.address);
                }
            }
        }

        res.json({ ip: addresses });
    }
}

module.exports = WhoIAmController;
