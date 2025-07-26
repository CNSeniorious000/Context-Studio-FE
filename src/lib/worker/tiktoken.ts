import { get_encoding, init } from "tiktoken/init"

export async function initTokenizer() {
	const wasmModule = await import("tiktoken/tiktoken_bg.wasm?url")
	const wasmResponse = await fetch(wasmModule.default)
	const wasmBytes = await wasmResponse.arrayBuffer()

	await init((imports) => WebAssembly.instantiate(wasmBytes, imports))

	return get_encoding("cl100k_base")
}

const enc = await initTokenizer()

export async function countToken(text: string) {
	return enc.encode(text).length
}

import.meta.hot?.dispose(() => {
	enc.free()
})
