import './index.css';
import { Nav, Footer, Button } from '../../components';
import checkLoggedIn from '../../util/check-logged-in';
import { useState, useEffect, useRef, useCallback } from 'react';
import searchService from '../../services/search.service';
import { NavLink } from 'react-router-dom';

//검색 페이지
const Search = () => {
    const [artworksRaw, setArtworksRaw] = useState([]);
    const [artworksList, setArtworksList] = useState([]);
    const searchWord = useRef();

    const fetch = useCallback(async function () {
        const searches = await searchService.findSearchlists();
        setArtworksRaw(searches.data.works);
        setArtworksList(searches.data.works);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const searchWorks = () => {
        let word = searchWord.current.value.toLowerCase();
        const filteredArrArtist = artworksRaw.filter(el =>
            el.artist.name.toLowerCase().includes(word),
        );
        const filteredArrTitle = artworksRaw.filter(
            el => !filteredArrArtist.includes(el) && el.name.toLowerCase().includes(word),
        );
        setArtworksList([...filteredArrArtist, ...filteredArrTitle]);
    };

    const byCelebrity = () => {
        const arrCopied = [...artworksList];
        setArtworksList(arrCopied.sort((a, b) => b.sumOfWishlist - a.sumOfWishlist));
    };
    const byEndDate = () => {
        const arrCopied = [...artworksList];
        setArtworksList(
            arrCopied.sort((a, b) => new Date(b.auctionEndDate) - new Date(a.auctionEndDate)),
        );
    };
    const byPrice = () => {
        const arrCopied = [...artworksList];
        setArtworksList(
            arrCopied.sort((a, b) => new Date(b.initialPrice) - new Date(a.initialPrice)),
        );
    };
    const byProfit = () => {
        const arrCopied = [...artworksList];
        setArtworksList(
            arrCopied.sort(
                (a, b) =>
                    (b.currentPrice - b.initialPrice) / b.initialPrice -
                    (a.currentPrice - a.initialPrice) / a.initialPrice,
            ),
        );
    };
    return (
        <>
            {checkLoggedIn() ? (
                <Nav
                    title="PieceART"
                    menu_link={{}}
                    modal_link={{
                        notice: 'Notice',
                        mypage: 'My Page',
                        logout: 'Sign out',
                    }}
                />
            ) : (
                <Nav
                    title="PieceART"
                    menu_link={{}}
                    modal_link={{
                        notice: 'Notice',
                        login: 'Sign in',
                    }}
                />
            )}
            <main>
                <search-container>
                    <div className="search-area search-animation">
                        <div>
                            <input
                                placeholder="작가명, 작품명 검색"
                                ref={searchWord}
                                autoFocus
                            ></input>
                            <Button
                                value="search"
                                type="button"
                                clickHandler={searchWorks}
                            ></Button>
                        </div>
                        <div className="search-criteria">
                            <Button
                                value="인기순"
                                type="button"
                                color="transparent"
                                clickHandler={byCelebrity}
                            ></Button>
                            <Button
                                value="마감일순"
                                type="button"
                                color="transparent"
                                clickHandler={byEndDate}
                            ></Button>
                            <Button
                                value="가격순"
                                type="button"
                                color="transparent"
                                clickHandler={byPrice}
                            ></Button>
                            <Button
                                value="수익률순"
                                type="button"
                                color="transparent"
                                clickHandler={byProfit}
                            ></Button>
                        </div>
                    </div>
                    <display-area>
                        {artworksList.map(artworks => (
                            <card-box key={artworks.id}>
                                <image-box>
                                    <NavLink to={`/detail/${artworks.id}`}>
                                        <img
                                            src={`images/${
                                                artworks.image.filter(i => i.type === 'ma')[0]
                                                    .imageUrl
                                            }`}
                                            alt="thumb"
                                        ></img>
                                    </NavLink>
                                </image-box>
                                <image-description>
                                    <div>
                                        <div>{artworks.artist.name}</div>
                                    </div>
                                    <div>{artworks.name}</div>
                                    <div className="pieces-bar-box">
                                        <div>
                                            {'예상수익 '}
                                            <span>
                                                {parseInt(
                                                    ((artworks.currentPrice -
                                                        artworks.initialPrice) /
                                                        artworks.initialPrice) *
                                                        100,
                                                )}
                                            </span>
                                            {' %, '}
                                            {(1000 - artworks.sumOfPieces).toLocaleString(
                                                'ko-KR',
                                            )}{' '}
                                            left
                                        </div>
                                        <div className="pieces-bar">
                                            <div
                                                className="pieces-inner-bar"
                                                style={{ width: `${artworks.sumOfPieces / 10}%` }}
                                            >
                                                <div className="pieces-inner-inner-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {artworks.initialPrice.toLocaleString('ko-KR')} ~{' '}
                                        {artworks.currentPrice === 0
                                            ? artworks.initialPrice.toLocaleString('ko-KR')
                                            : artworks.currentPrice.toLocaleString('ko-KR')}{' '}
                                        원
                                    </div>
                                    <div>
                                        {artworks.auctionStartDate} - {artworks.auctionEndDate}
                                    </div>
                                </image-description>
                            </card-box>
                        ))}
                    </display-area>
                </search-container>
            </main>
            <Footer />
        </>
    );
};

export default Search;
