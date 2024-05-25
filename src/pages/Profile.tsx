import MainLayout from '@/components/main_layout';
import { clearStorage } from '@/utils/helper';
import type { FC } from 'react';
import { Button } from 'rsuite';

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
        return (<MainLayout>
        <div className='flex h-screen bg-white flex-col justify-center items-center w-full' >
            <Button className='w-60' onClick={() => {
                clearStorage()
                location.href = "/login"
            }}>Logout</Button>
        </div>
        </MainLayout>);
}
export default ProfilePage;