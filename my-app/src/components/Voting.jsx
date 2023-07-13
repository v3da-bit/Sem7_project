import React, { useEffect, useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { ToastContainer, toast } from 'react-toastify';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import image from './images/bjp.png'
import { Button } from '@mui/material';
import { state } from '../data/State';
import axios from 'axios';
import Cookies from 'js-cookie';
import bjp from './images/bjp.png'
import cong from './images/congress.png'
import aap from './images/51YCqhDhqIS.jpg'
import ysrcp from './images/ysrcp.png'
import tdp from './images/TDP-3.jpg'
import cpm from './images/CPIM-Flag-Image.jpg'
import { useNavigate } from 'react-router-dom';



function Voting({voteDiv,mainDiv,mainTitle,title,finalState}) {
    const navigate=useNavigate()
    const [party, setParty] = useState({
        partyName: '',
        Id: ''
    })
    const [parties,setParties]=useState([])
    const getState = async () => {
        const token = Cookies.get('userData')
        const headers = { 'token': token };
        const response = await axios.get('http://localhost:3000/state', { headers }).then((res) => {
            const {state,isVoted}=res.data
            if(isVoted==true){
                document.getElementById('mainDiv').style.display = 'none'
                document.getElementById('afterVote').style.display = 'block'
            }
            localStorage.setItem('state',state)
            
            
        })
    }
    useEffect(()=>{
        getState()
    },[])

    useEffect(()=>{
        if (finalState) {
            state.forEach((value) => {
                if (value.state === finalState) {
                    setParties(value.parties)
                }
            })
           
        }
    },[finalState])
    
    console.log(parties)
    const save = async (e) => {
        e.preventDefault()
        const token = Cookies.get('userData')
        const headers = { 'token': token };
        const response = await axios.post('http://localhost:3000/voted', party, { headers }).then(() => {
            document.getElementById('mainDiv').style.display = 'none'
            document.getElementById('afterVote').style.display = 'block'
            setTimeout(() => {
                toast.success("Your Vote has been Submitted");
            }, 200);
            
        }).catch(()=>{
            setTimeout(() => {
                toast.error("There is some Problem from our side!");
            }, 200);
    
        })
    }
    const cancel = () => {
        window.location.reload()
    }
    const Checked = (e) => {
        // console.log(e.target.value,e.target.id)
        setParty({ Id: e.target.id, partyName: e.target.value })
        document.getElementById('save').style.display = 'block'
        document.getElementById('cancel').style.display = 'block'
    }
    return (

        <div className="">
            <ToastContainer />
            <h1 className={mainTitle}>{finalState} Election</h1>
            <div id='mainDiv' className={mainDiv}>

                {parties?.map(value => {
                    console.log(value.image);
                    return (<div key={value.id} className={voteDiv} onClick={() => {
                        console.log('hi')
                        // document.getElementById(value.id).setAttribute('checked', "true")
                    }}>
                        <div className='grid grid-flow-col'>
                            <div className='flex items-center justify-center'>
                                <input id={value.id} onChange={Checked} type="radio" name="parties" value={value.name} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <div className=' grid grid-flow-row'>
                                    <h1 className={title}>{value.name}</h1>
                                    <h1 className={title}>{value.contestant}</h1>
                                </div>
                            </div>
                            {(() => {
                                if (value.id === 1) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={bjp} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                } else if (value.id === 2) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={cong} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                } else if (value.id === 3) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={aap} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                } else if (value.id === 4) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={ysrcp} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                }
                                else if (value.id === 5) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={tdp} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                }
                                else if (value.id === 6) {
                                    return <div className='flex items-center justify-end'>
                                        <img src={cpm} alt="" className='h-24 w-28 rounded-lg' />
                                    </div>
                                }
                            })()}

                        </div>
                    </div>)
                })}

                <div className='flex justify-end'>
                    <div className='grid gap-4 grid-flow-col'>
                        <Button variant="outlined" color="success" id='save' onClick={save} style={{
                            display: 'none'
                        }}>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" id='cancel' onClick={cancel} style={{
                            display: 'none'
                        }}>
                            Cancel
                        </Button>
                    </div>
                </div>

            </div>
            <div id='afterVote' className={mainTitle} style={{
                display:"none"
            }}>
                <h1>Your vote has been Submitted</h1>
                <h1>Thanks for Voting</h1>
                <h1>Check out the Results at <a href="" onClick={()=>{
                    navigate('/dashboard')
                }} style={{
                    color:'blue',
                }}><u>DashBoard</u></a></h1>
                </div>
                
        </div>

    )
}

export default Voting