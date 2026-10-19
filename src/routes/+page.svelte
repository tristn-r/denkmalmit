<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Post } from "#lib/database.types.js";
    import PostComponent from "#lib/components/Post.svelte";
    import { db } from "#lib/db.js";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import PostModal from "#lib/components/PostModal.svelte";

    const { data }: PageProps = $props();

    let posts = $state(
        data.posts.sort((a, b) => (Number(a.time) < Number(b.time) ? 1 : -1)),
    );

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
</script>

<svelte:head>
    <title>DenkMal</title>
    <meta name="description" content="DenkMal Mit Seite" />
</svelte:head>

<section>
    {#each posts as post (post.id)}
        <div class="wrapper" animate:flip={{ duration: 300 }}>
            <PostComponent {post} />
        </div>
    {/each}
    <PostModal />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
        gap: 16px;
    }

    .wrapper {
        width: 100%;
    }
</style>
