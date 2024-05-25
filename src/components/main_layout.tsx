import { useContext, type FC, type ReactNode } from 'react';
import { HomeIcon, ReceiptRefundIcon, UserCircleIcon, WalletIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { LoadingContext } from '@/objects/loading_context';
import Loading from './loading';


interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  let { isLoading, setIsLoading } = useContext(LoadingContext);
  let location = useLocation();
  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center pb-12">
        {children}
      </div>
      <nav className="bg-white shadow fixed bottom-0 w-full max-w-md mx-auto nav">
        <div className="flex justify-around">

          <Link
            to="/"
            className={`flex flex-col items-center py-2 ${location.pathname == '/' ? ' text-purple-700' : 'text-gray-600'} hover:text-gray-900`}
          >
            <HomeIcon className='w-6' />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/leave"
            className={`flex flex-col items-center py-2 ${location.pathname == '/leave' ? ' text-purple-700' : 'text-gray-600'} hover:text-gray-900`}
          >
            <ReceiptRefundIcon className='w-6' />
            <span className="text-xs">Leave</span>
          </Link>

          <Link
            to="/reimbursement"
            className={`flex flex-col items-center py-2 ${location.pathname == '/reimbursement' ? ' text-purple-700' : 'text-gray-600'} hover:text-gray-900`}
          >
            <WalletIcon className='w-6' />
            <span className="text-xs">Reimburse</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center py-2 ${location.pathname == '/profile' ? ' text-purple-700' : 'text-gray-600'} hover:text-gray-900`}
          >
            <UserCircleIcon className='w-6' />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
      {isLoading && <Loading />}
    </>
  );
}
export default MainLayout;