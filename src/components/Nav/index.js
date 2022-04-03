import './index.css';
import { Link } from 'react-router-dom';
import { Hamburger, NavModal } from '../../components';
import { useState } from 'react';

//네비게이션 컴포넌트
const Nav = ({ title, menu_link, modal_link, ham }) => {
    const [open, setOpen] = useState(false);

    const clickBurger = () => {
        setOpen(open ? false : true);
    };
    const modal_keys = Object.keys(modal_link);
    const menu_keys = Object.keys(menu_link);
    const scrollTo = () => {
        window.scrollTo({ top: 0 });
    };
    return (
        <>
            <nav-container>
                <nav-logo>
                    <Link className="title" to="/" onClick={scrollTo}>
                        {title}
                    </Link>
                </nav-logo>
                <nav-menu>
                    {menu_keys.map((key, i) => (
                        <Link key={i} to={'/' + key}>
                            {menu_link[key]}
                        </Link>
                    ))}
                    <Hamburger ham={ham} open={open} handleClick={clickBurger}></Hamburger>
                </nav-menu>
            </nav-container>
            <NavModal open={open}>
                <div className={`modal-box ${open ? 'open' : 'close'}`}>
                    {modal_keys.map((key, i) => (
                        <div key={i}>
                            <Link to={'/' + key}>{modal_link[key]}</Link>
                        </div>
                    ))}
                </div>
            </NavModal>
        </>
    );
};

export default Nav;

Nav.defaultProps = {
    ham: true,
};
