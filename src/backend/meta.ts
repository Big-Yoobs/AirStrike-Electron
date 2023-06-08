import * as Path from "path";
import * as FS from "fs";

const TMDB_READ_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODg4MzIwMWQ1OGZlMGY3YTJkZmNiNTBlMGYzZDIxYSIsInN1YiI6IjY0NjE4MmNmZGJiYjQyMDBmYzg3ZDUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2CmF0UNKCaNtWMnisIE3hr2plqRFi692N0F-7zEm-r0";

export interface MovieMetadataCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface MovieMetadataGenre {
    id: number
    name: string
}

export interface MovieMetadataProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export interface MovieMetadataProductionCountry {
    iso_3166_1: string
    name: string
}

export interface MovieMetadataSpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieMetadata {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: MovieMetadataCollection
    budget: number
    genres: MovieMetadataGenre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: MovieMetadataProductionCompany[]
    production_countries: MovieMetadataProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: MovieMetadataSpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MovieCastMember {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface MovieCast {
    castMember: MovieCastMember[]
}

export interface MovieCrewMember {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
}

export interface MovieCrew {
    crewMember: MovieCrewMember[]
}

export interface MovieAllCredits {
    id : number
    crew : MovieCrew;
    cast : MovieCast;
}

export interface Movie {
    details: MovieMetadata
    credits: MovieAllCredits
    crewList: MovieCrew
    castList: MovieCast

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

async function tmdbRequest(url: string) {
    const request = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + TMDB_READ_TOKEN
        }
    });
    const data = await request.json();
    return data;
}

export async function getMovieMetadata(filename: string): Promise<Movie | null> {
    const metaFile = Path.join(DIRECTORY, "metadata", Path.parse(filename).name + ".json");

    try {
        const existingData = JSON.parse(await readFile(metaFile));
        return existingData;
    } catch (e) {}
    


    const name = Path.parse(filename).name;
    console.log(`Searching TMDB for '${name}'...`);
    try {
        const search = await tmdbRequest(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`);
        if (!Array.isArray(search?.results) || !search.results.length) return null;

        const tmdbId = search.results[0].id;

        const details = await tmdbRequest(`https://api.themoviedb.org/3/movie/${tmdbId}`);

        const credits = await tmdbRequest(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`);

        const crewList = credits.crew;
        const castList = credits.cast;

        const data = {
            details,
            credits,
            crewList,
            castList
        }

        FS.writeFile(metaFile, JSON.stringify(data, null, 2), () => {});

        return data;
    } catch {}
    return null;
}