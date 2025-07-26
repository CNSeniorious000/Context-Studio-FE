<script lang="ts">
	import type { Source } from "$lib/types"

	let { source }: { source: Source } = $props()
</script>

{#if source.ready}
	<div class="text-red">
		{source.text}
	</div>
{:else}
	{source.type}
{/if}
