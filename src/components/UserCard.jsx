import React from "react";

const UserCard = ({ user, deleteUser, handleClickEdit }) => {
  return (
    <article className="border-[3px] border-[#E5E5E5] grid gap-3 p-2 rounded-md">
      <div>
        <img
          className="w-[100px] aspect-[3/5] object-cover mx-auto rounded-md border-[1px] border-navy-blue"
          src={user.image_url ? user.image_url : "/images/non-profile.png"}
          alt="User image"
        />
      </div>
      <h3 className="text-2xl font-semibold grid justify-center items-center text-center">
        <div>{user.first_name}</div>
        <div>{user.last_name}</div>
      </h3>
      <hr className="border-navy-blue/30"/>
      <ul className=" grid px-2 gap-2">
        <li>
          <h4 className="text-[#D3D3D3]">Correo</h4>
          <span>{user.email}</span>
        </li>
        <li>
          <h4 className="text-[#D3D3D3]">Cumpleaños</h4>
          <span className="flex items-center gap-2">
            <i className="bx bxs-gift"></i>
            {user.birthday}
          </span>
        </li>
      </ul>
      <hr className="border-navy-blue/30"/>
      <div className="flex justify-end p-1 gap-2 text-xl">
        <button className="border-[1px] p-2 rounded-md bg-coral-red border-[#D93F3F] text-white hover:bg-coral-red/80" onClick={() => deleteUser(user.id)}>
          <i className="bx bxs-trash"></i>
        </button>
        <button className="border-[1px] p-2 rounded-md bg-[#F6F6F6] border-[#BDBDBD] text-[#D3D3D3] hover:bg-[#F6F6F6]/10" onClick={() => handleClickEdit(user)}>
          <i className="bx bxs-pencil"></i>
        </button>
      </div>
    </article>
  );
};

export default UserCard;
