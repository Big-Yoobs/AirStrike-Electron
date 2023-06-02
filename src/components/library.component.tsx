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

    return (
        <div className={styles.libraryContainer}>
            <div className={styles.librarySidebarContainer}>
                
                <LibrarySidebarItemComponent selected={false} title='Home' icon={FaHome}/>
                <LibrarySidebarItemComponent selected={true} title='Movies' icon={FaFilm}/>
                <LibrarySidebarItemComponent selected={false} title='Series' icon={BsTvFill}/>

                <div className={styles.libraryAlphaShortcuts}>
                    <div>#</div>
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>G</div>
                    <div>H</div>
                    <div>I</div>
                    <div>J</div>
                    <div>K</div>
                    <div>L</div>
                    <div>M</div>
                    <div>N</div>
                    <div>O</div>
                    <div>P</div>
                    <div>Q</div>
                    <div>R</div>
                    <div>S</div>
                    <div>T</div>
                    <div>U</div>
                    <div>V</div>
                    <div>W</div>
                    <div>X</div>
                    <div>Y</div>
                    <div>Z</div>
                </div>
            </div>
            <div className={styles.itemsCenter} ref={ref}>
                <div className={styles.itemsContainer} style={{width: libraryWidth + "px"}}>
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                    <MediaItemComponent />
                </div>
            </div>
        </div>
    )
}