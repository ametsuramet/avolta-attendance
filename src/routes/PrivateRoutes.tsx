import LeavePage from "@/pages/Leave"
import NotFound from "@/pages/NotFound"
import ProfilePage from "@/pages/Profile"
import ReimbursementPage from "@/pages/Reimbursement"
import { FC } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"


interface PrivateRoutesProps { }

const PrivateRoutes: FC<PrivateRoutesProps> = ({ }) => {
   
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/leave' element={<LeavePage />} />
            <Route path='/reimbursement' element={<ReimbursementPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            {/* <Route path='/cam' element={<WebcamPage />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default PrivateRoutes