import { Profile } from '@/model/auth';
import { LoadingContext } from '@/objects/loading_context';
import { getProfile, login } from '@/repositories/auth';
import { asyncSetStorage } from '@/utils/helper';
import { useContext, useState, type FC } from 'react';
import { FaCircleNotch } from 'react-icons/fa6';
import Swal from 'sweetalert2';

interface LoginProps { }

const Login: FC<LoginProps> = ({ }) => {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fcmToken, setFcmToken] = useState("");
    const [device, setDevice] = useState("web");
    return (
        <div className='relative bg-gradient-to-b from-white to-blue-300'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <img src='/images/logo-avolta.png' className='h-16 mb-8 mx-auto' />
                <div className='text-center  p-12 min-h-10 bg-white shadow-sm z-50 rounded-lg'>
                    <h3 className=' text-3xl font-bold mb-4 text-black' >Masuk</h3>
                    <p className=' text-gray-400'>Silakan masuk menggunakan akun perusahaan </p>
                    <div className='text-left  mt-4'>
                        <label htmlFor="email" className='px-2'>Email <span className='required'>*</span></label>
                        <input value={email} onChange={(el) => setEmail(el.target.value)} type="text" className='form-control' placeholder='email@company.com' />
                    </div>
                    <div className='text-left  mt-4'>
                        <label htmlFor="password" className='px-2'>Password <span className='required'>*</span></label>
                        <input value={password} onChange={(el) => setPassword(el.target.value)} type="password" className='form-control' placeholder='****************' />
                    </div>

                    <button
                        disabled={isLoading}
                        onClick={async () => {
                            try {
                                setIsLoading(true)
                                const loginRes = await login({ email, password, fcmToken, device })
                                const loginResJson = await loginRes.json()
                                await asyncSetStorage({ token: loginResJson.token, permissions: [], profile: null })

                                const profileRes = await getProfile()
                                const profileResJson = await profileRes.json()
                                const permissions = profileResJson.data.permissions as string[]
                                const profile = profileResJson.data as Profile[]
                                await asyncSetStorage({ token: loginResJson.token, permissions, profile })
                                location.href = "/"
                            } catch (error) {
                                Swal.fire(`Attention`, `${error}`, 'error')
                            } finally {
                                setIsLoading(false)
                            }


                        }
                        } className={`text-white mt-16 inline-flex items-center justify-center bg-blue-300 hover:bg-blue-700 py-2 px-8 w-full font-semibold rounded-xl ${isLoading && 'disabled:cursor-not-allowed'}`}>{isLoading && <FaCircleNotch className='animate-spin mr-2' />} Login</button>
                </div>
            </div>
        </div>
    );
}
export default Login;