<script lang="ts">
    import type { Post } from "#lib/database.types.js";
    import { ThumbsDown, ThumbsUp } from "@lucide/svelte";
    import { likePost } from "#lib/remote/post.remote.js";
    import Button from "./Button.svelte";

    let { post }: { post: Post } = $props();
    let time = $state("");
    let likeness = $state(0);

    $effect(() => {
        const date = new Date(post.time);
        time =
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0");
    });
</script>

<div class="post">
    {#if post.author}
        <span class="author">{post.author}</span>
    {/if}
    <span class="time">
        {time}
    </span>
    <h1>{post.text}</h1>
    <!-- class:active={likeness === 1} -->
    <span class="voting">
        <Button
            id={likeness === 1 ? "active" : ""}
            onclick={() => {
                likeness = likeness > 0 ? 0 : 1;
                likePost({ id: post.id, likeness: likeness === 0 ? -1 : 1 });
            }}
        >
            <!-- <ThumbsUp fill={likeness > 0 ? "#fff" : "#fff"} /> -->
            <ThumbsUp fill="#62f700" />
        </Button>
        <!-- class:active={likeness === -1} -->
        <Button
            id={likeness === -1 ? "active" : ""}
            onclick={() => {
                likeness = likeness < 0 ? 0 : -1;
                likePost({ id: post.id, likeness: likeness === 0 ? 1 : -1 });
            }}
        >
            <!-- <ThumbsDown fill={likeness < 0 ? "#fff" : "#fff"} /> -->
            <ThumbsDown fill="#e80000" />
        </Button>
    </span>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: var(--border);
        border-radius: var(--rounding);
        background-color: var(--col-bg);
        box-shadow: 4px 4px #000;

        & h1 {
            margin: 15px;
            line-height: 0.92;
        }
        /* &:hover h1 { */
        /*     text-decoration: underline; */
        /* } */
    }

    .time {
        position: absolute;
        align-self: end;
    }

    .voting {
        display: flex;
        gap: 8px;
    }
    :global(#vote-button) {
        filter: drop-shadow(2px 2px #000);
        transition:
            translate 0.2s ease,
            filter 0.2s ease-in,
            fill 0.2s ease-in;
    }
    :global(button:not(#active)) {
        transition:
            translate 0.2s ease-out,
            box-shadow 0.4s ease,
            background-color 0.2s ease;
    }
    :global(#active) {
        box-shadow: inset 0px 0px #000;
        translate: 2px 2px;
        transition:
            translate 0.2s ease-out,
            box-shadow 0.4s ease,
            background-color 0.2s ease;

        &:nth-child(1) {
            background-color: #62f700;
        }
        &:nth-child(2) {
            background-color: #e80000;
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
