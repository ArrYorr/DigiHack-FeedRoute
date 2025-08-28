import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

function MainLayout() {
  return (
    <div>
      <main>
        {/* The Outlet component renders the current page */}
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}

export default MainLayout;