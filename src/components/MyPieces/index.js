import piecesService from '../../services/pieces.service';
import { useState, useEffect, useCallback } from 'react';
import './index.css';
import { Button } from '../../components';
import { NavLink, useLocation } from 'react-router-dom';

//유저별 조각구매 현황
const MyPieces = ({ display }) => {
    const [pieces, setPieces] = useState([]);
    const [piecesId, setPiecesId] = useState();
    const location = useLocation();
    const [Modal, setModal] = useState(false);
    const [myStatus] = useState({
        totalInvestment: 0,
        profitRate: 0,
        profit: 0,
    });

    //조각구매 현황 가져오기
    const fetch = useCallback(
        async function () {
            const pieces = await piecesService.findMyPieces();
            const myPieces = await pieces.data.pieces;
            setPieces(myPieces);

            const totalInvestment = myPieces.reduce((a, b) => {
                return a + (b.piecesPurchased * b.initialPrice) / 1000;
            }, 0);

            const totalCurrentPrice = myPieces.reduce((a, b) => {
                return a + (b.piecesPurchased * b.currentPrice) / 1000;
            }, 0);

            myStatus['totalInvestment'] = totalInvestment;
            myStatus['profit'] = totalCurrentPrice - totalInvestment;
            myStatus['profitRate'] = parseInt(
                ((totalCurrentPrice - totalInvestment) / totalInvestment) * 100,
            );
        },
        [myStatus],
    );

    useEffect(() => {
        fetch();
    }, [fetch]);

    //구매 취소
    async function cancelPurchase() {
        openModal();
        await piecesService.deleteMyPieces(piecesId);
        fetch();
    }

    //상세보기 페이지 이동
    const QueryNavLink = ({ to, children, ...props }) => {
        setPiecesId(location.pathname.split('/')[2]);
        return (
            <NavLink
                to={to}
                {...props}
                style={{ textDecoration: 'none', color: 'rgb(143, 143, 143)' }}
            >
                {children}
            </NavLink>
        );
    };
    const openModal = () => {
        setModal(Modal ? false : true);
    };
    return (
        <div className={display ? 'tab-show' : 'tab-hide'}>
            <div className="pieces-container animation">
                <div className="total-investment">
                    <div className="total-box">
                        <div>투자현황</div>
                        <div>{myStatus.totalInvestment.toLocaleString('ko-KR')}원</div>
                        <div className="investment-result">
                            <div>
                                수익률<p>{myStatus.profitRate} %</p>
                            </div>
                            <div>
                                평가손익<p>{myStatus.profit.toLocaleString('ko-KR')} 원</p>
                            </div>
                        </div>
                        <div className="left-total-box"></div>
                    </div>
                </div>
                {pieces &&
                    pieces.map(p => (
                        <div key={p.id} className="pieces-box">
                            <div>
                                <div>
                                    <img
                                        src={`images/${p.imgUrl.imageUrl}`}
                                        alt={`pieces${p.id}`}
                                    />
                                </div>
                                <div>
                                    <div>{p.artistName}</div>
                                    <div>{p.worksTitle}</div>
                                    <div>
                                        <span>{p.piecesPurchased.toLocaleString('ko-KR')}</span>{' '}
                                        조각 x{' '}
                                        {`${(p.initialPrice / 1000).toLocaleString('ko-KR')}`} 원
                                    </div>
                                    <div className="pieces-bar-box">
                                        <div className="pieces-bar">
                                            <div
                                                className="pieces-inner-bar"
                                                style={{ width: `${(1000 - p.piecesLeft) / 10}%` }}
                                            >
                                                <div className="pieces-inner-inner-bar"></div>
                                            </div>
                                        </div>
                                        <div>{p.piecesLeft} left</div>
                                    </div>
                                </div>
                            </div>
                            <div className="pieces-result">
                                <div>
                                    <p>수익률</p>
                                    <p>
                                        {parseInt(
                                            ((p.currentPrice - p.initialPrice) / p.initialPrice) *
                                                100,
                                        )}{' '}
                                        %
                                    </p>
                                </div>
                                <div>
                                    <p>평가손익</p>
                                    <p>
                                        {(
                                            ((p.currentPrice - p.initialPrice) / 1000) *
                                            p.piecesPurchased
                                        ).toLocaleString('ko-KR')}{' '}
                                        원
                                    </p>
                                </div>
                                <div className="pieces-buttons">
                                    <NavLink
                                        key={p.id}
                                        to={`/detail/${p.worksId}`}
                                        className={`detail-button`}
                                    >
                                        <Button value="buy" type="button"></Button>
                                    </NavLink>
                                    <QueryNavLink to={`/mypage/${p.id}`}>
                                        <Button
                                            value="cancel"
                                            color="white"
                                            clickHandler={openModal}
                                        ></Button>
                                    </QueryNavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                <div style={{ display: Modal ? 'block' : 'none' }} className="bids-modal">
                    {pieces
                        .filter(piece => piece.id === parseInt(piecesId))
                        .map(el => (
                            <div>
                                <div style={{ color: 'salmon' }}>[ 구매를 포기하시겠습니까? ]</div>
                                <div>
                                    ∙ 구매번호: {el.purchaseDate.replace('T', ' ')} - {el.id}
                                </div>
                                <div>∙ 작가: {el.artistName}</div>
                                <div>∙ 작품명: {el.worksTitle}</div>
                                <div>∙ 취소수량: {el.piecesPurchased.toLocaleString('ko-KR')}</div>
                                <div>
                                    <QueryNavLink to="/mypage">
                                        <Button
                                            value="cancel purchase"
                                            type="button"
                                            clickHandler={cancelPurchase}
                                            color="white"
                                        ></Button>
                                    </QueryNavLink>
                                    <QueryNavLink to="/mypage">
                                        <Button
                                            value="back"
                                            type="button"
                                            color="white"
                                            clickHandler={openModal}
                                        ></Button>
                                    </QueryNavLink>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default MyPieces;
