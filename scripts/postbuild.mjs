import { copyFileSync, readFileSync, writeFileSync } from "node:fs"

const cjsPath = new URL("../dist/index.cjs", import.meta.url)
const dtsPath = new URL("../dist/index.d.ts", import.meta.url)
const ctsPath = new URL("../dist/index.d.cts", import.meta.url)

const marker = "module.exports = Object.assign(Iframe, exports);"
const cjs = readFileSync(cjsPath, "utf8")
if (!cjs.includes(marker)) {
	writeFileSync(cjsPath, `${cjs.trimEnd()}\n${marker}\n`)
}

copyFileSync(dtsPath, ctsPath)
