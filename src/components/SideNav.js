
import NavLinks from './NavLinks';
import Wrapper from '../assets/wrappers/BigSideBar'
import { useSelector } from 'react-redux';

const SideNav = () => {
  const {isSidebarOpen} = useSelector((store) => store.user)
  console.log(isSidebarOpen)
  return (
    <Wrapper>
      <div className={
          isSidebarOpen?'sidebar-container' : 'sidebar-container show-sidebar'
        }>

        <div className='content'>
          <header>
          </header>
          <NavLinks />
        </div>

      </div>
    </Wrapper>
   );
};
export default SideNav;
