import './index.css';
import { Nav, Footer, MagnifyingGlass, FaHeartRegular, Heart } from '../../components';
import checkLoggedIn from '../../util/check-logged-in';
import { useCallback, useEffect, useRef, useState } from 'react';
import searchService from '../../services/search.service';
import { useParams } from 'react-router-dom';
import stringToHTML from '../../util/stringToHTML';
import DayCounter from '../../util/dday-count';
import auctionService from '../../services/auction.service';
import piecesService from '../../services/pieces.service';
import wishlistService from '../../services/wishlist.service';

//상세 페이지
const Detail = () => {
    const [works, setWorks] = useState();
    let worksId = useParams();
    const [amountOfPieces, setAmountOfPieces] = useState(0);
    const [price, setPrice] = useState();
    const bidsPrice = useRef();
    const disabled1 = useRef();
    const disabled2 = useRef();
    const [wishlistCheck, setWishlistCheck] = useState(0);

    //특정 작품 불러오기
    const fetch = useCallback(async function () {
        const search = await searchService.findSpecificWork(worksId.worksId);
        setWorks(search.data.works);
        setPrice(search.data.works.currentPrice || search.data.works.initialPrice);
        setAmountOfPieces(1000 - search.data.works.sumOfPieces);
        setWishlistCheck(search.data.wishlistCheck);

        if (new Date(search.data.works.auctionEndDate) < new Date()) {
            disabled1.current.disabled = true;
            disabled2.current.disabled = true;
        }
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const increasePieces = () => {
        if (amountOfPieces === 1000 - works.sumOfPieces) {
            setAmountOfPieces(1000 - works.sumOfPieces);
        } else {
            setAmountOfPieces(amountOfPieces + 50);
        }
    };

    const decreasePieces = () => {
        if (amountOfPieces === 0) {
            setAmountOfPieces(0);
        } else {
            setAmountOfPieces(amountOfPieces - 50);
        }
    };

    const increasePrice = () => {
        if (price < 500000) {
            setPrice(price + 50000);
        } else if (price < 1000000) {
            setPrice(price + 100000);
        } else if (price < 10000000) {
            setPrice(price + 500000);
        } else {
            setPrice(price + 1000000);
        }
    };

    const decreasePrice = () => {
        if (price === works.currentPrice) {
            setPrice(works.currentPrice);
        } else if (price <= 500000) {
            setPrice(price - 50000);
        } else if (price <= 1000000) {
            setPrice(price - 100000);
        } else if (price <= 10000000) {
            setPrice(price - 500000);
        } else {
            setPrice(price - 1000000);
        }
    };

    //응찰하기
    async function makeBids() {
        const bids = bidsPrice.current.value;
        const currentPrice = parseInt(bids.replaceAll(',', ''));
        if (currentPrice <= works.currentPrice) {
            alert(`현재 최고 입찰가 ${works.currentPrice} 원보다 높은 응찰가를 제시해 주십시오.`);
            return;
        }

        await auctionService.createBid({
            worksId: parseInt(worksId.worksId),
            currentPrice,
        });
        fetch();
    }

    //조각 구매
    async function purchasePieces() {
        if (amountOfPieces <= 0) {
            setAmountOfPieces(0);
            alert('조각 수를 선택하세요');
            return;
        }
        await piecesService.purchasePieces({
            worksId: parseInt(worksId.worksId),
            piecesPurchased: amountOfPieces,
        });
        fetch();
    }

    //위시리스트 추가/삭제
    async function changeWishlist() {
        wishlistCheck
            ? await wishlistService.deleteWishlist(wishlistCheck)
            : await wishlistService.createWishlist(worksId.worksId);

        fetch();

        // checkLoggedIn && setWishlistCheck(wishlistCheck ? 0 : wishlistId);
    }
    return (
        <>
            {checkLoggedIn() ? (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        notice: 'Notice',
                        mypage: 'My Page',
                        logout: 'Sign out',
                    }}
                />
            ) : (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        notice: 'Notice',
                        login: 'Sign in',
                    }}
                />
            )}

            <main>
                {works && (
                    <div className="detail-container">
                        <div className="detail-top">
                            <div>
                                <img
                                    src={`../images/${
                                        works.image.filter(el => el.type === 'ma')[0].imageUrl
                                    }`}
                                    alt={`artworks`}
                                />
                            </div>
                            <div>
                                <div>
                                    no. {works.id}
                                    <div onClick={changeWishlist}>
                                        {wishlistCheck ? (
                                            <Heart></Heart>
                                        ) : (
                                            <FaHeartRegular></FaHeartRegular>
                                        )}
                                    </div>
                                </div>
                                <div>{works.artist.name}</div>
                                <div>{works.name}</div>
                                <div>{stringToHTML(works.description)}</div>
                                <div>
                                    {works.size} | {works.createdYear}
                                </div>
                                <div>
                                    시작가<span>{works.initialPrice.toLocaleString('ko-KR')}</span>{' '}
                                    원
                                </div>
                                <div>
                                    현재가<span>{works.currentPrice.toLocaleString('ko-KR')}</span>{' '}
                                    원
                                </div>
                                <div>
                                    조각가격
                                    <span>
                                        {(works.initialPrice / 1000).toLocaleString('ko-KR')}
                                    </span>{' '}
                                    원
                                </div>
                                <div>
                                    {'예상수익 '}
                                    <span>
                                        {parseInt(
                                            ((works.currentPrice - works.initialPrice) /
                                                works.initialPrice) *
                                                100,
                                        )}
                                    </span>
                                    {' %, '}
                                    <span>
                                        {(1000 - works.sumOfPieces).toLocaleString('ko-KR')}
                                    </span>{' '}
                                    left
                                </div>
                                <div className="pieces-bar">
                                    <div
                                        className="pieces-inner-bar"
                                        style={{ width: `${works.sumOfPieces / 10}%` }}
                                    >
                                        <div className="pieces-inner-inner-bar"></div>
                                    </div>
                                </div>
                                <div>{`${works.auctionStartDate} - ${works.auctionEndDate}`}</div>
                                <div>
                                    <DayCounter>{works.auctionEndDate}</DayCounter>
                                </div>
                                <div className="detail-bid-button">
                                    <button className="control" onClick={decreasePrice}>
                                        -
                                    </button>
                                    <input
                                        placeholder="응찰 가격"
                                        ref={bidsPrice}
                                        value={price ? price.toLocaleString('ko-KR') : undefined}
                                    ></input>
                                    <button className="control" onClick={increasePrice}>
                                        +
                                    </button>
                                    <button onClick={makeBids} disabled={false} ref={disabled1}>
                                        bid
                                    </button>
                                </div>
                                <div className="detail-buy-button">
                                    <button className="control" onClick={decreasePieces}>
                                        -
                                    </button>
                                    <input
                                        placeholder="0"
                                        value={
                                            amountOfPieces
                                                ? amountOfPieces.toLocaleString('ko-KR')
                                                : undefined
                                        }
                                    ></input>
                                    <button className="control" onClick={increasePieces}>
                                        +
                                    </button>
                                    <button
                                        onClick={purchasePieces}
                                        disabled={false}
                                        ref={disabled2}
                                    >
                                        buy
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="detail-bottom">
                            <div>
                                <div>
                                    <span>작가 소개</span>
                                </div>
                                <div>{works.artist.name}</div>
                                <div>{stringToHTML(works.artist.description)}</div>
                                <div>{stringToHTML(works.artist.degree)}</div>
                                <div>{stringToHTML(works.artist.achieve)}</div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Detail;
