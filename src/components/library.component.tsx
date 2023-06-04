import styles from '../styles/library.component.module.scss';
import MediaItemComponent from './media-item.component';
import LibrarySidebarItemComponent from './library-sidebar-item.component';
import { useResizeDetector } from "react-resize-detector";

import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { BsTvFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';



export default function LibraryComponent() {
    const {width, ref} = useResizeDetector();
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        if (!width) return setColumns(1);
        setColumns(Math.max(Math.floor(width / 260) || 0, 1));
    }, [width]);
    
    const libraryWidth = columns * 260;
    const alphaShortcuts = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <div className={styles.libraryContainer}>
            <div className={styles.librarySidebarContainer}>
                
                <LibrarySidebarItemComponent selected={false} title='Home' icon={FaHome}/>
                <LibrarySidebarItemComponent selected={true} title='Movies' icon={FaFilm}/>
                <LibrarySidebarItemComponent selected={false} title='Series' icon={BsTvFill}/>

                <div className={styles.libraryAlphaShortcuts}>
                    {alphaShortcuts.split("").map(letter => (
                        <a key={letter}><span>{letter}</span></a>
                    ))}
                </div>
            </div>
            <div className={styles.itemsCenter} ref={ref}>
                <div className={styles.itemsContainer} style={{width: libraryWidth + "px"}}>
                    {Array(50).map((e, index) => (
                        <MediaItemComponent key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}