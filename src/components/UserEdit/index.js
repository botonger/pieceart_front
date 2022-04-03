import '../../pages/LogIn/index.css';
import './index.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';
import userService from '../../services/user-registration.service';
import authService from '../../services/auth.service';
import Footer from '../Footer';

//회원정보 수정 및 삭제
const UserEdit = ({ display }) => {
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [passwordDouble, setPasswordDouble] = useState('');
    const [checkPasswordDouble, setCheckPasswordDouble] = useState(false);
    let navigate = useNavigate();

    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const onChangePasswordDouble = e => {
        (!passwordDouble || password !== passwordDouble) && setCheckPasswordDouble(false);
        e.target.value === password && setCheckPasswordDouble(true);
        setPasswordDouble(e.target.value);
    };

    const match = (type, value) => {
        const regex =
            type === 'email' ? /^[\w.]+@[\w.]+\.[a-zA-Z]{2,3}$/ : /[A-Za-z\d$@$!%*#?&_-]{4,}/;
        const test = value.match(regex);
        return test && test[0].length === value.length;
    };
    //비밀번호 변경
    const editSubmit = async e => {
        e.preventDefault();
        const response = await userService.editUser({ password });
        const t = response.data.token;
        if (t) {
            authService.setStorage(t);
            alert('비밀번호가 변경되었습니다.');
        } else {
            alert('try again');
        }
        window.location.reload(false);
    };
    //회원 탈퇴
    const deleteSubmit = async e => {
        e.preventDefault();
        await userService.deleteUser();
        authService.removeStorage();
        alert('안녕히 가세요! 다음에 또 뵙게 되길 바랍니다!');
        navigate('/');
    };
    return (
        <div className={display ? 'tab-show' : 'tab-hide'}>
            <div className="login edit animation">
                <form>
                    <div className="form-class">
                        <Input
                            type="password"
                            name="password"
                            placeholder="대문자,소문자,특수문자 포함 8자이상"
                            value={password}
                            changeHandler={onChangePassword}
                            autoFocus={true}
                        >
                            새 비밀번호
                        </Input>
                        <p style={{ visibility: password && 'visible' }}>
                            {!match('password', password)
                                ? '올바른  형식이 아닙니다'
                                : checkPassword === false && setCheckPassword(true)}
                        </p>
                    </div>
                    <div className="form-class">
                        <Input
                            type="password"
                            name="passwordDouble"
                            placeholder="비밀번호 확인"
                            value={passwordDouble}
                            changeHandler={onChangePasswordDouble}
                            autoFocus={false}
                        >
                            새 비밀번호 확인
                        </Input>
                        <p style={{ visibility: passwordDouble && 'visible' }}>
                            {!checkPasswordDouble && '비밀번호가 일치하지 않습니다'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={checkPassword && checkPasswordDouble ? editSubmit : undefined}
                        value="edit"
                        style={{
                            opacity: checkPassword && checkPasswordDouble ? '100%' : '0%',
                        }}
                    >
                        edit
                    </button>
                    <button
                        type="button"
                        onClick={checkPassword && checkPasswordDouble ? deleteSubmit : undefined}
                        value="delete"
                        style={{
                            opacity: checkPassword && checkPasswordDouble ? '100%' : '0%',
                        }}
                    >
                        delete
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
