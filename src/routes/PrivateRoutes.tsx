import { FC, useEffect, useState } from "react"
import { Route, Routes, useParams } from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "@/pages/NotFound"
import LeavePage from "@/pages/Leave"
import ReimbursementPage from "@/pages/Reimbursement"
import ProfilePage from "@/pages/Profile"
import WebcamPage from "@/components/web_cam"


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