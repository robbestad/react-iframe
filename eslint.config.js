import eslint from "@eslint/js"
import reactHooks from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default tseslint.config(
	{
		ignores: ["dist/**", "demo/dist/**", "demo/node_modules/**", "coverage/**"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["src/**/*.{ts,tsx}", "demo/**/*.{ts,tsx}"],
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
		},
	},
)
