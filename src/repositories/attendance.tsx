import { AttendanceReq } from "@/model/attendance"
import { customFetch } from "@/utils/helper"


export const addAttendance = async (req: AttendanceReq) => {
    return await customFetch(`user/attendance`, {
        method: "POST",
        body: JSON.stringify(req)
    })
}
export const clockOutAttendance = async (id:string, req: AttendanceReq) => {
    return await customFetch(`user/attendance/clockout/${id}`, {
        method: "PUT",
        body: JSON.stringify(req)
    })
}
export const todayAttendance = async () => {
    return await customFetch(`user/attendance/today`)
}