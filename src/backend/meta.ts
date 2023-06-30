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
    cast_id: 4
    character: string
    credit_id: string
    order: number
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

export interface MovieCast {
    id: number
    cast: MovieCastMember[]
    crew: MovieCrewMember[]
}

export interface Movie {
    details: MovieMetadata
    credits: MovieCast
    filename: string
}

const DIRECTORY = Path.resolve("./");
if (!FS.existsSync(Path.join(DIRECTORY, "metadata"))) { // create metadata filder if not exists
    FS.mkdirSync(Path.join(DIRECTORY, "metadata"));
}

function readFile(filename: string): Promise<string> { // get file contents
    return new Promise((resolve, reject) => {
        FS.readFile(filename, "utf-8", (e, data) => {
            if (e) return reject(e);
            resolve(data);
        })
    });
}

async function tmdbRequest(url: string) { // send an http request to tmdb
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
    


    let name = Path.parse(filename).name;


    const foundYears: string[] = []; // find 4 digit numbers in filename greater than 1899, treat them as years
    for (let i = 0; i < name.length - 3; i++) {
        const sub = name.substring(i, i + 4);
        if (sub.match(/^\d{4}$/g)) {
            const year = name.substring(i, i + 4);
            if (parseInt(year) >= 1900) {
                foundYears.push(year);
            }
        }
    }


    for (let i = 1; i < name.length; i++) { // remove everything after bracket
        if (["(", "[", "{"].includes(name[i])) {
            name = name.substring(0, i - 1);
            break;
        }
    }
    
    name = name.replace(/\./g, " "); // replace periods with spaces

    const blacklist = [ // list of strings to remove
        "x264",
        "x265",
        "h264",
        "h265",
        "1080p",
        "2160p",
        "720p",
        "uhd",
        "bluray",
        "blu-ray",
        "webrip",
        "web-dl",
        "dvdrip",
        "dvd-rip",
        "aac-rarbg",
        "rarbg",
        "yts",
        "yify",
        "eztv",
        "amzn",
        "amznwebrip",
        "amznweb-dl",
        "documentary"
    ];
    blacklist.forEach(b => { // remove blacklisted strings
        name = name.replace(new RegExp(b, "gi"), "");
    });

    // replace instances of ' - ' with spaces
    name = name.replace(/ - /g, " ");


    // remove everything in brackets including the brackets
    name = name.replace(/\[.*?\]/g, "");

    // remove everything in parentheses including the parentheses
    name = name.replace(/\(.*?\)/g, "");

    
    // remove extra spaces
    name = name.replace(/\s+/g, " ").trim();

    if (name.endsWith(" -")) {
        name = name.substring(0, name.length - 2);
    }

    let data = await checkName(name, foundYears[0]); // search tmdb for name

    if (!data) { // search failed, include year
        // get all indexes of 4-character numbers in name
        const indexes = [];
        for (let i = 0; i < name.length - 3; i++) {
            const sub = name.substring(i, i + 4);
            if (sub.match(/^\d{4}$/g)) {
                indexes.push(i);
            }
        }
        if (indexes.length) {
            for (let index of indexes) {
                if (!index) {
                    name = name.substring(4);
                } else {
                    name = name.substring(0, index);
                }
            }
            name = name.trim();
            data = await checkName(name, foundYears[0]);
        }
    }

    if (!data) { // couldn't find movie
        console.log("\nFailed!", `'${name}'`);
        console.log(filename, "\n");
        return null;
    }

    const movie: Movie = {
        ...data,
        filename
    }

    FS.writeFile(metaFile, JSON.stringify(movie, null, 2), () => {}); // store tmdb contents in json file
    return movie;
}

async function checkName(name: string, year?: string) { // search tmdb for name and optionally year
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`;
        const yearUrl = url + (year ? `&primary_release_year=${year}` : ``);
        let search = await tmdbRequest(yearUrl);
        if (!Array.isArray(search?.results) || !search.results.length) {
            search = await tmdbRequest(url);
            if (!Array.isArray(search?.results) || !search.results.length) {
                return null;
            }
        }

        let tmdbId = null;

        if (year) {
            for (let result of search.results) {
                if (result.release_date.startsWith(year)) {
                    tmdbId = result.id;
                    break;
                }
            }
        }
        if (!tmdbId) {
            tmdbId = search.results[0].id;
        }
        if (!tmdbId) {
            return null;
        }
        
    
        const details = await tmdbRequest(`https://api.themoviedb.org/3/movie/${tmdbId}`);
        const credits = await tmdbRequest(`https://api.themoviedb.org/3/movie/${tmdbId}/credits`);
    
        const data = {
            details,
            credits
        }
    
        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}