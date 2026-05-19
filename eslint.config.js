import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginImport from "eslint-plugin-import";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
	{
		ignores: [
			"dist",
			"build",
			"node_modules",
			"vite.config.ts",
			"eslint.config.js",
		],
	},

	js.configs.recommended,

	...tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	pluginReact.configs.flat.recommended,

	...pluginQuery.configs["flat/recommended"],

	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
		plugins: {
			import: pluginImport,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		rules: {
			"no-undef": "error",
			"prefer-const": "error",
			"no-console": "warn",
			eqeqeq: ["error", "always"],

			"react/jsx-no-undef": ["error", { allowGlobals: false }],
			"react/react-in-jsx-scope": "off",
			"react/jsx-use-react": "off",
			"react/prop-types": "off",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			"import/no-unresolved": "error",
			"import/named": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					vars: "all",
					args: "after-used",
					argsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
		},
		settings: {
			react: { version: "detect" },
			"import/resolver": {
				node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
				typescript: { project: "./tsconfig.app.json" },
			},
		},
	},

	{
		files: ["**/*.{js,mjs,cjs}"],
		...tseslint.configs.disableTypeChecked,
	},
);
