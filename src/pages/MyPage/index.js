import './index.css';
import { Nav, MyBids, MyPieces, WishList, UserEdit, MagnifyingGlass } from '../../components';
import { useState } from 'react';
import Footer from '../../components/Footer';

const MyPage = () => {
    const [myBids, setMyBids] = useState(false);
    const [pieces, setPieces] = useState(false);
    const [wishList, setWishList] = useState(true);
    const [userEdit, setUserEdit] = useState(false);

    const selectTabContent = e => {
        const tab = e.target.textContent;
        // eslint-disable-next-line default-case
        switch (tab) {
            case 'My Bids':
                setMyBids(true);
                setPieces(false);
                setWishList(false);
                setUserEdit(false);
                break;
            case 'Pieces':
                setMyBids(false);
                setPieces(true);
                setWishList(false);
                setUserEdit(false);
                break;
            case 'Wishlist':
                setMyBids(false);
                setPieces(false);
                setWishList(true);
                setUserEdit(false);
                break;
            case 'Edit':
                setMyBids(false);
                setPieces(false);
                setWishList(false);
                setUserEdit(true);
                break;
        }
    };
    return (
        <>
            <Nav
                title="PieceART"
                menu_link={{ search: <MagnifyingGlass /> }}
                modal_link={{
                    notice: 'Notice',
                    logout: 'Sign out',
                }}
            />
            <div className="mypage-tabs">
                <div className="mypage-title">
                    <div
                        onClick={selectTabContent}
                        className={wishList ? 'tab-highlight' : undefined}
                    >
                        Wishlist
                    </div>
                    <div
                        onClick={selectTabContent}
                        className={myBids ? 'tab-highlight' : undefined}
                    >
                        My Bids
                    </div>
                    <div
                        onClick={selectTabContent}
                        className={pieces ? 'tab-highlight' : undefined}
                    >
                        Pieces
                    </div>
                    <div
                        onClick={selectTabContent}
                        className={userEdit ? 'tab-highlight' : undefined}
                    >
                        Edit
                    </div>
                </div>
            </div>
            <main>
                <div className="mypage-body">
                    <MyBids display={myBids}></MyBids>
                    <MyPieces display={pieces}></MyPieces>
                    <WishList display={wishList}></WishList>
                    <UserEdit display={userEdit}></UserEdit>
                </div>
            </main>
        </>
    );
};

export default MyPage;
