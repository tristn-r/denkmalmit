<script lang="ts">
    import { getModalContext } from "#lib/context/modalContext.js";
    import type { Snippet } from "svelte";

    let {
        id,
        children,
    }: {
        id: string;
        children: Snippet;
    } = $props();

    const modal = getModalContext();
</script>

<button {id} class="modal-trigger" onclick={modal.open}>
    {@render children?.()}
</button>

<style>
    .modal-trigger {
        font-size: 1.4rem;
        font-weight: 600;
        padding: 4px 8px;
        border: var(--border);
        border-radius: var(--rounding);
        cursor: pointer;
    }
</style>
