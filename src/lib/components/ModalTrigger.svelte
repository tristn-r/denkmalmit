<script lang="ts">
    import { getModalContext } from "$lib/context/modalContext";
    import type { Snippet } from "svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const modal = getModalContext();
</script>

<button class="modal-trigger" onclick={modal.open}>
    {@render children?.()}
</button>

<style>
    .modal-trigger {
        padding: 4px 8px;
        border: var(--border);
        border-radius: var(--rounding);
    }
</style>
