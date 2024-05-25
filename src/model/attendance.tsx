export interface Attendance {
    id: string
    clock_in: string
    clock_out: string
    clock_in_notes: string
    clock_out_notes: string
    clock_in_picture: string
    clock_out_picture: string
    clock_in_lat: number
    clock_in_lng: number
    clock_out_lat: number
    clock_out_lng: number
    employee_id: string
    employee_name: string
    employee_job_title: string
    employee_picture: string
    employee_identity_number: string
    overtime: string
    working_duration: string
  }
  
export interface AttendanceReq {
    clock_in: string
    clock_out?: string | null
    clock_in_notes?: string | null
    clock_out_notes?: string | null
    clock_in_lat?: number | null
    clock_in_lng?: number | null
    clock_out_lat?: number | null
    clock_out_lng?: number | null
    clock_in_picture?: string | null
    clock_out_picture?: string | null
}