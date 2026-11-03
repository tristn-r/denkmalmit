import { writable } from "svelte/store";
import { browser } from "$app/env";

type VoteMap = {
    [key: number]: number;
};

let initialPosts: VoteMap = browser ? JSON.parse(localStorage.getItem("votes") ?? "{}") : {};
let initialSorting =
    browser && localStorage.getItem("sorting")
        ? JSON.parse(localStorage.getItem("sorting") ?? "{}")
        : { reversed: false, criteria: "time" };

export const votedPosts = writable(initialPosts);
export const sorting = writable(initialSorting);

if (browser) {
    votedPosts.subscribe((value) => {
        localStorage.setItem("votes", JSON.stringify(value));
    });
    sorting.subscribe((value) => {
        localStorage.setItem("sorting", JSON.stringify(value));
    });
}
