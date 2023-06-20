import { MdOutlineArrowBackIos } from "react-icons/md";
import styles from "../styles/scroll.component.module.scss";
import { useRef } from "react";
import { useResizeDetector } from "react-resize-detector";

export interface ScrollComponentProps {
    title: string
    children?: JSX.Element | JSX.Element[]
}

export default function ScrollComponent(props: ScrollComponentProps) {
    const container = useResizeDetector();

    if (!props.children || (Array.isArray(props.children) && !props.children.length)) {
        return null;
    }

    function scrollElement(amount: number) {
        if (!container.width) return;

        const cont = container.ref.current;

        cont.scrollBy({
            left: (container.width - 100) * amount,
            behavior: "smooth"
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.scroll}>
                <div className={styles.arrow} onClick={() => scrollElement(-1)}>
                    <MdOutlineArrowBackIos/>
                </div>
                <div className={styles.items} ref={container.ref}>
                    {props.children}
                </div>
                <div className={styles.arrow} onClick={() => scrollElement(1)}>
                    <MdOutlineArrowBackIos/>
                </div>
            </div>
        </div>
    )
}