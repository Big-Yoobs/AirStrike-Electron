import React, { useEffect, useRef, useState } from "react"
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
    activeCallback?: (active: boolean) => void
}

export default function Slider(props: SliderProps) {
    const input = useRef<HTMLInputElement>();
    const [isActive, setIsActive] = useState(false);
    const [activeValue, setActiveValue] = useState(0);

    const percentage = (isActive ? (activeValue / (props.max - props.min)) : ((props.value - props.min) / (props.max - props.min))) * 100;

    const css = {
        "--gradient": `linear-gradient(90deg, ${props.color} 0%, ${props.color} ${percentage}%, #000 ${percentage}%, #000 100%)`,
        "--length": props.length + "px",
        "--color": props.color
    };

    useEffect(() => {
        if (!props.activeCallback) return;
        let active = true;

        if (isActive) {
            props.activeCallback(true);
        } else {
            setTimeout(() => {
                if (active) props.activeCallback(false);
            }, 500);
        }

        return () => {
            active = false;
        }
    }, [isActive]);

    function mouseDown(originalEvent: MouseEvent) {
        setIsActive(false);

        function move(e: MouseEvent) {
            const position = input.current.getBoundingClientRect();
            const decimal = Math.max(Math.min((e.pageX - position.left) / position.width, 1), 0);
            setActiveValue(decimal * (props.max - props.min) + props.min);
            setIsActive(true);
        }

        function stop() {
            document.removeEventListener("mouseup", stop);
            document.removeEventListener("mouseout", stop);
            document.removeEventListener("mousemove", move);

            setIsActive(false);
            setActiveValue(0);
        }

        document.addEventListener("mouseup", stop, {once: true});
        document.addEventListener("mouseout", stop, {once: true});
        document.addEventListener("mousemove", move);

        move(originalEvent);
    }

    const className: string = (styles as any)[props.orientation || "horizontal"];

    return (
        <div className={styles.container + " " + className} style={css as any}>
            <input ref={input} type="range" min={props.min} max={props.max} value={isActive ? activeValue : props.value} onInput={e => props.onChange(parseInt(e.currentTarget.value))} className={props.disabled ? styles.disabled : styles.enabled} onMouseDown={e => mouseDown(e.nativeEvent)} />
        </div>
    )
}