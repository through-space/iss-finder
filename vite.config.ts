import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import * as fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@ui-components": path.resolve(__dirname, "./src/ui-components"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@common-types": path.resolve(__dirname, "./src/common-types"),
			"@stores": path.resolve(__dirname, "./src/stores"),
			"@features": path.resolve(__dirname, "./src/features"),
		},
	},
	server: {
		https: {
			key: fs.readFileSync(
				path.resolve(__dirname, "certs/iss-finder-key.pem"),
			),
			cert: fs.readFileSync(
				path.resolve(__dirname, "certs/iss-finder.pem"),
			),
		},
		host: true, // needed to access from other devices
	},
	plugins: [react({}), tailwindcss()],
});
