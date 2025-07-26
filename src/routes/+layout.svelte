<script>
	import "uno.css"
	import "@unocss/reset/tailwind.css"
	import "$lib/orbix.css"

	let { children } = $props()
</script>

<div class="group min-h-screen bg-gray-50 py-6">
	<div class="mx-auto my-5vmax max-w-full w-lg flex flex-col gap-6 p-3">
		<header class="flex flex-col animate-(fade-in duration-600) items-center gap-1">
			<h2 class="font-mono op-30">
				<span class="op-30">/</span>
				a system message composer
				<span class="op-30">/</span>
			</h2>
			<h1 class="animate-(fade-in delay-100) text-xl text-#f48529 tracking-widest font-orbix uppercase transition duration-500 group-hover:duration-1000 !group-hover:text-gray-3">Conte<span class="!text-#f48529">x</span>t Studio</h1>
		</header>
		<main class="rounded-lg bg-white p-4 shadow-(gray-4/10 lg)">
			{@render children()}
		</main>
	</div>
</div>
