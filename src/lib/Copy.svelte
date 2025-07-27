<script lang="ts">
	let { text } = $props<{ text: string | (() => string) }>()

	let copied = $state(0)

	async function onclick() {
		if (typeof text === "function") text = text()
		await navigator.clipboard.writeText(text)
		copied++
		await new Promise((resolve) => setTimeout(resolve, 1000))
		copied--
	}
</script>

<button {onclick} class="rounded-full p-2.5 text-gray-5 transition active:(bg-gray-2 text-gray-7) hover:(bg-gray-1 text-gray-6) focus-visible:(outline-none ring-2 ring-offset-2 ring-blue-5)">
	{#if copied}
		<div class="i-tabler-copy-check-filled"></div>
	{:else}
		<div class="i-tabler-copy"></div>
	{/if}
</button>
