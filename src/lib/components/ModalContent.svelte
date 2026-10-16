<script lang="ts">
    import { getModalContext } from "$lib/context/modalContext";
    import { type Snippet } from "svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const modal = getModalContext();
</script>

<div class:hidden={!modal.isOpen}>
    {@render children?.()}
</div>

<style>
    .hidden {
        display: none;
    }
</style>
