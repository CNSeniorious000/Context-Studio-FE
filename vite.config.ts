import { sveltekit } from "@sveltejs/kit/vite"
import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"
import wasm from "vite-plugin-wasm"

export default defineConfig({
	plugins: [sveltekit(), UnoCSS(), wasm()]
})
