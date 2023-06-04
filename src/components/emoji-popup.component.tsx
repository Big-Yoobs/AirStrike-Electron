import { AnimatePresence, motion } from "framer-motion"
import EmojiComponent from "./emoji.component"
import styles from "../styles/emoji-popup.component.module.scss"

export interface EmojiPopupComponent {
    emoji: string
    visible: boolean
}

export default function EmojiPopupComponent(props: EmojiPopupComponent) {
    return (
        <div className={styles.container}>
            <AnimatePresence>
                {props.visible && (
                    <motion.div initial={{opacity: 0, y: 800}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -400, transition: {ease: "anticipate"}}}>
                        <div className={styles.emoji}>
                            <EmojiComponent emoji={props.emoji} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}