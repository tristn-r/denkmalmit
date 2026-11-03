<script lang="ts">
    import Button from "#lib/components/button/Button.svelte";
    import { enhance } from "$app/forms";

    let { form } = $props();
</script>

<form method="post" class="admin-form" use:enhance>
    {#if form?.message}
        <span style="color:red;">{form.message}</span>
    {/if}
    <label>
        Password
        <input type="password" name="password" required />
    </label>
    <Button type="submit" name="submit-button">Einloggen</Button>
</form>

<style>
    .admin-form {
        border: var(--border);
        border-radius: var(--rounding);
        box-shadow: var(--shadow);
        background-color: var(--col-bg);
        margin: auto;
        padding: 10%;
        padding-bottom: 15%;
        display: flex;
        flex-direction: column;
        gap: 12px;

        input {
            border: var(--border);
            border-radius: var(--rounded-md);
            box-shadow: var(--shadow);
            background-color: var(--col-bg);
            padding: 8px 12px;
            width: 100%;
        }
    }
</style>
