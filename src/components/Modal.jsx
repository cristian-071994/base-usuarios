import React from "react";

const Modal = ({
  isShowForm,
  setIsShowForm,
  register,
  handleSubmit,
  submit,
  reset,
  setIsUserIdToEdit,
  isUserIdToEdit,
  errors,
}) => {
  /* funcion que habilita o inhabilita el modal, dependiendo del estado en el que este el modal*/
  const handleClickCloseModal = () => {
    setIsShowForm((isShowForm) => !isShowForm);
    /* reseteamos el formulario para desmontar la info del modal */
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
      image_url: "",
    });
    /* hacemos que el estado del modo editar se vuelva undefined nuevamente*/
    setIsUserIdToEdit(undefined);
  };

  return (
    /* dentro del section colocamos la condicion del estado, si es true, modal visible, si es false, modal invisible */
    <section
      className={`fixed top-0 left-0 bottom-0 right-0 bg-black/30 flex justify-center items-center transition-opacity ${
        isShowForm ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* con el register, registramos, mano a mano , uno por uno, registramos los campos para que llegue los datos de los campos del formulario para que no llegue en vacio*/}
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-4 grid gap-4 w-[300px] relative"
      >
        <h3 className="text-2xl font-bold">
          {isUserIdToEdit ? "Editar usuario" : "Nuevo usuario"}
        </h3>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="first_name">
            Nombres <span className="text-coral-red">*</span>
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="first_name"
            type="text"
            {...register("first_name", { required: true })} //los campos se registran de la misma manera como los identifica el backend, en el post, como entregamos la informacion.
          />
          {errors.first_name && <span>Este campo es obligatorio</span>}
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="last_name">
            Apellidos <span className="text-coral-red">*</span>
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="last_name"
            type="text"
            {...register("last_name", { required: true })}
          />
          {errors.last_name && <span>Este campo es obligatorio</span>}
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="email">
            Correo <span className="text-coral-red">*</span>
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo es obligatorio</span>}
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="password">
            Contraseña <span className="text-coral-red">*</span>
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Este campo es obligatorio</span>}
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="birthday">
            Cumpleaños
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="birthday"
            type="date"
            {...register("birthday")}
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="image_url">
            Url Imagen
          </label>
          <input
            className="border-[1px] rounded-sm bg-gray-100 p-1"
            id="image_url"
            type="text"
            {...register(
              "image_url",
              /* validamos si el formato de la url corresponde a una imagen */
              {
                pattern: {
                  value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|)/,
                  message: "Formato de URL de imagen no valida",
                },
              }
            )}
          />
          <span>{errors.image_url && errors.image_url.message}</span>
        </div>
        <i
          onClick={handleClickCloseModal}
          className="bx bx-x absolute top-2 right-2 text-2xl hover:text-coral-red cursor-pointer"
        ></i>
        <button className="bg-navy-blue text-white p-2 hover:bg-navy-blue/90 transition-colors text-sm">
          {isUserIdToEdit ? "Guardar cambios" : "Agregar nuevo usuario"}
        </button>
      </form>
    </section>
  );
};

export default Modal;
