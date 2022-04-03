import './index.css';
import { Link } from 'react-router-dom';
import { React, useCallback, useEffect, useState } from 'react';
import promotionService from '../../services/promotion.service';
import stringToHTML from '../../util/stringToHTML';

//메인화면 프로모션 목록 가져오기
const Promotion = () => {
    const [image, setImage] = useState();

    const fetch = useCallback(async function () {
        const response = await promotionService.findAllPromotion();
        const promotions = response.data.promotion;
        setImage(promotions[0]);

        let count = 0;
        const timer = setInterval(() => {
            count = count === promotions.length - 1 ? 0 : count + 1;
            setImage(promotions[count]);
        }, 5000);
        // return () => {
        //     clearInterval(timer);
        // };
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return (
        <div className="promotion">
            <div className="slider animation">
                <img
                    src={image && `images/${image && image.worksImg.imageUrl}`}
                    alt="promotion"
                ></img>
                <div className="opacity"></div>
                <div className="description-box">
                    <div>{image && image.eventTitle}</div>
                    <div>{image && stringToHTML(image.eventDescription)}</div>
                    <div>{image && image.artistName}</div>
                    <div>{image && image.worksTitle}</div>
                    {image && (
                        <Link to={`/detail/${image.worksId}`}>
                            <button type="button">상세보기</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Promotion;
