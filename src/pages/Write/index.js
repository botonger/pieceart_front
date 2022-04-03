import './index.css';
import { Nav, Footer, Input, Button, MagnifyingGlass } from '../../components';
import { useState, useRef, useEffect } from 'react';
import checkLoggedIn from '../../util/check-logged-in';
import noticeService from '../../services/notice.service';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

//공지사항
const Notice = () => {
    const fileRef = useRef();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const [fileAttached, setFileAttached] = useState();
    let navigate = useNavigate();
    let noticeId = useParams();
    let [searchParams] = useSearchParams();

    useEffect(() => {
        setTitle(searchParams.get('title'));
        setContent(searchParams.get('content'));
    }, [searchParams]);

    const chooseFile = e => {
        e.preventDefault();
        fileRef.current.click();
    };

    const onImageChange = async e => {
        setFileAttached(e.target.files[0]);
    };

    const onChangeTitle = e => {
        setTitle(e.target.value);
    };
    const onChangeContent = e => {
        setContent(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    //공지사항 등록(파일 업로드 포함)
    async function postNotice() {
        const formData = new FormData();
        formData.append('file', fileAttached);

        if (noticeId.id !== undefined) {
            formData.append(
                'notice',
                new Blob([JSON.stringify({ id: noticeId.id, title, content, password })], {
                    type: 'application/json',
                }),
            );
            const response = await noticeService.modifyNotice(noticeId.id, formData);
            if (response.data.data === null) alert('비밀번호가 다릅니다');
            return navigate('/notice');
        }

        formData.append(
            'notice',
            new Blob([JSON.stringify({ title, content, password })], { type: 'application/json' }),
        );

        const response = await noticeService.postNotice(formData);
        if (response.data === null) {
            alert('서버 오류');
            return;
        }
        return navigate('/notice');
    }

    return (
        <>
            {checkLoggedIn() ? (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        upcoming: 'Upcoming',
                        mypage: 'My Page',
                        logout: 'Sign out',
                    }}
                />
            ) : (
                <Nav
                    title="PieceART"
                    menu_link={{ search: <MagnifyingGlass /> }}
                    modal_link={{
                        upcoming: 'Upcoming',
                        login: 'Sign in',
                    }}
                />
            )}
            <main>
                <div className="notice-write-box animation">
                    <div>
                        <form>
                            <div class="write-form-class">
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="제목을 입력하세요"
                                    value={title}
                                    changeHandler={onChangeTitle}
                                    autoFocus={true}
                                ></Input>
                            </div>
                            <div class="write-form-class">
                                <textarea
                                    name="content"
                                    placeholder="내용을 입력하세요"
                                    value={content}
                                    onChange={onChangeContent}
                                ></textarea>
                            </div>
                            <div class="write-form-class">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    ref={fileRef}
                                    onChange={onImageChange}
                                ></input>
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    changeHandler={onChangePassword}
                                    placeholder="비밀번호"
                                />
                                <Button
                                    type="button"
                                    value="첨부파일"
                                    clickHandler={chooseFile}
                                ></Button>
                                <Button
                                    value="submit"
                                    type="button"
                                    clickHandler={postNotice}
                                ></Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Notice;
