import { MdOutlineArrowBackIos } from "react-icons/md";
import styles from "../styles/scroll.component.module.scss";

export interface ScrollComponentProps {
    title: string
    children?: JSX.Element | JSX.Element[]
}

export default function ScrollComponent(props: ScrollComponentProps) {
    if (!props.children || (Array.isArray(props.children) && !props.children.length)) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.scroll}>
                <div className={`${styles.arrow}`}>
                    <MdOutlineArrowBackIos/>
                </div>
                <div className={styles.items}>
                    {props.children}
                </div>
                <div className={styles.arrow}>
                    <MdOutlineArrowBackIos/>
                </div>
            </div>
        </div>
    )
}