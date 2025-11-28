import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.CI ? "/nao-web-ui/" : "/",
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"@/assets": resolve(__dirname, "src/assets"),
			"@/components": resolve(__dirname, "src/components"),
			"@/contexts": resolve(__dirname, "src/contexts"),
			"@/hooks": resolve(__dirname, "src/hooks"),
			"@/lib": resolve(__dirname, "src/lib"),
			"@/pages": resolve(__dirname, "src/pages"),
			"@/providers": resolve(__dirname, "src/providers"),
			"@/services": resolve(__dirname, "src/services"),
			"@/stores": resolve(__dirname, "src/stores"),
			"@/types": resolve(__dirname, "src/types"),
			"@/utils": resolve(__dirname, "src/utils"),
		},
	},
	assetsInclude: ["**/*.json"],
	server: {
		host: "0.0.0.0",
		port: 5174,
		strictPort: true,
		open: false,
	},
});
