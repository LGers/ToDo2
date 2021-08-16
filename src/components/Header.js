import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import './../index.css';
import Button from "./Button";
const Header = ({title,onAdd, showAdd}) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button
                    color={showAdd ? 'red' : 'steelblue'} text={showAdd ? 'CLose' : 'Add'}
                    onClick={onAdd}
                />
            )
            }
        </header>
    )
}
Header.defaultProps = {
    title: 'ToDoList Default'
}

Header.propTypes = {
    title: PropTypes.string
}


export default Header