<script>
	import "uno.css"
	import "@unocss/reset/tailwind.css"
	import "$lib/orbix.css"

	let { children } = $props()
</script>

<div class="m-3vmax mx-auto max-w-full w-lg flex flex-col gap-2 p-3">
	<header class="flex flex-col items-center gap-1">
		<h2 class="font-mono op-30">
			<span class="op-30">/</span>
			a system message composer
			<span class="op-30">/</span>
		</h2>
		<h1 class="text-xl text-#f48529 tracking-widest font-orbix uppercase">Context Manager</h1>
	</header>
	<main class="b-1 p-3">
		{@render children()}
	</main>
</div>
