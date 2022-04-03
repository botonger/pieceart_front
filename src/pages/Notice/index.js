import './index.css';
import { Nav, Footer, Button, MagnifyingGlass } from '../../components';
import { useState, useEffect, useRef, useCallback } from 'react';
import checkLoggedIn from '../../util/check-logged-in';
import noticeService from '../../services/notice.service';
import { Link } from 'react-router-dom';
import checkAdmin from '../../util/check-admin';

//공지사항
const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [pagesToShow, setPagesToShow] = useState([]);
    const [i, setI] = useState(0);
    let pagesRef = useRef();
    const inputRef = useRef();

    //공지사항 목록 가져오기
    const fetch = useCallback(async function () {
        const response = await noticeService.findAllNotices();
        setNotices(response.data.data);
        const pageNum = Math.ceil(response.data.totalCount / 10);
        setPagesToShow(Array.from({ length: pageNum }, (v, i) => i + 1));
    }, []);

    //검색어별 공지사항 목록 가져오기
    async function searchNotice() {
        const search = inputRef.current.value;
        const response = await noticeService.findNoticesByPageSearch(search);
        setNotices(response.data.data);
    }

    //조회수 증가
    async function increaseViewCount(id) {
        await noticeService.readNotice(id);
    }
    //공지사항 삭제
    async function deleteNotice(e) {
        const pass = prompt('비밀번호를 입력하세요');
        const id = e.target.parentNode.parentNode.parentNode.children[0].innerText;
        const response = await noticeService.deleteNotice(id, pass);
        if (response.status === 204) {
            fetch();
        } else {
            alert('비밀번호 불일치!');
        }
        fetch();
    }

    useEffect(() => {
        fetch();
    }, [fetch]);

    //페이지별 공지사항 목록 가져오기
    async function getPage(page) {
        const response = await noticeService.findNoticesByPage(page);
        setNotices(response.data.data);
    }

    const toggleContent = e => {
        const target = e.target.parentNode.nextElementSibling;
        target.classList.toggle('notice-toggle-true');
        console.log(target.classList.contains('notice-toggle-true'));

        if (target.classList.contains('notice-toggle-true')) {
            const id = e.target.previousSibling.innerText;
            increaseViewCount(id);
        }
    };

    //페이징 관련 메서드
    const showPages = i => {
        return pagesToShow
            .filter(p => p > i * 5 && p <= i * 5 + 5)
            .map((page, key) => (
                <div className="page" key={key} onClick={() => getPage(page)}>
                    {page}
                </div>
            ));
    };

    const increaseI = () => {
        if (Math.ceil(pagesToShow.length / 5) === i + 1) {
            setI(i);
            return;
        }
        setI(i + 1);
        getPage(5 * (i + 1) + 1);
    };

    const decreaseI = () => {
        if (i === 0) {
            setI(0);
            return;
        }
        setI(i - 1);
        getPage(5 * (i - 1) + 1);
    };

    return (
        <>
            {checkLoggedIn() ? (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        mypage: 'My Page',
                        logout: 'Sign out',
                    }}
                />
            ) : (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        login: 'Sign in',
                    }}
                />
            )}
            <main>
                <div className="notice-box animation">
                    <notice-search>
                        <input type="text" placeholder="검색어" ref={inputRef}></input>
                        <Button value="검색" type="submit" clickHandler={searchNotice}></Button>
                        {checkAdmin() && (
                            <Link to="/notice/write">
                                <Button value="글쓰기" type="submit"></Button>
                            </Link>
                        )}
                    </notice-search>
                    <table className="notice-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>등록일</th>
                                <th>조회</th>
                                {checkAdmin() && <th>수정/삭제</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map(notice => (
                                <>
                                    <tr>
                                        <td>{notice.id}</td>
                                        <td onClick={toggleContent} className="notice-title">
                                            {notice.title}
                                        </td>
                                        <td>{notice.writer}</td>
                                        <td>{notice.modified}</td>
                                        <td>{notice.viewCount}</td>
                                        {checkAdmin() && (
                                            <td>
                                                <div className="notice-buttons">
                                                    <Link
                                                        to={`/notice/write/${notice.id}?title=${notice.title}&content=${notice.content}`}
                                                    >
                                                        <Button
                                                            value="modify"
                                                            type="button"
                                                            color="white"
                                                        ></Button>
                                                    </Link>
                                                    <Button
                                                        value="delete"
                                                        type="button"
                                                        color="white"
                                                        clickHandler={deleteNotice}
                                                    ></Button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                    <tr className="notice-content notice-toggle-false">
                                        <td colSpan={checkAdmin() ? '6' : '5'}>
                                            {notice.fileName !== null && (
                                                <img
                                                    src={`https://54.164.147.51:8090/api/notices/${notice.id}`}
                                                    alt="notice-pt"
                                                    style={{ width: '500px' }}
                                                ></img>
                                            )}
                                            <div>{notice.content}</div>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                    <notice-page>
                        {pagesToShow.length > 5 && (
                            <div
                                className="page"
                                onClick={() => {
                                    getPage(1);
                                    setI(0);
                                }}
                            >
                                {`<<`}
                            </div>
                        )}
                        {pagesToShow.length > 5 && (
                            <div className="page" onClick={() => decreaseI()}>
                                {`<`}
                            </div>
                        )}
                        <div ref={pagesRef} style={{ display: 'flex' }}>
                            {showPages(i)}
                        </div>
                        {pagesToShow.length > 5 && (
                            <div
                                className="page"
                                onClick={() => {
                                    increaseI();
                                }}
                            >
                                {`>`}
                            </div>
                        )}
                        {pagesToShow.length > 5 && (
                            <div
                                className="page"
                                onClick={() => {
                                    getPage(pagesToShow[pagesToShow.length - 1]);
                                    setI(Math.ceil(pagesToShow.length / 5) - 1);
                                }}
                            >
                                {`>>`}
                            </div>
                        )}
                    </notice-page>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Notice;
