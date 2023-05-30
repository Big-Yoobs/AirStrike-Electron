import styles from '../styles/library.component.module.scss';
import MediaItemComponent from './media-item.component';
import LibrarySidebarItemComponent from './library-sidebar-item.component';

import { FaHome } from 'react-icons/fa';
import { FaFilm } from 'react-icons/fa';
import { BsTvFill } from 'react-icons/bs';



export default function LibraryComponent() {

    return (
        <div className={styles.libraryContainer}>
            <div className={styles.librarySidebarContainer}>
                
                <LibrarySidebarItemComponent selected={false} title='Home' icon={FaHome}/>
                <LibrarySidebarItemComponent selected={true} title='Movies' icon={FaFilm}/>
                <LibrarySidebarItemComponent selected={false} title='Series' icon={BsTvFill}/>
            </div>
            <div className={styles.itemsCenter}>
                <div className={styles.itemsContainer}>
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
    )
}