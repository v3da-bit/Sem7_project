import React, { useEffect, useState } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import Voting from './Voting';


function Home() {
    const [finalState,setFinalState]=useState('')
    const [userData, setUserData] = useState({
        voter: ''
    });
    const [num, changenum] = useState(0)
    const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
    const [mainDiv, changeMain] = useState('w-full  bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
    const [mainVoteDiv,changeMainvoteDiv]=useState('shadow-black grid gap-8 shadow-sm h-auto w-full mx-auto p-8 max-w-screen-md ')
    const [title, changeTitle] = useState('text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white')
    const [text, changeText] = useState('text-sm font-light text-gray-500 dark:text-gray-300')
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    const [voteDiv, changeVoteDiv] = useState('h-24 w-96 relative bg-white  rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700')
    const [mainTitle, changeMainTitle] = useState('mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white')
    const [theme, changeTheme] = useState(<WbSunnyIcon />)
    const navigate = useNavigate()
    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
    }
    const checkVoter = async () => {
        const token = Cookies.get('userData')
        const headers = { 'token': token };
        const response = await axios.get('http://localhost:3000/voter', { headers }).then((res) => {
            document.getElementById('voterId').style.display = 'none'
            document.getElementById('homeMain').style.display = 'block'
        }).catch(err => {
            document.getElementById('voterId').style.display = 'block'
            document.getElementById('homeMain').style.display = 'none'


        })
        const response2 = await axios.get('http://localhost:3000/state', { headers }).then((res) => {
            const { state, isVoted } = res.data
            if (isVoted == true) {
                document.getElementById('mainDiv').style.display = 'none'
                document.getElementById('afterVote').style.display = 'block'
            }
            setFinalState(state)


        }).catch(err => {
            console.log(err);
        })
        // window.location.reload()
    }


    useEffect(() => {
        checkVoter()

    }, [])
    const postData = async (e) => {
        e.preventDefault()
        let regex = RegExp(/^[A-Z]{3}[0-9]{7}$/);
        console.log(regex.test("XGN3002623"))
        console.log(userData.voter)

        if (regex.test(userData.voter)) {
            const token = Cookies.get('userData')
            const headers = { 'token': token };
            const response = await axios.post('http://localhost:3000/voter', userData, { headers }).then((res) => {
                setTimeout(() => {
                    toast.success('Voter Id Registered')
                }, 300)
                document.getElementById('voterId').style.display = 'none'
                document.getElementById('homeMain').style.display = 'block'
            }).catch(err => {
                console.log(err)
                setTimeout(() => {
                    toast.error('Voter Id already present or Invalid')
                }, 300)
            })
        } else {
            setTimeout(() => {
                toast.error('Invalid Voter Id')
            }, 300)
        }

    }

    return (
        <section className={section}>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">
                <div className={mainDiv} id='voterId' style={{
                    display: 'none'
                }}>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className={title}>
                            Enter Your Voter Id associated with your voting card
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="">
                            <div>
                                <input type="text" name="voter" id="voter" value={userData.voter} onChange={handleInputs} className={input} placeholder="Voter Id" required />
                            </div>
                            <button type="submit" onClick={postData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>

                        </form>
                    </div>
                </div>
                <div id='homeMain' style={{
                    display: 'block'
                }}>
                    <Voting finalState={finalState} voteDiv={voteDiv} mainDiv={mainVoteDiv} mainTitle={mainTitle} title={title} />
                    
                </div>
                <div id='themeBtn' className='flex' style={{
                    display: 'block'
                }}>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            if (num === 0) {
                                changenum(1)
                                changeTheme(<DarkModeIcon />)
                                changeSec('bg-gray-50 dark:bg-white-100')
                                changeVoteDiv('h-24 w-96 relative bg-white  rounded-lg shadow dark:border dark:bg-gray-200 dark:border-gray-300')
                                changeMain('w-full bg-dark  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-200 dark:border-gray-600')
                                changeTitle('text-lg font-bold leading-tight tracking-tight text-gray-700 md:text-lg dark:text-dark')
                                changeText('text-sm font-light text-gray-900 dark:text-gray-800')
                                changeMainTitle('mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-dark')
                                changeinp('bg-gray-50 border border-gray-700 text-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500')
                                changeMainvoteDiv('shadow-black grid gap-8 shadow-sm h-auto w-full mx-auto p-8 max-w-screen-md')
                            } else {
                                changenum(0)
                                changeTheme(<WbSunnyIcon />)
                                changeSec('bg-gray-50 dark:bg-gray-900')
                                changeVoteDiv('h-24 w-96 relative bg-white  rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700')
                                changeMainTitle('mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white')
                                changeMain('w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700')
                                changeTitle('text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white')
                                changeText('text-sm font-light text-gray-500 dark:text-gray-300')
                                changeinp('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
                                changeMainvoteDiv('shadow-black grid gap-8 shadow-sm h-auto w-full mx-auto p-8 max-w-screen-md')
                            }

                        }}>
                        {theme}
                    </button>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={states}>api</button> */}
                </div>
                
            </div>
        </section>
    )
}

export default Home