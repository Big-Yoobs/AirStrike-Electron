import styles from '../styles/cast-pfp.component.module.scss';
import { MovieCastMember } from '../backend/meta';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';

export interface CastPfpComponentProps {
    castMember : MovieCastMember
}

export default function CastPfpComponent({castMember} : CastPfpComponentProps) {

    const castName : string = castMember.name;
    const castPfp : string = "https://image.tmdb.org/t/p/w500/" + castMember.profile_path;
    
    return (
        <div className={styles.container}>
            <div className={styles.pfp}>
                <ImageWrapperComponent src={castPfp}/>
            </div>
            <div className={styles.name}>
                {castName}
            </div>
            <div className={styles.role}>
                {castMember.character}
            </div>

        </div>



    )

}