<script lang="ts">
    import type { Post } from "#lib/database.types.js";
    import { ChevronDown, ChevronUp } from "@lucide/svelte";
    import { likePost } from "#lib/remote/post.remote.js";
    import Button from "#lib/components/button/Button.svelte";
    import { votedPosts } from "#lib/storage.ts";

    let { post, vote = 0 }: { post: Post; vote?: number } = $props();
    let time = $state("");

    $effect(() => {
        $votedPosts[post.id] = vote;
    });

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
            id="vote-button"
            data-active={vote === 1}
            onclick={() => {
                vote = vote > 0 ? 0 : 1;
                likePost({ id: post.id, likeness: vote === 0 ? -1 : 1 });
            }}
        >
            <ChevronUp />
        </Button>
        <Button
            id="vote-button"
            data-active={vote === -1}
            onclick={() => {
                vote = vote < 0 ? 0 : -1;
                likePost({ id: post.id, likeness: vote === 0 ? 1 : -1 });
            }}
        >
            <ChevronDown />
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
    :global(#vote-button[data-active="false"]) {
        transition:
            translate 0.2s ease-out,
            box-shadow 0.2s ease-out,
            background-color 0.2s ease;
    }
    :global(#vote-button[data-active="true"]) {
        box-shadow: 0px 0px #000;
        translate: 2px 2px;
        transition:
            translate 0.2s ease-out,
            box-shadow 0.2s ease-out,
            background-color 0.2s ease;

        &:nth-child(1) {
            background-color: var(--col-good);
        }
        &:nth-child(2) {
            background-color: var(--col-bad);
        }
    }

    /* @keyframes like { */
    /*     50% { */
    /*         transform: translateY(-1rem); */
    /*     } */
    /* } */
    /* @keyframes unlike { */
    /*     50% { */
    /*         transform: translateY(1rem); */
    /*     } */
    /* } */
</style>
