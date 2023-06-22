import styles from '../styles/library.component.module.scss';
import MediaItemComponent from './media-item.component';
import LibrarySidebarItemComponent from './library-sidebar-item.component';
import { useResizeDetector } from "react-resize-detector";
import { ViewportList } from 'react-viewport-list';
import StringSimilarity from "string-similarity";

import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { BsTvFill } from 'react-icons/bs';
import { useEffect, useMemo, useRef, useState } from 'react';
import useLibrary from '../hooks/use-library';
import FilmPageComponent from './film-page.component';
import { electron } from '../utils';
import RoomModalComponent from './room-modal.component';
import TextInputComponent from './text-input.component';
import LoadingAnimComponent from './loading-anim.component';
import useMediaMetas, { MediaMetaWrapper } from '../hooks/use-media-metas';


export interface LibraryComponentProps {
    showRoomButtons?: boolean
    extraMargin?: boolean
}

let universalScale = 1;

export default function LibraryComponent(props: LibraryComponentProps) {
    const {width, ref} = useResizeDetector();
    const [columns, setColumns] = useState(1);
    const files = useLibrary();
    const metas = useMediaMetas(files);
    const [currentPage, setCurrentPage] = useState<string | null>(null);
    const [joinModelOpen, setJoinModalOpen] = useState(false);
    const itemsContainer = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(universalScale);
    const [search, setSearch] = useState("");
    universalScale = scale;

    useEffect(() => {
        if (!width) return setColumns(0);
        const roundedScale = Math.round(scale * 5) / 5;
        const elementWidth = 240 * roundedScale;
        setColumns(Math.floor(width / (elementWidth + 20)) || 0);
    }, [width, scale]);

    const items = useMemo(() => {
        const out = metas.filter(movie => {
            if (!search) return true;
            if (!movie.meta) return false;
            const lower = search.toLowerCase();
            const lowerName = movie.meta.details.title.toLowerCase();
            if (lowerName.includes(lower) || StringSimilarity.compareTwoStrings(lowerName, lower) > 0.5) {
                return true;
            }
            if (movie.meta.details.release_date.split("-")[0] == search) {
                return true;
            }
            for (let member of [...movie.meta.credits.cast, ...movie.meta.credits.crew]) {
                const lowerMemberName = member.name.toLowerCase();
                if (lowerMemberName.includes(search) || StringSimilarity.compareTwoStrings(lowerMemberName, lower) > 0.8) {
                    return true;
                }
            }
            return false;
        });
        function getName(item: MediaMetaWrapper) {
            if (item.meta) {
                if (item.meta.details.title.toLowerCase().startsWith("the ")) {
                    return item.meta.details.title.substring(4).toLowerCase();
                }
                return item.meta.details.title.toLowerCase();
            }
            return item.file.filename.toLowerCase();
        }
        out.sort((a, b) => {
            if (getName(a) > getName(b)) {
                return 1;
            } else {
                return -1;
            }
        });
        return out;
    }, [metas, search]);

    useEffect(() => {
        function wheel(e: WheelEvent) {
            if (!e.ctrlKey) return;
            e.preventDefault();

            setScale(scale => {
                return Math.min(Math.max(scale - (e.deltaY / 1000), 0.4), 1.2);   
            });
        }

        window.addEventListener("wheel", wheel, {passive: false});

        return () => {
            document.removeEventListener("wheel", wheel);
        }
    }, []);
    
    const libraryWidth = columns * (240 * (Math.round(scale * 5) / 5) + 20);
    const alphaShortcuts = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (currentPage) {
        return <FilmPageComponent filename={currentPage} onBack={() => setCurrentPage(null)} />
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.home}>
                        <img className={styles.logo} src="gui://logo.png"/>
                    </div>
                    {props.showRoomButtons && (
                        <>
                            <button onClick={() => electron().socketSend("create room")} className="button">Create Room</button>
                            <button onClick={() => setJoinModalOpen(true)} className="button">Join Room</button>
                        </>
                    )}
                    <TextInputComponent placeholder="Search" onChange={setSearch} />
                </div>
                <div className={styles.libraryContainer}>
                    {/* <div className={styles.librarySidebarContainer}>
                        <LibrarySidebarItemComponent selected={false} title='Home' icon={FaHome}/>
                        <LibrarySidebarItemComponent selected={true} title='Movies' icon={FaFilm}/>
                        <LibrarySidebarItemComponent selected={false} title='Series' icon={BsTvFill}/>
                    </div> */}
                    <div className={styles.libraryAlphaShortcuts}>
                        {alphaShortcuts.split("").map(letter => (
                            <a key={letter}><span>{letter}</span></a>
                        ))}
                    </div>
                    <div className={styles.itemsCenter} ref={ref} style={{margin: `0 ${props.extraMargin ? 120 : 15}px`}}>
                        <div className={styles.itemsContainer} ref={itemsContainer} style={{width: libraryWidth + "px"}}>
                            {columns ? (
                                <ViewportList items={items} viewportRef={itemsContainer}>
                                    {media => (
                                        <MediaItemComponent file={media.file} key={media.file.filename} onClick={() => setCurrentPage(media.file.filename)} scale={Math.round(scale * 5) / 5} meta={media.meta} />
                                    )}
                                </ViewportList>
                            ) : (
                                <LoadingAnimComponent title="Loading your library" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RoomModalComponent open={joinModelOpen} onClose={() => setJoinModalOpen(false)} />
        </>
    )
}