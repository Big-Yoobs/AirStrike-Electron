import HeaderComponent from "./header-component";
import LibraryComponent from "./library.component";
import styles from "../styles/home.component.module.scss";

export default function HomeComponent() {
    return (
        <>
            {/* <HeaderComponent /> */}
            <div className={styles.content}>
                <LibraryComponent showRoomButtons />
            </div>
        </>
    )
}