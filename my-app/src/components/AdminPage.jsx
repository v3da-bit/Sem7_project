import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
// import state from '../data/StateData.json';
import axios from 'axios';
import Cookies from 'js-cookie';



function AdminPage() {
  const [state, setState] = useState([]);
  const [num, changenum] = useState(0)
  const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
  const [mainDiv, changeMain] = useState(' shadow-black grid gap-8 shadow-sm h-auto w-full mx-auto p-8 max-w-screen-md ')
  const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
  const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
  const [user, setUser] = useState({
    state: "",
    partyName: "",
    Id: "",
    contestantName: "",


  })
  const [user2, setUser2] = useState({
    state: "",
    partyName: "",


  })
  const [partyList, setPartyList] = useState([])
  const changeData = (e) => {
    document.getElementById('save').style.display = 'block'
    document.getElementById('cancel').style.display = 'block'
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }
  useEffect(() => {
    getAllState()
  },[])
  const getAllState = async () => {
    const token = Cookies.get('userData')
    const headers = { 'token': token };
    console.log("headers..", headers);
    const response = await axios.get('http://localhost:3000/allState', { headers }).then((res) => {
      console.log("res.data.state...", res.data.state);
      setState(res.data.state);
    })
  }
  useEffect(() => {
    if (user2.state) {
      let party = []
      state.forEach(value => {
        if (value.id === user2.state) {
          party = value.parties

        }
      })
      setPartyList(party)
    }
  }, [user2.state])
  if (user2.state != "" && user2.partyName != "") {
    document.getElementById("save2").style.display = "flex"
    document.getElementById("cancel2").style.display = "flex"
  }

  const selectchange = (e) => {
    
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const selectchange2 = (e) => {
    console.log(e.target.value, "hello world2")

    const name = e.target.name
    const value = e.target.value

    setUser2({ ...user2, [name]: value })
  }
  const save2 = async (e) => {
    e.preventDefault()
    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.post('http://localhost:3000/deleteParty', user2, { headers }).then(res => {
      setTimeout(() => {
        toast.success("successfully deleted party");
      }, 200);
      document.getElementById('save2').style.display = 'none'
      document.getElementById('cancel2').style.display = 'none'
      document.getElementById('buttonDiv').style.display = 'flex'
      document.getElementById('deleteDiv').style.display = 'none'
      setUser2({
        state: "",
        partyName: ""
      })
      window.location.reload();
    }).catch(err => {
      setTimeout(() => {
        toast.error("Some Error Occurred");
      }, 200);
    })
  }
  const cancel2 = () => {
    setUser2({
      state: "",
      partyName: ""
    })
    document.getElementById('save2').style.display = 'none'
    document.getElementById('cancel2').style.display = 'none'
    document.getElementById('buttonDiv').style.display = 'flex'
    document.getElementById('deleteDiv').style.display = 'none'
  }
  const change = () => {
    document.getElementById('cancel').style.display = 'block'
    document.getElementById('edit').style.display = 'none'
    document.getElementById('name').removeAttribute("")
    document.getElementById('phone').removeAttribute("")
    document.getElementById('email').removeAttribute("")
    document.getElementById('age').removeAttribute("")


  }
  const addParty = () => {
    document.getElementById('buttonDiv').style.display = 'none'
    document.getElementById('addDiv').style.display = 'grid'

  }
  const deleteParty = () => {
    document.getElementById('buttonDiv').style.display = 'none'
    document.getElementById('deleteDiv').style.display = 'grid'
  }
  const save = async (e) => {
    e.preventDefault()
    console.log(user.state)
    const token = Cookies.get('userData')
    console.log(token);
    const headers = { 'token': token };
    const response = await axios.post('http://localhost:3000/addParty', user, { headers }).then(res => {
      setTimeout(() => {
        toast.success("successfully Added Party");
      }, 200);
      document.getElementById('save').style.display = 'none'
      document.getElementById('cancel').style.display = 'none'
      document.getElementById('buttonDiv').style.display = 'flex'
      document.getElementById('addDiv').style.display = 'none'
      window.location.reload();
      setUser({
        state: "",
        partyName: "",
        Id: "",
        contestantName: "",
      })
    }).catch(err => {
      setTimeout(() => {
        toast.error("Some Error Occurred");
      }, 200);
    })
  }
  const cancel = async () => {
    setUser({
      state: "",
      partyName: "",
      Id: "",
      contestantName: "",
    })
    document.getElementById('save').style.display = 'none'
    document.getElementById('cancel').style.display = 'none'
    document.getElementById('buttonDiv').style.display = 'flex'
    document.getElementById('addDiv').style.display = 'none'
  }

  return (
    <section className={section}>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen max-sm:px-0,py-0 lg:py-0">

        <div className={mainDiv}>
          <div className="grid grid-flow-row gap-8">
            <h1 className='mb-8 lg:mb-16 font-light text-center text-gray-100 dark:text-white sm:text-xl'>Select The Option Whether you want to add or delete the party then select the state whose party you want to Add/Delete</h1>
            <div className="content grid grid-flow-col gap-6" id='addDiv' style={{
              display: 'none'
            }}>
              <div className="grid grid-flow-row gap-8" >
                <div className="name">
                  <h1 className={title}>State:</h1>
                  <div>
                    <Box sx={{ minWidth: 120, height: 40 }} >
                      <FormControl fullWidth className={input}>
                        <InputLabel id="demo-simple-select-label" className={title}>State or UT</InputLabel>
                        <Select
                          value={user.state}
                          onChange={selectchange}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name='state'
                          label="state"

                        >
                          {state.map(value => {
                            return <MenuItem key={value.id} value={value.state} >{value.state}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>

                <div className="phone">
                  <h1 className={title}>Party Id:</h1>
                  <input type='number' id='id' name='Id' value={user.Id} onChange={changeData} className={input} />

                </div>
              </div>
              <div className="grid grid-flow-row gap-8">

                <div>
                  <h1 className={title}>Party Name:</h1>
                  <input type="text" id='partyName' name='partyName' value={user.partyName} onChange={changeData} className={input} />
                </div>
                <div className="age">
                  <h1 className={title}>Contestant Name:</h1>
                  <input type='text' id='contestantName' name='contestantName' value={user.contestantName} onChange={changeData} className={input} />
                </div>
              </div>


            </div>
            <div className='flex justify-end items-end'>
              <div className='grid gap-4 grid-flow-col' id='actionBtn'>
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
            <div className="content grid grid-flow-col gap-6" id='deleteDiv' style={{
              display: 'none'
            }}>
              {/*=======delete part=======*/}
              <div className="grid grid-flow-col gap-8" >
                <div className="name">
                  <h1 className={title}>State:</h1>
                  <div>
                    <Box sx={{ minWidth: 120, height: 40 }} >
                      <FormControl fullWidth className={input}>
                        <InputLabel id="demo-simple-select-label" className={title}>State or UT</InputLabel>
                        <Select
                          value={user2.state}
                          onChange={selectchange2}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name='state'
                          label="state"

                        >
                          {state.map(value => {

                            return <MenuItem key={value.id} value={value.id} >{value.state}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <div className="name">
                  <h1 className={title}>Party:</h1>
                  <div>
                    <Box sx={{ minWidth: 120, height: 40 }} >
                      <FormControl fullWidth className={input}>
                        <InputLabel id="demo-simple-select-label" className={title}>Parties</InputLabel>
                        <Select
                          value={user2.partyName}
                          onChange={selectchange2}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name='partyName'
                          label="parties"

                        >
                          {
                            partyList.map(value => {
                              return <MenuItem key={value.id} value={value.name}>{value.name}</MenuItem>
                            })

                          }


                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>

              </div>

            </div>
            <div className='flex justify-end items-end'>
              <div className='grid gap-4 grid-flow-col' id='actionBtn'>
                <Button variant="outlined" color="success" id='save2' onClick={save2} style={{
                  display: 'none'
                }}>
                  Save
                </Button>
                <Button variant="outlined" color="error" id='cancel2' onClick={cancel2} style={{
                  display: 'none'
                }}>
                  Cancel
                </Button>
              </div>
            </div>
            <div id='buttonDiv' className='flex flex-row justify-center gap-4'>
              <div>
                <Button variant="outlined" color='success' onClick={addParty}>Add Party</Button>
              </div>
              <div>
                <Button variant="outlined" color='error' onClick={deleteParty}>Delete Party</Button>
              </div>
            </div>


          </div>
        </div>

      </div>
    </section>
  )
}

export default AdminPage