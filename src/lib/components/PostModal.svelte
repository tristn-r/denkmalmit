<script>
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";
    import ModalContentX from "./ModalContentX.svelte";
    import ModalTrigger from "./ModalTrigger.svelte";
</script>

<Modal>
    <ModalTrigger id="post-form-trigger">Frage stellen</ModalTrigger>
    <ModalContentX>
        <h1>Frage formulieren</h1>
        <label class="form-label">
            <p>Name <span class="optional">optional</span></p>
            <input type="text" class="form-input" />
        </label>
        <Button type="submit">Frage absenden</Button>
    </ModalContentX>
</Modal>

<style>
    :global(#post-form-trigger) {
        position: fixed;
        bottom: 30px;
        transition: scale 0.15s ease-out;

        &:active {
            scale: 0.97;
            outline: none;
        }
    }

    .form-label {
        display: flex;
        flex-direction: column;
    }

    .form-input {
        font-size: 2rem;
        border: var(--border);
        box-shadow: var(--shadow);
    }

    .optional {
        color: var(--col-secondary);
    }
</style>
