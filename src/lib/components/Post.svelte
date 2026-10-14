<script lang="ts">
    import type { Post } from "$lib/database.types";
    import { ThumbsDown, ThumbsUp } from "@lucide/svelte";
    import { likePost } from "./post.remote";

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

<div class="post">
    {#if post.author}
        <span class="author">{post.author}</span>
    {/if}
    <span class="time">
        {time}
    </span>
    <h1>{post.text}</h1>
    <span class="voting">
        <button
            onclick={() => {
                likePost({ id: post.id, likeness: 1 }).then((data) =>
                    console.log(data),
                );
            }}><ThumbsUp /></button
        >
        <button
            onclick={() => {
                likePost({ id: post.id, likeness: -1 });
            }}><ThumbsDown /></button
        >
    </span>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: var(--border);
        border-radius: var(--rounded-md);

        & h1 {
            margin: 15px;
            line-height: 0.92;
        }
    }

    .time {
        position: absolute;
        align-self: end;
    }

    .voting {
        display: flex;
        gap: 4px;
    }
</style>
