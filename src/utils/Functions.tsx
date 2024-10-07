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

export const imageMagnifier = (selector: string, percentage: number) => {
    const imgWrapperList = document.querySelectorAll<HTMLElement>(selector);

    imgWrapperList.forEach(function (imgWrapperElement, index) {
        const imgElement = imgWrapperElement.querySelector<HTMLElement>('img');

        // Event Mouse Enter
        imgWrapperElement?.addEventListener('mouseenter', () => {
            imgElement!.style.width = percentage + '%';
            imgElement!.style.height = percentage + '%';
        });

        // Event Mouse Leave
        imgWrapperElement?.addEventListener('mouseleave', () => {
            imgElement!.style.width = '100%';
            imgElement!.style.height = '100%';
            imgElement!.style.top = '0';
            imgElement!.style.left = '0';
        });

        // Event Mouse Move
        imgWrapperElement?.addEventListener('mousemove', function (mouseEvent) {
            let obj = imgWrapperElement;
            let obj_left = 0;
            let obj_top = 0;
            let xpos: any;
            let ypos: any;
            let left = 0;

            while (obj.offsetParent) {
                obj_left += obj.offsetLeft;
                obj_top += obj.offsetTop;
                obj = obj.offsetParent as HTMLElement;
            }

            if (mouseEvent) {
                //FireFox
                xpos = mouseEvent.pageX;
                ypos = mouseEvent.pageY;
            }

            xpos! -= obj_left;
            ypos! -= obj_top;

            xpos = xpos + this.clientWidth * index;

            const imgWidth = imgElement?.clientWidth;
            const imgHeight = imgElement?.clientHeight;

            imgElement!.style.top = `
            -${
                ((imgHeight! - this!.clientHeight) * ypos!) / this.clientHeight
            }px`;

            left = ((imgWidth! - this!.clientWidth) * xpos!) / this.clientWidth;

            imgElement!.style.left = `-${left}px`;
        });

        // // Change height of the image wrapper
        function changeHeight() {
            imgWrapperElement!.style.height =
                imgWrapperElement?.clientWidth + 'px';
        }

        changeHeight();

        // // changeHeight
        window.addEventListener('resize', changeHeight);
    });
};

export function formatPrice(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function splitArrayAtIndex(arr: any[], index: number) {
    const firstPart = arr.slice(0, index);
    const secondPart = arr.slice(index);
    return [firstPart, secondPart];
}

export function getCurrentDate(orderDate: number) {
    const today = new Date(orderDate);

    const day = today.getDate();
    const year = today.getFullYear();

    // Mảng chứa tên các tháng bằng tiếng Anh
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[today.getMonth()]; // Lấy tên tháng từ mảng

    return `${month} ${day}, ${year}`;
}

export function getCurrentDateWithHour(
    orderDate: number,
    isHasYear: boolean = false
) {
    const today = new Date(orderDate);

    const day = today.getDate();
    const year = today.getFullYear();

    // Mảng chứa tên các tháng bằng tiếng Anh
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[today.getMonth()]; // Lấy tên tháng từ mảng

    // Lấy giờ, phút và giây
    let hours = today.getHours();
    const minutes = today.getMinutes();

    // Xác định AM hoặc PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Chuyển đổi giờ sang định dạng 12 giờ
    hours = hours % 12;
    hours = hours ? hours : 12; // Giờ 0 sẽ chuyển thành 12

    // Format lại phút cho đủ 2 chữ số
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    if (isHasYear) {
        return `${month} ${day}, ${year} ${hours}:${minutesFormatted} ${ampm}`;
    }

    return `${month} ${day}, ${hours}:${minutesFormatted} ${ampm}`;
}
