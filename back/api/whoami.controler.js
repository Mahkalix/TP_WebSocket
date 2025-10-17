import { networkInterfaces } from 'os';

export class WhoIAmController {
    static get(req, res) {
        const interfaces = networkInterfaces();
        const addresses = [];

        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    addresses.push(iface.address);
                }
            }
        }

        res.json({ ip: addresses });
    }
}