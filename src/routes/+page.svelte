<script lang="ts">
	import type { Source } from "$lib/types"
	import SourceItem from "./SourceItem.svelte"

	let sources = $state<Source[]>([])

	sources.push({ id: "1", ready: true, text: "Hello", type: "text", tokenCount: "100" })
	sources.push({ id: "2", ready: false, type: "text", tokenCount: "100" })
	sources.push({ id: "3", ready: true, text: "Hello", type: "text", tokenCount: "100" })
</script>

{#each sources as source (source.id)}
	<SourceItem {source} />
{/each}
