import styles from '../styles/library.component.module.scss';
import MediaItemComponent from './media-item.component';
import LibrarySidebarItemComponent from './library-sidebar-item.component';
import { useResizeDetector } from "react-resize-detector";
import { ViewportList } from 'react-viewport-list';

import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { BsTvFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import useLibrary from '../hooks/use-library';
import FilmPageComponent from './film-page.component';
import { electron } from '../utils';
import RoomModalComponent from './room-modal.component';
import TextInputComponent from './text-input.component';
import LoadingAnimComponent from './loading-anim.component';


export interface LibraryComponentProps {
    showRoomButtons?: boolean
    extraMargin?: boolean
}

export default function LibraryComponent(props: LibraryComponentProps) {
    const {width, ref} = useResizeDetector();
    const [columns, setColumns] = useState(1);
    const files = useLibrary();
    const [currentPage, setCurrentPage] = useState<string | null>(null);
    const [joinModelOpen, setJoinModalOpen] = useState(false);
    const itemsContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!width) return setColumns(0);
        setColumns(Math.floor(width / 260) || 0);
    }, [width]);
    
    const libraryWidth = columns * 260;
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
                    <TextInputComponent placeholder="Search" />
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
                                <ViewportList items={files} viewportRef={itemsContainer}>
                                    {media => (
                                        <MediaItemComponent media={media} key={media.filename} onClick={() => setCurrentPage(media.filename)} />
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