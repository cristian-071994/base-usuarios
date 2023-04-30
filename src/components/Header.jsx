import React from "react";

const Header = ({ setIsShowForm }) => {
    
  /* funcion que habilita o inhabilita el modal, dependiendo del estado en el que este el modal*/
  const handleClickShowModal = () => {
    setIsShowForm((isShowForm) => !isShowForm);
  };
  return (
    <header className="flex justify-between px-2 sm:px-6 py-8">
      <h1 className="font-bold text-2xl sm:text-4xl">Usuarios</h1>
      <button
        onClick={handleClickShowModal}
        className="bg-navy-blue text-white p-2 hover:bg-navy-blue/90 transition-colors text-sm flex items-center gap-1 px-4"
      >
        {" "}
        <i className="bx bx-plus"></i> Crear nuevo usuario
      </button>
    </header>
  );
};

export default Header;
