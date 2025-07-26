import { createFetch } from "xsfetch"

const fetch = createFetch({ debug: true })

export async function markitdown(body: File) {
    const res = await fetch("https://context-extractors.zeabur.app/markitdown", { method: "POST", body, headers: { "content-type": "application/octet-stream" } })
    if (res.ok) {
        const text = await res.text()
        return { text, title: JSON.parse(res.headers.get("title")!), tokenCount: JSON.parse(res.headers.get("token-count")!) }
    }
    throw new Error(`Failed to markitdown: ${res.status} ${res.statusText}`)
}
