import styles from '../styles/cast-pfp.component.module.scss';
import { MovieCastMember, MovieCrewMember } from '../backend/meta';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';

export interface CastPfpComponentProps {
    member : MovieCastMember | MovieCrewMember
}

export default function CastPfpComponent({member} : CastPfpComponentProps) {

    const castName : string = member.name;
    const castPfp : string = "https://image.tmdb.org/t/p/w500/" + member.profile_path;

    const character = (member as MovieCastMember).character;
    const job = (member as MovieCrewMember).job;
    
    return (
        <div className={styles.container}>
            <div className={styles.pfp}>
                <ImageWrapperComponent src={castPfp} />
            </div>
            <div className={styles.name}>
                {castName}
            </div>
            {!!character && <div className={styles.role}>
                {character}
            </div>}

            {!!job && <div className={styles.role}>
                {job}
            </div>}
        </div>



    )

}