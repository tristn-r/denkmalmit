<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Post } from "#lib/database.types.js";
    import PostComponent from "#lib/components/Post.svelte";
    import { db } from "#lib/db.js";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import PostModal from "#lib/components/PostModal.svelte";
    import Button from "#lib/components/Button.svelte";
    import { ArrowUp } from "@lucide/svelte";

    const { data }: PageProps = $props();

    let posts = $state(
        data.posts.sort((a, b) => Date.parse(b.time) - Date.parse(a.time)),
    );

    let reversed = $state(false);
    let sortOrder = $state("time");

    onMount(() => {
        const channel = db
            .channel("schema-db-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    posts = [payload.new as Post, ...posts];
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    let idx = posts.findIndex(
                        (post) => post.id === payload.old.id,
                    );
                    posts[idx] = payload.new as Post;
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    posts = posts.filter((post) => post.id != payload.old.id);
                },
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    });

    const reverse = () => {
        reversed = !reversed;
        posts.reverse();
    };

    function sortPosts() {
        if (sortOrder === "time")
            posts.sort((a, b) => {
                return Date.parse(b.time) - Date.parse(a.time);
            });
        else if (sortOrder === "relevance")
            posts.sort((a, b) => b.relevance - a.relevance);
    }
</script>

<svelte:head>
    <title>DenkMal</title>
    <meta name="description" content="DenkMal Mit Seite" />
</svelte:head>

<section>
    <span class="sorting">
        <Button onclick={reverse}>
            <ArrowUp class="sort-arrow" data-reversed={reversed} />
        </Button>
        <select class="sort-select" bind:value={sortOrder} onchange={sortPosts}>
            <option value="time">Zeit</option>
            <option value="relevance">Relevanz</option>
        </select>
    </span>
    <div class="posts">
        {#each posts as post (post.id)}
            <div class="post-wrapper" animate:flip={{ duration: 300 }}>
                <PostComponent {post} />
            </div>
        {/each}
    </div>
    <PostModal />
</section>

<style>
    .posts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
        gap: 16px;
    }

    .post-wrapper {
        width: 100%;
    }

    .sorting {
        display: flex;
        justify-content: end;
        gap: 8px;
        margin-bottom: 12px;
    }

    .sort-select {
        border: var(--border);
        border-radius: var(--rounded-md);
        box-shadow: var(--shadow);
        background-color: var(--col-bg);

        &:focus-visible {
            outline: none;
        }
    }

    :global(.sort-arrow) {
        transition: rotate 0.2s ease-out;

        &[data-reversed="true"] {
            rotate: 0.5turn;
        }
    }
</style>
