import type { countToken as count } from "./worker"
import Worker from "./worker?worker"

import { wrap } from "comlink"

export const countToken = wrap<typeof count>(new Worker())
