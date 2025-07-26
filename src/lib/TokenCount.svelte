<script lang="ts">
	import NumberFlow from "@number-flow/svelte"

	let { value, fancy = false } = $props<{ value: number; fancy?: boolean }>()
</script>

<div class={["transition-opacity tracking-wide", !value && "op-0", fancy ? "font-orbix uppercase fancy" : "lowercase"]}>
	<NumberFlow {value} format={{ notation: "compact" }} locales="en" suffix={value < 1 ? "token" : "tokens"} />
</div>

<style>
	.fancy :global(number-flow-svelte::part(number)),
	.fancy :global(number-flow-svelte::part(compact)) {
		/* prettier-ignore */
		--uno: text-#f48529;
	}

	:global(number-flow-svelte::part(suffix)) {
		/* prettier-ignore */
		--uno: ml-0.5;
	}

	.fancy :global(number-flow-svelte::part(suffix)) {
		/* prettier-ignore */
		--uno: ml-1 op-30 before:(mr-0.5 op-20 content-['/']);
	}
</style>
