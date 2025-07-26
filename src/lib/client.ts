import { createFetch } from "xsfetch"

const fetch = createFetch({ debug: true })

export async function markitdown(body: File) {
	const res = await fetch("https://context-extractors.zeabur.app/markitdown", { method: "POST", body, headers: { "content-type": "application/octet-stream" } })
	if (res.ok) {
		return await res.text()
	}
	throw new Error(`Failed to markitdown: ${res.status} ${res.statusText}`)
}
