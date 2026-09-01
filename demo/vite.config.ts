import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	root,
	plugins: [react()],
	resolve: {
		alias: {
			"react-iframe": path.resolve(root, "../src/index.ts"),
		},
	},
	server: {
		port: 5173,
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
	},
})
