import { get_encoding } from "tiktoken"

const enc = get_encoding("cl100k_base")

export function countToken(text: string) {
	return enc.encode(text).length
}

import.meta.hot?.dispose(() => {
	enc.free()
})
