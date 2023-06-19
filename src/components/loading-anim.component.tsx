import { useMemo } from 'react';
import styles from '../styles/loading-anim.component.module.scss';

export interface LoadingAnimComponentProps {
    title?: string
    scale?: number
}

export default function LoadingAnimComponent({ title, scale }: LoadingAnimComponentProps) {

    const css = useMemo(() => {
        return {"--scale": scale || 1} as any;
    }, [scale]);

    return (
        <div className={styles.container} style={css}>
            <div className={styles.logoIconContainer}>
                <div className={styles.spinContainer}>
                    <div className={styles.ldsDualRing}></div>
                </div>
                <img src="gui://logo.png" />
            </div>
            
            {title && (
                <div className={styles.loadingText}>{title}</div>
            )}
        </div>
    );
}