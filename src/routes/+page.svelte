<script lang="ts">
	import { countToken } from "$lib/count"
	import type { Source } from "$lib/types"
	import SourceItem from "./SourceItem.svelte"

	let sources = $state<Source[]>([])

	sources.push({ id: "1", ready: false, type: "text", text: "Hello" })
	sources.push({ id: "2", ready: false, type: "text", text: "Hello".repeat(2) })
	sources.push({ id: "3", ready: false, type: "text", text: "Hello".repeat(3) })
	sources.push({ id: "4", ready: false, type: "text", text: "Hello".repeat(4) })
	;(async () => {
		sources.forEach(async (source) => {
			source.tokenCount = await countToken(source.text!)
			source.ready = true
		})
	})()
</script>

{#each sources as source (source.id)}
	<SourceItem {source} />
{/each}
