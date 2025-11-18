import { BlockradarClient } from '../src';
async function run() {
    const client = new BlockradarClient({ apiKey: 'test_key', environment: 'test' });
    try {
        const res = await client.wallets.getWallet('wallet_id');
        console.log(res.message);
    }
    catch (e) {
        console.error(String(e));
    }
}
run();
//# sourceMappingURL=quickstart.js.map