import { useMemo } from 'react';
import styles from '../styles/loading-anim.component.module.scss';

//circular animated loading icon and logo

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

                {/* spinning graphic */}
                <div className={styles.spinContainer}>
                    <div className={styles.ldsDualRing}></div>
                </div>
                {/* logo image sits inside spinning graphic */}
                <img src="gui://logo.png" />
            </div>
            
            {/* loading text that can be set dynamically */}
            {title && (
                <div className={styles.loadingText}>{title}</div>
            )}
        </div>
    );
}