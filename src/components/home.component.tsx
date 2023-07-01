import LibraryComponent from "./library.component";
import styles from "../styles/home.component.module.scss";

export default function HomeComponent() { // page shown when user isn't in a room. currently basically an alias for library but extra stuff could be added too
    return (
        <>
            <div className={styles.content}>
                <LibraryComponent showRoomButtons />
            </div>
        </>
    )
}