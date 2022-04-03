import './index.css';

const Button = ({ clickHandler, value, type, color }) => {
    return (
        <button onClick={clickHandler} type={type} value={value} style={{ background: color }}>
            {value}
        </button>
    );
};

export default Button;

// Button.defaultProps = {
//     style: {
//         color: '#282c34',
//         backgroundColor: 'gb(184, 250, 200)',
//     },
// };
