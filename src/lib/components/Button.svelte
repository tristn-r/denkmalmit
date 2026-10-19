<script lang="ts">
    import type { Snippet } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let {
        id,
        onclick,
        children,
    }: {
        id?: string;
        onclick: MouseEventHandler<HTMLButtonElement>;
        children: Snippet;
    } = $props();
</script>

<button {id} {onclick} class="button">
    {@render children?.()}
</button>

<style>
    .button {
        background-color: var(--col-bg);
        border: var(--border);
        border-radius: var(--rounded-md);
        box-shadow: var(--shadow-sm);
        font-size: 1.4rem;
        font-weight: 600;
        padding: 4px 8px;

        &:focus-visible {
            outline: none;
        }
    }
</style>
