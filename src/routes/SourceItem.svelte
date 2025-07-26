<script lang="ts">
	import type { Source } from "$lib/types"

	let { source }: { source: Source } = $props()
</script>

<div class={[source.ready ? "text-green" : "text-red"]}>
	{#if source.ready}
		{source.text} ({source.tokenCount} tokens)
	{:else}
		{source.text}
	{/if}
</div>
