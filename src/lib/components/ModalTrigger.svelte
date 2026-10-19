<script lang="ts">
    import { getModalContext } from "#lib/context/modalContext.js";
    import type { Snippet } from "svelte";
    import Button from "./Button.svelte";

    let {
        id,
        children,
    }: {
        id?: string;
        children: Snippet;
    } = $props();

    const modal = getModalContext();
</script>

<Button {id} onclick={modal.open}>
    {@render children?.()}
</Button>
