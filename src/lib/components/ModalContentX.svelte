<script lang="ts">
    import { X } from "@lucide/svelte";
    import { type Snippet } from "svelte";
    import { getModalContext } from "#lib/context/modalContext.js";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const context = getModalContext();
    let screenHeight = $state(0);

    function handleClick(e: MouseEvent) {
        if (e.y < screenHeight * 0.1) {
            context.close();
        }
    }
</script>

<svelte:window onclick={handleClick} bind:innerHeight={screenHeight} />

<div
    class:hidden={!context.isOpen}
    class="modal"
    role="dialog"
    aria-modal="true"
>
    <button class="close" onclick={context.close}>
        <X size="2rem" color="var(--col-text)" />
    </button>
    {@render children?.()}
</div>

<style>
    .modal {
        position: fixed;
        top: 10%;
        animation: 0.2s fly-in ease-out forwards;
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: var(--rounded-xl) var(--rounded-xl) 0 0;
        display: flex;
        flex-direction: column;
        padding: 0.4rem 0.8rem;
        touch-action: none;
    }
    .hidden {
        animation: 0.2s fly-out ease-out forwards;
    }

    .close {
        position: absolute;
        top: 1rem;
        right: 0.8rem;
        cursor: pointer;
    }

    @keyframes fly-in {
        0% {
            top: 100%;
        }
    }
    @keyframes fly-out {
        100% {
            top: 100%;
            display: none;
        }
    }
</style>
