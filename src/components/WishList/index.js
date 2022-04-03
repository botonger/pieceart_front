import './index.css';
import { Button, Heart } from '../../components';
import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import wishlistService from '../../services/wishlist.service';

//위시리스트
const WishList = ({ display }) => {
    const [Wishlist, setWishlist] = useState([]);
    let location = useLocation();
    const [Modal, setModal] = useState(false);
    const [WishId, setWishId] = useState();

    //위시리스트 가져오기
    const fetch = useCallback(async function () {
        const response = await wishlistService.findMyWishlists();
        setWishlist(response.data.wishlist);
    }, []);

    //로딩 시 위시리스트 가져오기
    useEffect(() => {
        fetch();
    }, [fetch]);
    //의존성 배열을 속이지 말라. const something = useCallback(() => {}, []) -> 의존성배열에 [something] 추가하기
    //state가 변경되었을 때 인식하지 못하고 렌더링이 되지 않는 경우가 있으니 의존성 배열은 비워두지 않는 것이 좋다.

    //위시리스트 삭제하기
    async function deleteWishlist() {
        await wishlistService.deleteWishlist(WishId);
        openModal();
        fetch();
    }

    //현재 path값 얻기
    const QueryNavLink = ({ to, children, ...props }) => {
        setWishId(location.pathname.split('/').length === 3 && location.pathname.split('/')[2]);
        return (
            <NavLink to={to} {...props}>
                {children}
            </NavLink>
        );
    };

    //모달 여닫기
    const openModal = () => {
        setModal(Modal ? false : true);
    };

    return (
        <>
            <div className={display ? 'tab-show' : 'tab-hide'}>
                <div className="wishlist-container animation">
                    <div className="delete-wish" style={{ display: Modal ? 'flex' : 'none' }}>
                        <p>Delete ME?</p>
                        <QueryNavLink to="/mypage">
                            <Button
                                value="yes"
                                type="button"
                                clickHandler={deleteWishlist}
                                color="white"
                            ></Button>
                        </QueryNavLink>
                        <QueryNavLink to="/mypage">
                            <Button
                                value="no, keep it"
                                type="button"
                                color="white"
                                clickHandler={openModal}
                            ></Button>
                        </QueryNavLink>
                    </div>
                    {Wishlist &&
                        Wishlist.map(wish => (
                            <div key={wish.id} className="wishlist">
                                <img src={`images/${wish.imgUrl.imageUrl}`} alt="wishlist" />
                                <div className="wish-detail-box">
                                    <div className="wish-detail">
                                        <div className="wish-artist">{wish.artistName}</div>
                                        <div className="wish-title">{wish.worksTitle}</div>
                                        <div className="wish-amount">
                                            Pieces Available: <span>{wish.piecesLeft}</span> p x{' '}
                                            <span>{wish.initialPrice / 1000} </span>won
                                        </div>
                                        <div className="wish-sum">
                                            Current Price: <span>{wish.currentPrice}</span> won
                                        </div>
                                    </div>
                                    <div className={`wish-heart-button`}>
                                        <QueryNavLink to={`/mypage/${wish.id}`}>
                                            <Heart clickHandler={openModal}></Heart>
                                        </QueryNavLink>
                                        <NavLink
                                            key={wish.id}
                                            to={`/detail/${wish.worksId}`}
                                            className={`detail-button`}
                                        >
                                            <Button value="buy" type="button"></Button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default WishList;
