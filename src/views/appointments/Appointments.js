import AppointmentsTable from "components/AppointmentsTable"
import { useEffect, useState } from "react"
import AppointmentService from "services/appointmentService"

function Appointments(){
    return(
        <div>
            <AppointmentsTable/>
        </div>
    )
}

export default Appointments