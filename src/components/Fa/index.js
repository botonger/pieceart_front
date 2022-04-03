import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faUserPlus,
    faArrowRightToBracket,
    faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons';

export const Heart = ({ clickHandler }) => {
    return (
        <div>
            <FontAwesomeIcon onClick={clickHandler} icon={faHeart} size="lg" color="salmon" />
        </div>
    );
};

export const MagnifyingGlass = () => {
    return <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" inverse />;
};

export const UserPlus = () => {
    return <FontAwesomeIcon icon={faUserPlus} size="lg" inverse />;
};

export const ArrowUp = () => {
    return <FontAwesomeIcon icon={faArrowUp} size="lg" inverse />;
};

export const ArrowLogin = () => {
    return <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" inverse />;
};

export const Trash = ({ clickHandler }) => {
    return (
        <FontAwesomeIcon
            icon={faTrashCanArrowUp}
            onClick={clickHandler}
            color="rgb(143, 143, 143)"
            size="sm"
        />
    );
};

export const FaHeartRegular = () => {
    return <FontAwesomeIcon icon={faHeartRegular} size="lg" color="salmon" />;
};
