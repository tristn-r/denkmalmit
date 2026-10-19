<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    let { children, ...props }: HTMLButtonAttributes = $props();
</script>

<button {...props} class="button">
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
