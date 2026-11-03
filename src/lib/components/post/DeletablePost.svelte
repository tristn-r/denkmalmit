<script lang="ts">
    import Button from "#lib/components/button/Button.svelte";
    import type { Post } from "#lib/database.types.js";
    import { deletePost } from "#lib/remote/post.remote.ts";
    import { Trash } from "@lucide/svelte";

    let { post }: { post: Post } = $props();
    let time = $state("");

    $effect(() => {
        const date = new Date(post.time);
        time =
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0");
    });
</script>

<div class="post" lang="de">
    <span class="header">
        <span class="author">{post.author}</span>
        <span class="time"> </span>
        {time}
    </span>
    <h1>{post.text}</h1>
    <span class="voting">
        <Button
            id="delete-button"
            onclick={() => {
                deletePost({ id: post.id });
            }}
        >
            <Trash />
        </Button>
    </span>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: var(--border);
        border-radius: var(--rounding);
        background-color: var(--col-bg);
        box-shadow: 4px 4px #000;
        width: 100%;

        hyphens: auto;
        hyphenate-limit-chars: 14 5 5;
        overflow-wrap: break-word;

        & h1 {
            margin: 15px;
            line-height: 0.92;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;
    }
    .author {
        font-weight: 500;
    }

    .time {
        position: absolute;
        align-self: end;
    }

    .voting {
        display: flex;
        gap: 8px;
    }
    :global(#delete-button) {
        transition: background-color 0.2s ease;
        background-color: var(--col-bad);
    }
</style>
