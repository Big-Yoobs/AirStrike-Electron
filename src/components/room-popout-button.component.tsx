import { IconContext } from "react-icons";
import styles from "../styles/room-popout-button.component.module.scss";

// the arrow button on the sidebar that pops in and out the sidebar in the room view

export interface RoomPopoutButtonProps {
    selected?: boolean
    onclick?: () => void
    children?: JSX.Element
    open?: boolean
}

export default function RoomPopoutButton(props: RoomPopoutButtonProps) {
    function click(e: React.MouseEvent) {
        e.stopPropagation();
        if (props.onclick) props.onclick();
    }

    return (
        <button className={styles.button + (props.selected ? ` ${styles.selected}` : "") + (!props.children ? ` ${styles.arrow}` : "") + (props.open ? ` ${styles.open}` : "")} onClick={click}>
            <IconContext.Provider value={{size: "40px"}}>
                { props.children }
            </IconContext.Provider>
        </button>
    )
}