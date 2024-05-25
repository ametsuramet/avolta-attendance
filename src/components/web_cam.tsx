import { WebcamOutput } from '@/objects/webcam';
import { b64toBlob, customFetch } from '@/utils/helper';
import { setError } from '@/utils/helper_ui';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    facingMode: "user"
};

interface WebcamPageProps {
    onCapture: (s: WebcamOutput) => void
    onClose: () => void
}

const WebcamPage: FC<WebcamPageProps> = ({
    onCapture,
    onClose
}) => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const webcamRef = useRef<Webcam>(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position);
                },
                (error) => {
                    setError('Lokasi tidak dapat diakses');
                }
            );
        } else {
            setError('Geolocation tidak didukung oleh browser Anda, data geolocation diperlukan untuk mengetahui posisi anda ketika melakukan absen');
        }
    }, []);

    const capture = useCallback(
        () => {
            // let ref = webcamRef as RefObject<Webcam>
            const imageSrc = webcamRef?.current?.getScreenshot()
            // console.log(imageSrc)
            if (imageSrc) {
                const blob = b64toBlob(imageSrc.split("data:image/jpeg;base64,")[1], "image/jpg");
                // const blobUrl = URL.createObjectURL(blob);
                const formData = new FormData();

                formData.append("file", blob);
                formData.append("flipped", "1");
                // window.open(blobUrl)
                customFetch(`user/upload`, {
                    method: "POST",
                    body: formData
                }, true)
                    .then(v => v.json())
                    .then(v => {
                        onCapture({
                            path: v.data.path,
                            latitude: location?.coords.latitude,
                            longitude: location?.coords.longitude
                        })

                    })

            }

        },
        [webcamRef, location]
    );

    return (
        <div>
            <div style={{ width: "100vw", height: "100vh", position: 'relative' }}>

                <Webcam
                    ref={webcamRef}
                    forceScreenshotSourceSize
                    mirrored={true}
                    videoConstraints={videoConstraints}
                    screenshotFormat="image/jpeg"
                    style={{
                        position: "absolute",
                        textAlign: "center",
                        right: 0,
                        height: "100vh",
                        width: "100%",
                        objectFit: "cover",
                    }}
                >

                </Webcam>
            </div>

            <div className='absolute  z-50  bg-transparent bottom-20 rounded-lg p-4 left-5 right-5 flex justify-center'>

                <div className='p-4 rounded-full bg-purple-700' onClick={() => {
                    capture()
                }}>

                    <CameraIcon className='w-16 text-white cursor-pointer' />
                </div>

            </div>
            <div className='absolute top-1 left-1 z-50 p-2 rounded-full bg-black bg-opacity-80'>
                <XMarkIcon className=' w-6 text-white' onClick={() => {
                    const ref = webcamRef as RefObject<Webcam>
                    ref.current?.stream?.getTracks()
                        .forEach((track) => {
                            // console.log(track)
                        });
                    onClose()
                }} />

            </div>
        </div>
    );
}
export default WebcamPage;
