<script lang="ts">
    import { X } from "@lucide/svelte";
    import { type Snippet } from "svelte";
    import { getModalContext } from "#lib/context/modalContext.js";
    import Button from "./Button.svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const context = getModalContext();
    let modal: HTMLDialogElement | undefined = $state();
    let screenHeight = $state(0);

    $effect(() => {
        if (!modal) return;
        modal.addEventListener("close", () => {
            context.close();
        });
    });

    $effect(() => {
        if (!context.isOpen || !modal) return;
        modal.showModal();
    });

    function closeModal() {
        context.close();
        if (modal) modal.close();
    }

    function handleClick(e: MouseEvent) {
        if (e.y < screenHeight * 0.1) closeModal();
    }
</script>

<svelte:window onclick={handleClick} bind:innerHeight={screenHeight} />

<dialog bind:this={modal} class="modal">
    <Button id="close" onclick={(_) => closeModal()} type="button">
        <X size="2rem" color="var(--col-text)" />
    </Button>
    <form method="dialog">
        {@render children?.()}
    </form>
</dialog>

<style>
    .modal {
        max-width: none;
        max-height: none;

        position: fixed;
        margin: auto;
        top: 20%;
        width: min(100%, 750px);
        height: 100%;
        animation: 0.2s fly-in ease-out;
        background-color: #fff;
        /* border-radius: var(--rounded-xl) var(--rounded-xl) 0 0; */
        flex-direction: column;
        padding: 0.4rem 0.8rem;
        touch-action: none;
        box-shadow: 0 0 10px 5px #fff5;

        &[open] {
            display: block;
        }
        &:not([open]) {
            display: flex;
            animation: 0.2s fly-out ease-out forwards;
        }
        &::backdrop {
            background-color: #0003;
        }
    }

    :global(#close) {
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
