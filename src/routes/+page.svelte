<script lang="ts">
    import type { PageProps } from "./$types";
    import type {Post} from "$lib/database.types";
    import PostComponent from "$lib/components/Post.svelte";
    import { db } from "$lib/db";
    import { onMount } from "svelte";

    const { data }: PageProps = $props();

    // let posts = $state(data.posts);
    let posts = $derived(data.posts.sort((a, b) => (Number(a.time) < Number(b.time) ? 1 : -1)))

    onMount(() => {
        const channel = db.channel("schema-db-changes")
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
            },
            (payload) => {
                posts = [(payload.new as Post), ...posts];
            }
        )
        .subscribe();

        return () => {
            channel.unsubscribe();
        }
    });
</script>

<svelte:head>
    <title>DenkMal</title>
    <meta name="description" content="DenkMal Mit Seite" />
</svelte:head>

<section>
    {#each data.posts as post}
        <PostComponent {post} />
    {/each}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }
</style>
