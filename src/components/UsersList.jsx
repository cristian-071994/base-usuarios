import React from 'react'
import UserCard from './UserCard'

const UsersList = ({users, deleteUser, handleClickEdit}) => {
  return (
    <section className='grid gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_250px)] justify-center py-8'>
       {
        users.map((user) => <UserCard key={user.id} user={user} deleteUser={deleteUser} handleClickEdit={handleClickEdit}/>)//pasamos a la card, la prop user que dentro tiene la informacion del usuario
       } 
    </section>
  )
}

export default UsersList