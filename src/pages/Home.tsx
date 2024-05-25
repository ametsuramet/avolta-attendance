import MainLayout from '@/components/main_layout';
import MapComponent from '@/components/map';
import WebcamPage from '@/components/web_cam';
import { Attendance } from '@/model/attendance';
import { Profile } from '@/model/auth';
import { LoadingContext } from '@/objects/loading_context';
import { addAttendance, clockOutAttendance, todayAttendance } from '@/repositories/attendance';
import { getProfile } from '@/repositories/auth';
import { numberToDuration } from '@/utils/helper';
import { setError, successToast } from '@/utils/helper_ui';
import { ClockIcon } from '@heroicons/react/24/outline';
import CheckIcon from '@rsuite/icons/legacy/Check';
import moment from 'moment';
import 'moment/locale/id';
import { useContext, useEffect, useState, type FC } from 'react';
import Moment from 'react-moment';
import { Button, Modal, Timeline } from 'rsuite';
import Avatar from 'rsuite/esm/Avatar';



interface HomeProps { }

const Home: FC<HomeProps> = ({ }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date()); // State untuk menyimpan waktu saat ini


  useEffect(() => {
    getProfile()
      .then(v => v.json())
      .then(v => setProfile(v.data))

    todayAttendance()
      .then(v => v.json())
      .then(v => {
        if (v.data.id) {
          setAttendance(v.data)
        }
      })
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

  }, []);

  const renderClockOut = () => {
    if (attendance == null) return null

    if (!attendance.clock_out) return <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center mt-4'> <div className='flex justify-between w-full'>
      <div className='flex-1 flex flex-col'>


        <p className='font-bold flex '> Durasi Kerja:</p>
        <small>{numberToDuration(moment(currentTime).diff(moment(attendance.clock_in), "minutes"))}</small>

      </div>
      <Button appearance='primary' color='red' onClick={() => setShowModal(true)}>Clock Out Sekarang</Button>
    </div>
    </div>

    return <div>
      <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center mt-4'>
        <div className='flex justify-between w-full'>
          <div className='flex-1 flex flex-col'>
            <p className='font-bold flex'><ClockIcon className='w-4 mr-1 text-gray-400' /> Clock Out:</p>
            <p> <Moment format='HH:mm'>{attendance.clock_out}</Moment></p>
            <small onClick={() => {
              window.open(`https://www.google.com/maps/place/${attendance.clock_out_lat},${attendance.clock_out_lng}`)
            }}>{attendance.clock_out_notes}</small>


          </div>

          {attendance.clock_out_lat && attendance.clock_out_lng &&
            <div className='w-32 h-32 '>
              <MapComponent latitude={attendance.clock_out_lat} longitude={attendance.clock_out_lng} locationName={attendance.clock_out_notes} styles={{ borderRadius: 10 }} height={120} width={null} />
            </div>
          }

        </div>

      </div>
      <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center mt-4'>
        <div className='flex-1 flex flex-col'>


          <p className='font-bold flex '> Durasi Kerja:</p>
          <small>{numberToDuration(moment(attendance.clock_out).diff(moment(attendance.clock_in), "minutes"))}</small>

        </div>
      </div>
    </div>
  }
  const renderClockin = () => {
    if (attendance == null) return null

    return <div className='flex justify-between w-full'>
      <div className='flex-1 flex flex-col'>
        <p className='font-bold flex'><ClockIcon className='w-4 mr-1 text-gray-400' /> Clock In:</p>
        <p> <Moment format='HH:mm'>{attendance.clock_in}</Moment></p>
        <small onClick={() => {
          window.open(`https://www.google.com/maps/place/${attendance.clock_in_lat},${attendance.clock_in_lng}`)
        }}>{attendance.clock_in_notes}</small>


      </div>

      {attendance.clock_out_lat && attendance.clock_out_lng &&
        <div className='w-32 h-32 '>
          <MapComponent latitude={attendance.clock_out_lat} longitude={attendance.clock_out_lng} locationName={attendance.clock_out_notes} styles={{ borderRadius: 10 }} height={120} width={null} />
        </div>
      }
    </div>
  }

  return (<MainLayout>
    <div className='bg-white  w-full min-h-32 px-6 pb-6 pt-12 shadow-xl shadow-gray-100 rounded-b-xl flex justify-between'>
      <div>
        <h3 className='font-bold text-xl'>Selamat Datang,</h3>
        <p>{profile?.employee_name}</p>
      </div>
      <Avatar size="lg" bordered circle src={profile?.picture} alt={profile?.employee_name} />
    </div>
    <div className='p-4  w-full '>
      <div className='flex justify-center flex-col items-center mb-8 mt-8'>
        <h3 className='text-4xl font-bold text-center'>
          {moment(currentTime).format("HH:mm:ss")}
        </h3>
        <p className='text-gray-600'>{moment(currentTime).locale("id").format("dddd, DD MMMM YYYY")}</p>

      </div>

      {attendance == null &&
        <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center'>
          <div className='flex justify-between w-full items-center'>
            <p className='text-sm mr-2'>Anda belum clock in hari ini</p>
            <Button appearance='primary' color='green' onClick={() => setShowModal(true)}>Clock in</Button>
          </div>
        </div>
      }


      {attendance &&
        <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center'>
          <Timeline className="custom-timeline">

            <Timeline.Item dot={<ClockIcon className='rs-icon' />}>
              <div className='text-lg font-bold justify-between flex items-center'>
                <Moment format='HH:mm'>{attendance.clock_in}</Moment>
                <a href={attendance.clock_in_picture} target='_blank' className='flex items-center justify-center'>
                <Avatar size='sm' circle   src={attendance.clock_in_picture} /> 
                </a>
                </div>
              <p className='text-sm mb-4 hover:font-bold' onClick={() => {
                window.open(`https://www.google.com/maps/place/${attendance.clock_in_lat},${attendance.clock_in_lng}`)
              }}>{attendance.clock_in_notes}</p>
              <MapComponent latitude={attendance.clock_in_lat} longitude={attendance.clock_in_lng} locationName={attendance.clock_in_notes} styles={{ borderRadius: 10 }} height={120} width={null} />
            </Timeline.Item>

            {/* <Timeline.Item>
          <p>March 1, 11:34</p>
          <p>The package really waits for the company to pick up the goods</p>
        </Timeline.Item> */}
            {attendance && attendance.clock_out &&
              <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                <div className='text-lg font-bold justify-between flex items-center'>
                <Moment format='HH:mm'>{attendance.clock_out}</Moment>
                <a href={attendance.clock_out_picture} target='_blank' className='flex items-center justify-center'>
                <Avatar size='sm' circle   src={attendance.clock_out_picture} /> 
                </a>
                </div>
              <p className='text-sm mb-4 hover:font-bold' onClick={() => {
                window.open(`https://www.google.com/maps/place/${attendance.clock_out_lat},${attendance.clock_out_lng}`)
              }}>{attendance.clock_in_notes}</p>
                <MapComponent latitude={attendance.clock_out_lat} longitude={attendance.clock_out_lng} locationName={attendance.clock_out_notes} styles={{ borderRadius: 10 }} height={120} width={null} />
              </Timeline.Item>
            }
          </Timeline>
        </div>


      }
      {attendance &&
        <div className='p-4 bg-white rounded-xl shadow-xl shadow-gray-200 flex justify-between items-center mt-4'>
          <div className='flex-1 flex flex-col'>


            <p className='font-bold flex '> Durasi Kerja:</p>
            <small>{numberToDuration(moment(attendance.clock_out ?? currentTime).diff(moment(attendance.clock_in), "minutes"))}</small>

          </div>
          {!attendance.clock_out &&
            <Button appearance='primary' color='red' onClick={() => setShowModal(true)}>Clock Out Sekarang</Button>
          }
        </div>
      }


    </div>
    <Modal classPrefix='cam' size={"full"} open={showModal} onClose={() => {
      setShowModal(false)
    }}>

      <Modal.Body className=''>
        {showModal &&
          <WebcamPage onCapture={async (val) => {
            try {
              setIsLoading(true)
              if (attendance != null) {
                await clockOutAttendance(attendance.id!, {
                  clock_out: moment().toISOString(),
                  clock_out_lat: val.latitude,
                  clock_out_lng: val.longitude,
                  clock_out_picture: val.path,
                  clock_in: attendance.clock_in,
                })
              } else {
                await addAttendance({
                  clock_in: moment().toISOString(),
                  clock_in_lat: val.latitude,
                  clock_in_lng: val.longitude,
                  clock_in_picture: val.path,
                })
              }

              setShowModal(false)
              successToast("Data absensi telah dikirim")
              todayAttendance()
                .then(v => v.json())
                .then(v => {
                  if (v.data.id) {
                    setAttendance(v.data)
                  } else {
                    setAttendance(null)
                  }
                })
            } catch (error) {
              setError(`${error}`)
            } finally {
              setIsLoading(false)

            }



          }} onClose={() => setShowModal(false)} />
        }
      </Modal.Body>

    </Modal>
  </MainLayout>);
}
export default Home;