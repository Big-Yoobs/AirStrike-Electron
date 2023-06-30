import styles from "../styles/start-page.component.module.scss";

import {BsFillNutFill} from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import {IoGameController} from "react-icons/io5";

// Unused start page

export default function StartPageComponent() {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="gui://logo.png" />
            </div>

            <div className={styles.buttons}>
                <div className={styles.button}>
                    <div className={styles.buttonIcon}><IoGameController/></div>
                    <div className={styles.buttonText}>Games</div>
                </div>
                <div className={styles.button}>
                    <div className={styles.buttonIcon}><FaTheaterMasks/></div>
                    <div className={styles.buttonText}>Video</div>
                </div>
                <div className={styles.button}>
                    <div className={styles.buttonIcon}><BsFillNutFill/></div>
                    <div className={styles.buttonText}>Settings</div>
                </div>
            </div>

        </div>

    );
}