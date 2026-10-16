<script lang="ts">
    import { getModalContext } from "#lib/context/modalContext.js";
    import { type Snippet } from "svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const context = getModalContext();
    let modal: HTMLDivElement | undefined = $state();
    let dragTranslation = $state(0);
    let dragStartPos = $state(-1);

    function dragStart(posY: number) {
        if (modal) {
            if (context.isOpen && posY < modal.offsetTop) context.close();
            else if (
                context.isOpen &&
                modal &&
                posY >= modal.offsetTop - 10 &&
                posY <= modal.offsetTop + 20
            )
                dragStartPos = posY;
        }
    }
    function dragMove(posY: number) {
        if (dragStartPos > 0) dragTranslation = posY - dragStartPos;
    }
    function dragEnd() {
        dragStartPos = -1;
        if (modal && modal.offsetTop + dragTranslation > modal.clientHeight / 2)
            context.close();
        dragTranslation = 0;
    }
</script>

<svelte:window
    onmousedown={(e) => dragStart(e.clientY)}
    ontouchstart={(e) => dragStart(e.touches[0].clientY)}
    onmousemove={(e) => dragMove(e.clientY)}
    ontouchmove={(e) => dragMove(e.touches[0].clientY)}
    onmouseup={(_) => dragEnd}
    ontouchend={(_) => dragEnd}
/>

<div
    bind:this={modal}
    class:hidden={!context.isOpen}
    class="modal"
    role="dialog"
    aria-modal="true"
    style={"translate: 0 " + dragTranslation + "px"}
>
    <!-- <div draggable="true" class="handle"></div> -->
    {@render children?.()}
</div>

<style>
    .modal {
        position: absolute;
        top: 10%;
        animation: 0.2s fly ease-out;
        width: 100%;
        height: 90%;
        background-color: #fff;
        border-radius: var(--rounded-xl) var(--rounded-xl) 0 0;
        display: flex;
        padding: 20px;
    }
    .modal::after {
        content: "";
        width: 40%;
        height: 5px;
        border-radius: 10px;
        background-color: #0005;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .hidden {
        display: none;
    }

    @keyframes fly {
        0% {
            top: 100%;
        }
    }
</style>
