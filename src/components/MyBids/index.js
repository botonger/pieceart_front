import './index.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import auctionService from '../../services/auction.service';
import { Trash, Button } from '../../components';
import DayCounter from '../../util/dday-count';
import { NavLink, useLocation } from 'react-router-dom';

//입찰내역
const MyBids = ({ display }) => {
    const [bidList, setBidList] = useState([]);
    const [bidId, setBidId] = useState();
    const identity = useRef('');
    const location = useLocation();
    const [Modal, setModal] = useState(false);

    //입찰내역 가져오기
    const fetch = useCallback(async function () {
        const response = await auctionService.findBidlists();
        const myBidsList = response.data.auction
            .filter(bid => bid.currentPrice === bid.myPrice)
            .sort((a, b) => new Date(b.auctionEndDate) - new Date(a.auctionEndDate));
        setBidList(myBidsList);
    }, []);

    //로딩 시 입찰내역 가져오기
    useEffect(() => {
        fetch();
    }, [fetch]);

    //입찰 취소하기
    async function cancelBids() {
        openModal();
        await auctionService.deleteBid(bidId);
        fetch();
    }

    //상세 페이지 이동
    const QueryNavLink = ({ to, children, ...props }) => {
        setBidId(location.pathname.split('/')[2]);
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
            <div className="mybids-container animation">
                {bidList.length > 0 &&
                    bidList.map(bid => (
                        <div key={bid.id} className="mybids">
                            <div ref={identity}>
                                {bid.bidDate.replace('T', ' ')} - {bid.id}
                            </div>
                            <div>
                                <div>
                                    <NavLink to={`/detail/${bid.worksId}`}>
                                        <img
                                            src={`images/${bid.imgUrl.imageUrl}`}
                                            alt={`bid${bid.id}`}
                                        />
                                    </NavLink>
                                </div>
                                <div>
                                    <div>{bid.artistName}</div>
                                    <div>{bid.worksTitle}</div>
                                    <div>{bid.currentPrice.toLocaleString('ko-KR')} 원</div>
                                    <div>
                                        <DayCounter>{bid.auctionEndDate}</DayCounter>
                                    </div>
                                    <div>
                                        {new Date(bid.auctionEndDate) > new Date() ? (
                                            <QueryNavLink to={`/mypage/${bid.id}`}>
                                                <div
                                                    onClick={openModal}
                                                    style={{ display: Modal ? 'none' : 'block' }}
                                                >
                                                    <span>cancellation</span>
                                                    <Trash></Trash>
                                                </div>
                                            </QueryNavLink>
                                        ) : (
                                            <div>낙찰</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                <div style={{ display: Modal ? 'block' : 'none' }} className="bids-modal">
                    {bidList
                        .filter(bid => bid.id === parseInt(bidId))
                        .map(el => (
                            <div>
                                <div style={{ color: 'salmon' }}>[ 입찰을 취소하시겠습니까? ]</div>
                                <div>
                                    ∙ 입찰 번호: {el.bidDate.replace('T', ' ')} - {el.id}
                                </div>
                                <div>∙ 작가: {el.artistName}</div>
                                <div>∙ 작품명: {el.worksTitle}</div>
                                <div>∙ 입찰가: {el.myPrice.toLocaleString('ko-KR')}</div>
                                <div>
                                    <QueryNavLink to="/mypage">
                                        <Button
                                            value="cancel bids"
                                            type="button"
                                            clickHandler={cancelBids}
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

export default MyBids;
