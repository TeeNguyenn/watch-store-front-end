import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starFill } from '@fortawesome/free-solid-svg-icons';
import {
    faStarHalfStroke,
    faStar as star,
} from '@fortawesome/free-regular-svg-icons';

export const renderRating = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i - rate < 1 && i - rate > 0) {
            stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />);
            continue;
        }

        if (i <= rate) {
            stars.push(<FontAwesomeIcon icon={starFill} />);
        } else {
            stars.push(<FontAwesomeIcon icon={star} />);
        }
    }
    return stars;
};
