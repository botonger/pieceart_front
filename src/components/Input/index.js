import './index.css';

const Input = ({
    type,
    name,
    placeholder,
    changeHandler,
    value,
    autoFocus,
    children,
    autoComplete,
}) => {
    return (
        <>
            <label htmlFor={name}>{children}</label>
            <input
                type={type}
                id={name}
                name={name}
                onChange={changeHandler}
                required
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
            ></input>
        </>
    );
};

export default Input;

Input.defaultProps = {
    autoComplete: 'off',
    autoFocus: false,
};
