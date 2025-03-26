import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

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
		},
	},
	plugins: [react({}), tailwindcss()],
});
