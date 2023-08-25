import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import state from '../data/StateData.json';



function AdminPage() {
  const [num, changenum] = useState(0)
  const [section, changeSec] = useState('bg-gray-50 dark:bg-gray-900')
  const [mainDiv, changeMain] = useState(' shadow-black grid gap-8 shadow-sm h-auto w-full mx-auto p-8 max-w-screen-md ')
  const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
  const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    age: ''
  })
  const changeData = (e) => {
    document.getElementById('save').style.display = 'block'
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    state: "",
    password: "",
    cpassword: ""

  })
  const selectchange = (e) => {
    console.log(e.target.value)
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const change = () => {
    document.getElementById('cancel').style.display = 'block'
    document.getElementById('edit').style.display = 'none'
    document.getElementById('name').removeAttribute("disabled")
    document.getElementById('phone').removeAttribute("disabled")
    document.getElementById('email').removeAttribute("disabled")
    document.getElementById('age').removeAttribute("disabled")


  }
  const addParty = () => {
    document.getElementById('buttonDiv').style.display = 'none'
    document.getElementById('addDiv').style.display = 'grid'

  }
  const deleteParty = () => {

  }
  const save = async (e) => {
    e.preventDefault()
  }
  const cancel = async () => {
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
                    <Box sx={{ minWidth: 120,height:40 }} >
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
                  <input type='text' id='phone' name='phone' value={data.phone} onChange={changeData} className={input} disabled />

                </div>
              </div>
              <div className="grid grid-flow-row gap-8">

                <div>
                  <h1 className={title}>Party Name:</h1>
                  <input type="email" id='email' name='email' value={data.email} onChange={changeData} className={input} disabled />
                </div>
                <div className="age">
                  <h1 className={title}>Contestant Name:</h1>
                  <input type='number' id='age' name='age' value={data.age} onChange={changeData} className={input} disabled />
                </div>
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
          </div>
        </div>

      </div>
    </section>
  )
}

export default AdminPage