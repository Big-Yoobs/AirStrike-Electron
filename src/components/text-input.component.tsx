import { useCallback, useRef } from "react";
import styles from "../styles/text-input.component.module.scss";


export interface TextInputComponentProps {
    placeholder: string;
    onChange?: (value: string) => void | string
}

export default function TextInputComponent(props: TextInputComponentProps) {
    const input = useRef<HTMLInputElement>(null);

    const change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            const newValue = props.onChange(e.currentTarget.value);
            if (typeof newValue == "string") {
                input.current.value = newValue;
            }
        }
    }, [props.onChange]);

    return (
        <input ref={input} className={styles.input} type="text" placeholder={props.placeholder} onChange={change} />
    )


}