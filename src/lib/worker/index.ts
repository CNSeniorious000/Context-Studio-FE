/// <reference lib="webworker" />

import { expose } from "comlink"

export async function countToken(text: string) {
	const { countToken: count } = await import("./tiktoken")
	return count(text)
}

expose(countToken)
