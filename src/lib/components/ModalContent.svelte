<script lang="ts">
    import { getModalContext } from "#lib/context/modalContext.js";
    import { type Snippet } from "svelte";
    import { Tween } from "svelte/motion";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const context = getModalContext();
    let modal: HTMLDivElement | undefined = $state();
    let screenHeight: number = $state(0);
    const offset = $derived(new Tween(screenHeight));
    let dragStartPos = $state(-1);

    function dragStart(posY: number) {
        if (modal) {
            if (context.isOpen && posY < modal.offsetTop) {
                // modal open, click above modal
                context.close();
            } else if (
                context.isOpen &&
                posY >= modal.offsetTop - 10 &&
                posY <= modal.offsetTop + 20
            )
                // modal open, click on handle
                dragStartPos = posY;
        }
    }
    function dragMove(posY: number) {
        // if dragging set offset target
        if (dragStartPos > 0) offset.target = Math.max(0, posY - dragStartPos);
    }
    function dragEnd() {
        // if dragging and is below height / 2.5
        if (modal && dragStartPos > 0 && offset.target > screenHeight / 2.5) {
            offset.set(screenHeight).then((_) => {
                context.close();
            });
        } else offset.target = 0;
        dragStartPos = -1;
    }
</script>

<svelte:window
    onmousedown={(e) => dragStart(e.clientY)}
    ontouchstart={(e) => dragStart(e.touches[0].clientY)}
    onmousemove={(e) => dragMove(e.clientY)}
    ontouchmove={(e) => dragMove(e.touches[0].clientY)}
    onmouseup={(_) => dragEnd()}
    ontouchend={(_) => dragEnd()}
    bind:innerHeight={screenHeight}
/>

<div
    bind:this={modal}
    class:hidden={!context.isOpen}
    class="modal"
    role="dialog"
    aria-modal="true"
    data-offset="{offset.current}px"
>
    <!-- <div draggable="true" class="handle"></div> -->
    {@render children?.()}
</div>

<style>
    .modal {
        position: fixed;
        top: calc(10% + attr(data-offset type(<length>)));
        /* animation: 0.2s fly ease-out; */
        width: 100%;
        height: 90%;
        background-color: #fff;
        border-radius: var(--rounded-xl) var(--rounded-xl) 0 0;
        display: flex;
        padding: 20px;
        touch-action: none;
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
        cursor: grab;
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
