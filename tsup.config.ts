import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	splitting: false,
	external: ["react", "react-dom"],
	onSuccess: "node scripts/postbuild.mjs",
})
