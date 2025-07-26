import type { countToken as count } from "./worker"

import { wrap } from "comlink"

const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" })

export const countToken = wrap<typeof count>(worker)
