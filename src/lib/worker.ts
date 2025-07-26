/// <reference lib="webworker" />

import { expose } from "comlink"

export function countToken(text: string) {
	return text.length
}

expose(countToken)
