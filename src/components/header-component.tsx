import styles from '../styles/header.component.module.scss';
import TextInputComponent from './text-input.component';

export default function HeaderComponent() {

    return (
        <div className={styles.headerContainer}>

            <img className={styles.logo} src="https://i.imgur.com/2hdMZWw.png"/>

            <div className={styles.searchContainer}>
                <TextInputComponent placeholder="Search" />
            </div>




        </div>
    )

}