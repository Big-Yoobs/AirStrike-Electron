import { MdOutlineArrowBackIos } from "react-icons/md";
import styles from "../styles/scroll.component.module.scss";
import { useRef } from "react";
import { useResizeDetector } from "react-resize-detector";

// A scrollable list of items (these appear on the film pages for the cast and crew)

export interface ScrollComponentProps {
    title: string //the title of the scroll component
    children?: JSX.Element | JSX.Element[] //the items to scroll through
}

export default function ScrollComponent(props: ScrollComponentProps) {
    const container = useResizeDetector();

    if (!props.children || (Array.isArray(props.children) && !props.children.length)) {
        return null;
    }

    // Scrolling using the left and right arrows
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
            {/* title */}
            <div className={styles.title}>{props.title}</div> 
            <div className={styles.scroll}>
                {/* left arrow */}
                <div className={styles.arrow} onClick={() => scrollElement(-1)}> 
                    <MdOutlineArrowBackIos/>
                </div>
                {/* horozontal list of items */}
                <div className={styles.items} ref={container.ref}>
                    {props.children}
                </div>
                {/* right arrow */}
                <div className={styles.arrow} onClick={() => scrollElement(1)}>
                    <MdOutlineArrowBackIos/>
                </div>
            </div>
        </div>
    )
}