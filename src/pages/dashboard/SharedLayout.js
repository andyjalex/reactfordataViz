import { Outlet } from "react-router-dom";
import {SideNav, Navbar } from '../../components';
import Wrapper from '../../assets/wrappers/SharedLayout';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SideNav />
        <div>
          <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
        </div>

      </main>
    </Wrapper>
  )
};
export default SharedLayout;
