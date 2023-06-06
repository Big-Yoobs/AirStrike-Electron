import * as Path from "path";
import * as FS from "fs";

const TMDB_READ_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg4MzIwMWQ1OGZlMGY3YTJkZmNiNTBlMGYzZDIxYSIsInN1YiI6IjY0NjE4MmNmZGJiYjQyMDBmYzg3ZDUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2CmF0UNKCaNtWMnisIE3hr2plqRFi692N0F-7zEm-r0";

export interface MovieMetadata {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

const DIRECTORY = Path.resolve("./");
if (!FS.existsSync(Path.join(DIRECTORY, "metadata"))) {
    FS.mkdirSync(Path.join(DIRECTORY, "metadata"));
}

function readFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        FS.readFile(filename, "utf-8", (e, data) => {
            if (e) return reject(e);
            resolve(data);
        })
    });
}

export async function getMovieMetadata(filename: string): Promise<MovieMetadata | null> {
    const metaFile = Path.join(DIRECTORY, "metadata", Path.parse(filename).name + ".json");

    try {
        const existingData = JSON.parse(await readFile(metaFile));
        return existingData;
    } catch (e) {}
    


    const name = Path.parse(filename).name;
    console.log(`Searching TMDB for '${name}'...`);
    try {
        const request = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + TMDB_READ_TOKEN
            }
        });
        const data = await request.json();
        if (Array.isArray(data?.results) && data.results.length) {
            FS.writeFile(metaFile, JSON.stringify(data.results[0], null, 2), () => {});
            return data.results[0];
        }
    } catch {}
    return null;
}