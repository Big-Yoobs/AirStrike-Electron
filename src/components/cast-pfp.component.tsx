import styles from '../styles/cast-pfp.component.module.scss';
import { MovieCastMember, MovieCrewMember } from '../backend/meta';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';

// the profile picture component for both cast and crew members as seen on the film page

export interface CastPfpComponentProps {
    member : MovieCastMember | MovieCrewMember
}

export default function CastPfpComponent({member} : CastPfpComponentProps) {

    const castName = member.name;
    const castPfp = "https://image.tmdb.org/t/p/w500/" + member.profile_path;

    const character = (member as MovieCastMember).character;
    const job = (member as MovieCrewMember).job;
    
    return (
        <div className={styles.container}>
            {/* profile picture */}
            <div className={styles.pfp}>
                <ImageWrapperComponent src={castPfp} fallback="gui://personW.png" />
            </div>
            
            {/* name and role */}
            <div className={styles.name}>
                {castName}
            </div>
            <div className={styles.role}>{character || job}</div>
        </div>
    )
}