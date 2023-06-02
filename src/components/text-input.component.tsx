import styles from "../styles/text-input.component.module.scss";


export interface TextInputComponentProps {
    placeholder: string;
    

}

export default function TextInputComponent(props: TextInputComponentProps) {

    return (
        <input className={styles.input} type="text" placeholder={props.placeholder} />
    )


}