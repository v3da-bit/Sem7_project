import React, { useState } from 'react'

function AddParty() {
    const [title, changeTitle] = useState('text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white')
    const [text, changeText] = useState('text-sm font-light text-gray-500 dark:text-gray-300')
    const [input, changeinp] = useState('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    
  return (
<div className="grid grid-flow-row gap-8">
              <div className='flex justify-center'>
                <h1 className={title}>Select State To add or delete party</h1>
              </div>
              <div className='flex justify-around'>
  
                <Button variant="outlined" id='edit' onClick={change} >Edit</Button>
              </div>
              <div className="content grid grid-flow-col gap-6">
                <div className="grid grid-flow-row gap-8">
                  <div className="name">
                    <h1 className={title}>Name:</h1>
                    <input type='text' name='name' id='name' value={data.name} onChange={changeData} className={input} disabled />
                  </div>
                  <div className="phone">
                    <h1 className={title}>Phone No.:</h1>
                    <input type='text' id='phone' name='phone' value={data.phone} onChange={changeData} className={input} disabled />
                  </div>
                </div>
                <div className="grid grid-flow-row gap-8">
  
                  <div>
                    <h1 className={title}>Email:</h1>
                    <input type="email" id='email' name='email' value={data.email} onChange={changeData} className={input} disabled />
                  </div>
                  <div className="age">
                    <h1 className={title}>Age:</h1>
                    <input type='number' id='age' name='age' value={data.age} onChange={changeData} className={input} disabled />
                  </div>
                </div>
  
  
  
  
              </div>
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
  
  )
}

export default AddParty