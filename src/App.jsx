import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUsers, deleteUsers, fetchUsers } from './redux/features/userSlice.js/userSlice'

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("")
  const [id, setId] = useState("")



  const dispatch = useDispatch()

  const { users } = useSelector(state => state.users)



  useEffect(() => {
    dispatch(fetchUsers())
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault()

    const initialState = {
      name,
      email,
      age,


    }
    dispatch(createUsers(initialState))
  }

  const handleDelete = (id) => {
    dispatch(deleteUsers(id))

  }


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        users
      </h1>
      <div className='grid grid-cols-4 gap-7'>
        {
          users.map(({ id, name, email, age }) => (
            <div key={id} className='border'>
              <h3>{name}</h3>
              <p>{email}</p>
              <p>{age}</p>
              <button onClick={() => handleDelete(id)} className='bg-red-500 p-3'>eliminar</button>
            </div>

          ))
        }
      </div>
      <hr />

      <div className='flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit} className=' flex flex-col border w-80 p-4 gap-7'>
          <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" placeholder='name' />
          <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" placeholder='email' />
          <input onChange={(e) => setAge(e.target.value)} className='border p-3' type=" text" placeholder='age' />
          <button className='bg-lime-500 p-3' type='submit'>Crear</button>



        </form>

      </div>


    </div>
  )
}

export default App