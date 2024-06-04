import { NavLink } from 'react-router-dom';
const Links = () => (
    <ul>
        <li>
            <NavLink to='/'>Desayuno</NavLink>
        </li>

        <li>
            <NavLink to='/page2'>Suplementos</NavLink>
        </li>
        <li>
            <NavLink to='/firebaseLogin'>Firebase Login</NavLink>
        </li>
    </ul>
)

export default Links