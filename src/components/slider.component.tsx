import { useRef } from "react"
import styles from "../styles/slider.component.module.scss"

export interface SliderProps {
    min: number
    max: number
    value: number
    onChange: (value: number) => void
    disabled?: boolean
    orientation?: "horizontal" | "vertical"
    length: number
    color: string
}

export default function Slider(props: SliderProps) {
    const input = useRef<HTMLInputElement>(null);

    const percentage = (props.value - props.min) / (props.max - props.min) * 100;

    const css = {
        "--gradient": `linear-gradient(90deg, ${props.color} 0%, ${props.color} ${percentage}%, #000 ${percentage}%, #000 100%)`,
        "--length": props.length + "px",
        "--color": props.color
    };

    const className: string = (styles as any)[props.orientation || "horizontal"];

    return (
        <div className={styles.container + " " + className} style={css as any}>
            <input ref={input} type="range" min={props.min} max={props.max} value={props.value} onInput={e => props.onChange(parseInt(e.currentTarget.value))} className={props.disabled ? styles.disabled : styles.enabled} />
        </div>
    )
}