import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import baseUrl from "../../hooks/baseUrl";
import { useLocation } from "react-router-dom";
import DashboardTemplate from "../../components/Forms/Dashboard/DashboardTemplate";

function Dashboard() {
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);
    const [payload, setPayload] = useState({
        email: "",
        firstName: "",
        lastName: "",
        DOB: "",
        profilePhoto: ""
    });
    const location = useLocation();
    const id = location.state.stateId;

    useEffect(() => {
        try{
            async function fetchData() {
                const res = await axios({
                    method: "GET",
                    url: `${baseUrl}/user/${id}`
                });
        
                const update = {
                    email: res.data.user.email,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    DOB: res.data.user.DOB,
                    profilePhoto: res.data.user.profilePhoto
                };
                setPayload(payload => ({
                    ...payload,
                    ...update
                }));
                setLoad(false);
                setStatus(res.data.message)
            }

            fetchData();
        }catch(error){
            setLoad(false);
            setStatus(error.response.data.error);
        }
    },[id])

    return (
        <div id="Dashboard">
            <div className="controls">

                <h2>{payload.firstName} {payload.lastName}</h2>
                <img src={payload.profilePhoto} alt={`${payload.firstName} ${payload.lastName}`} />
                <div className="button-group">
                    <Link to="/artist"><button className="btn btn-secondary">Back</button></Link>
                </div>

                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}

                <div className="dashboardInformation">
                    <p>{payload.DOB}</p>

                    <DashboardTemplate payload={payload}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;