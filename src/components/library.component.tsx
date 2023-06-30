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

//the library where all the films are displayed and the effective home screen of the app.

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
    const [alphaChar, setAlphaChar] = useState<string | null>(null);
    const [alphaActive, setAlphaActive] = useState(false);
    universalScale = scale;
    const alphaShortcuts = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        if (!width) return setColumns(0);
        const roundedScale = Math.round(scale * 5) / 5;
        const elementWidth = 240 * roundedScale;
        setColumns(Math.floor(width / (elementWidth + 20)) || 0);
    }, [width, scale]);

    useEffect(() => {
        if (!alphaActive) return;
        const list = alphaShortcuts.split("");
        const index = Math.max(list.indexOf(alphaChar), 0);
        if (index < 0) return;
        const children = Array.from(itemsContainer.current.children) as HTMLDivElement[];
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            const firstLetter = element.dataset.firstletter;
            const letterIndex = Math.max(list.indexOf(firstLetter), 0);
            if (letterIndex >= index) {
                const top = element.offsetTop;
                itemsContainer.current.parentElement.scrollTo({
                    top
                });
                return;
            }
        }
        if (children.length) { 
            itemsContainer.current.parentElement.scrollTo({
                top: children[children.length - 1].offsetTop
            });
        }
    }, [alphaChar, alphaActive]);

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

        // scroll wheel zooming
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

    if (currentPage) {
        return <FilmPageComponent filename={currentPage} onBack={() => setCurrentPage(null)} />
    }

    function alphaSelect() {
        setAlphaActive(true);

        function end() {
            window.removeEventListener("mouseup", end);
            window.addEventListener("mouseleave", end);
            setAlphaActive(false);
        }

        window.addEventListener("mouseup", end);
        window.addEventListener("mouseleave", end);
    }

    return (
        <>
            <div className={styles.container}>

                {/* header */}
                <div className={styles.header}>
                    <div className={styles.home}>
                        <img className={styles.logo} src="gui://logo.png"/>
                    </div>

                    {/* create and join room buttons */}
                    {props.showRoomButtons && (
                        <>
                            <button onClick={() => electron().socketSend("create room")} className="button">Create Room</button>
                            <button onClick={() => setJoinModalOpen(true)} className="button">Join Room</button>
                        </>
                    )}
                    {/* search bar */}
                    <TextInputComponent placeholder="Search" onChange={setSearch} />
                </div>

                <div className={styles.libraryContainer}>

                    {/* unused sidebar for different library filters  */}
                    {/* <div className={styles.librarySidebarContainer}>
                        <LibrarySidebarItemComponent selected={false} title='Home' icon={FaHome}/>
                        <LibrarySidebarItemComponent selected={true} title='Movies' icon={FaFilm}/>
                        <LibrarySidebarItemComponent selected={false} title='Series' icon={BsTvFill}/>
                    </div> */}
                    
                    {/* alphabetical search bar */}
                    <div className={styles.libraryAlphaShortcuts} onMouseDown={alphaSelect}>
                        {alphaShortcuts.split("").map(letter => (
                            <a key={letter} onMouseOver={() => setAlphaChar(letter)}><span>{letter}</span></a>
                        ))}
                    </div>

                    {/* library grid of media items */}
                    <div className={styles.itemsCenter} ref={ref} style={{margin: `0 ${props.extraMargin ? 120 : 15}px`}}>
                        <div className={styles.itemsContainer} ref={itemsContainer} style={{width: libraryWidth + "px"}}>
                            {columns ? (
                                <ViewportList items={items} viewportRef={itemsContainer}>
                                    {/* loop displaying each media item */}
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