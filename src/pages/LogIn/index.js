import './index.css';
import { useEffect, useState } from 'react';
import { Nav, Footer, Input, UserPlus } from '../../components';
import userService from '../../services/user-registration.service';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import authService from '../../services/auth.service';

//로그인 페이지
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        (password.length < 8 || !match('password', password)) && setCheckPassword(false);
    }, [checkPassword, password]);

    useEffect(() => {
        !match('email', email) && setCheckEmail(false);
    }, [checkEmail, email]);

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };
    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const match = (type, value) => {
        const regex =
            type === 'email' ? /^[\w.]+@[\w.]+\.[a-zA-Z]{2,3}$/ : /[A-Za-z\d$@$!%*#?&_-]{8,}/;
        const test = value.match(regex);
        return test && test[0].length === value.length;
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const social = 'false';
        const response = await userService.login({ email, password, social });
        const t = response.data.token;
        if (response.data.role === 'admin') {
            authService.setSession(JSON.stringify(response.data.role));
        }
        if (t) {
            authService.setStorage(t);
            return navigate('/');
        } else {
            alert('아이디/비밀번호가 다릅니다.');
            window.location.reload(false);
        }
    };
    const responseGoogle = async response => {
        const email = response.profileObj.email;
        const password = response.tokenId.substring(0, 30);
        const social = response.tokenObj.idpId;

        const data = await userService.login({ email, password, social });
        const t = data.data.token;

        if (t) {
            authService.setStorage(t);
            return navigate('/mypage');
        }
    };
    const clickGoogle = e => {
        e.target.nextSibling.children[0].click();
    };

    return (
        <>
            <Nav
                title="PieceART"
                ham={false}
                menu_link={{ signup: <UserPlus /> }}
                modal_link={{}}
            />
            <main>
                <div className="login animation">
                    <form>
                        <div className="form-class">
                            <Input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={email}
                                changeHandler={onChangeEmail}
                                autoFocus={true}
                            >
                                이메일
                            </Input>
                            <p style={{ visibility: email && 'visible' }}>
                                {!email
                                    ? '이메일을 입력하세요'
                                    : !match('email', email)
                                    ? '올바른 형식이 아닙니다'
                                    : checkEmail === false && setCheckEmail(true)}
                            </p>
                        </div>
                        <div className="form-class">
                            <Input
                                type="password"
                                name="password"
                                placeholder="대문자,소문자,특수문자 포함 8자이상"
                                value={password}
                                changeHandler={onChangePassword}
                                autoFocus={false}
                            >
                                비밀번호
                            </Input>
                            <p style={{ visibility: password && 'visible' }}>
                                {!password
                                    ? '비밀번호를 입력하세요'
                                    : !match('password', password)
                                    ? '올바른  형식이 아닙니다'
                                    : checkPassword === false && setCheckPassword(true)}
                            </p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            value="sign in"
                            type="submit"
                            style={{ opacity: checkEmail && checkPassword ? '100%' : '0%' }}
                        >
                            sign in
                        </button>
                    </form>
                    <div className="login-google">
                        <button value="google" type="button" onClick={clickGoogle}>
                            google 아이디로 로그인하기
                        </button>
                        <div style={{ display: 'none' }}>
                            <GoogleLogin
                                className="google-button"
                                clientId={process.env.REACT_APP_GOOGLE_KEY}
                                buttonText="Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LogIn;
