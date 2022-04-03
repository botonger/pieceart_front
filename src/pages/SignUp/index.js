import '../LogIn/index.css';
import './index.css';
import { useState } from 'react';
import { Nav, Footer, Input, ArrowLogin } from '../../components';
import userService from '../../services/user-registration.service';
import { useNavigate } from 'react-router-dom';

//회원가입
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordDouble, setPasswordDouble] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkPasswordDouble, setCheckPasswordDouble] = useState(false);
    let navigate = useNavigate();

    const onChangeEmail = e => {
        (!email || !match('email', email)) && setCheckEmail(false);
        setEmail(e.target.value);
    };
    const onChangeName = e => {
        !name && setCheckName(false);
        setName(e.target.value);
    };
    const onChangePassword = e => {
        (!password || password.length < 8 || !match('password', password)) &&
            setCheckPassword(false);
        setPassword(e.target.value);
    };
    const onChangePasswordDouble = e => {
        (!passwordDouble || password !== passwordDouble) && setCheckPasswordDouble(false);
        e.target.value === password && setCheckPasswordDouble(true);
        setPasswordDouble(e.target.value);
    };
    const match = (type, value) => {
        const regex =
            type === 'email' ? /^[\w]+@[\w.]+\.[a-zA-Z]{2,3}$/ : /[A-Za-z\d$@$!%*#?&_-]{8,}/;
        const test = value.match(regex);
        return test && test[0].length === value.length;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await userService.createUser({ email, name, password });
        if (!user.data.status) {
            alert('이미 가입된 사용자입니다.');
            window.location.reload(false);
        }
        if (user.data.status) {
            alert('Welcome!! 로그인 페이지로 이동합니다.');
            return navigate('/login');
        }
    };

    return (
        <>
            <Nav
                title="PieceART"
                ham={false}
                menu_link={{ login: <ArrowLogin /> }}
                modal_link={{}}
            />
            <main>
                <div className="login signup animation">
                    <form>
                        <div className="form-class">
                            <Input
                                type="email"
                                name="email"
                                placeholder="example.gmail.com"
                                value={email}
                                changeHandler={onChangeEmail}
                                autoFocus={true}
                            >
                                이메일
                            </Input>
                            <p style={{ visibility: email && 'visible' }}>
                                {!match('email', email)
                                    ? '올바른 형식이 아닙니다'
                                    : checkEmail === false && setCheckEmail(true)}
                            </p>
                        </div>
                        <div className="form-class">
                            <Input
                                type="text"
                                name="name"
                                placeholder="닉네임"
                                value={name}
                                changeHandler={onChangeName}
                                autoFocus={false}
                            >
                                닉네임
                            </Input>
                            <p style={{ visibility: name && 'visible' }}>
                                {checkName === false && setCheckName(true)}
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
                                비밀번호 확인
                            </Input>
                            <p style={{ visibility: passwordDouble && 'visible' }}>
                                {!checkPasswordDouble && '비밀번호가 일치하지 않습니다'}
                            </p>
                        </div>
                        <button
                            type="submit"
                            onClick={
                                checkEmail &&
                                checkName &&
                                checkPassword &&
                                checkPasswordDouble &&
                                handleSubmit
                            }
                            value="sign up"
                            style={{
                                opacity:
                                    checkEmail && checkName && checkPassword && checkPasswordDouble
                                        ? '100%'
                                        : '0%',
                            }}
                        >
                            sign up
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SignUp;
