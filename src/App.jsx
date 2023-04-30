import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import { useForm } from "react-hook-form";
import UsersList from "./components/UsersList";
import Swal from "sweetalert2";

const BASE_URL = "https://users-crud.academlo.tech";
const DEFAULT_VALUES = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  birthday: "",
  image_url: "",
};

function App() {
  /* estado que contiene el arreglo de usuarios que se han creado */
  const [users, setUsers] = useState([]);

  /* estado que maneja las posibilidades de si el formulario o modal esta en modo editar o en modo crear */
  const [isUserIdToEdit, setIsUserIdToEdit] = useState();

  /* estado que maneja el comportamiento del Modal, si es o no visible */
  const [isShowForm, setIsShowForm] = useState(false); // el estado inicia en false para que cuando cargue la aplicacion el Modal no sea visible.

  /* creamos la instancia que enlaza el formulario con la libreria react-hook-form aqui en app ya que aqui vamos a usar las funciones de la aplicacion y necesitaremos reset, errores etc*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); //pasamos los elementos a donde los vamos a usar, al form, que esta en el componente Modal

  /* funcion con la que vamos a recibir todos los datos de los campos que tengamos registrados capturamos los datos en la propiedad data */
  const submit = (data) => {
    /* validacion para enviar null en caso de que estos campos no sean diligenciados*/
    if (!data.birthday) {
      data.birthday = null;
    }

    if (!data.image_url) {
      data.image_url = null;
    }

    /* verificamos si estamos editando o creando usuarios, para asi decidir cual de las dos funciones se va a ejecutar */
    if (isUserIdToEdit) {
      editUser(data);
    } else {
      createUser(data); //le pasamos la data a la funcion para crear el usuario.
    }
  };

  /* funcion que nos permite hacer el post del usuario, la creacion de un usuario */
  const createUser = (data) => {
    const URL = BASE_URL + "/users/";

    axios
      .post(URL, data) //la data viene como parametro, quien use esta funcion debe pasarnos esa informacion que se va a enviar en la peticion, en prop de la funcion.
      .then(() => {
        /* alerta de confirmacion de creacion de usuario */
        Swal.fire({
          title: "Felicitaciones",
          text: `Se creo el usuario ${data.first_name} ${data.last_name} exitosamente`,
          icon: "success",
          backdrop: true,
          timer: 4000,
        });
        getAllUsers();
        reset(DEFAULT_VALUES);
        setIsShowForm(!isShowForm);
      }) //cuando ya estamos seguros que se creo el nuevo usuario, volvemos a llamar a todos los usuarios, limpiamos el formulario y lo cerramos.
      .catch((err) => console.log(err));
  };

  /* funcion que elimina el usuario, quien ejecute la funcion debe pasar el id por parametro, para colocarlo al final de la url como lo pide el backend */
  const deleteUser = (id) => {
    /* alerta de confirmacion de eliminacion de usuario */
    Swal.fire({
      title: "Eliminar usuario",
      text: `¿Estas seguro que quieres eliminar el usuario?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        /* si se confirma eliminar, ejecutamos el metodo delete y enviamos alerta de eliminacion exitosa */
        const URL = BASE_URL + `/users/${id}/`;

        axios
          .delete(URL)
          .then(() => {
            Swal.fire(
              "Eliminado!",
              "El usuario se elimino exitosamente!",
              "success"              
            );
            getAllUsers();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  /* funcion que nos edita la informacion del usuario  */
  const editUser = (data) => {
    /* alerta de confirmacion de editar usuario */
    Swal.fire({
      title: "Editar usuario",
      text: "¿Estas seguro que quieres editar los datos del usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ACEPTAR",
      cancelButtonText: "CANCELAR",
    }).then((result) => {
      if (result.isConfirmed) {
        const URL = BASE_URL + `/users/${isUserIdToEdit}/`; //en este estado estamos almacenando el id del usuario al que le queremos editar la informacion.
        axios
          .patch(URL, data) //actualizamos los datos, le pasamos la url al metodo patch y le pasamos la data que vamos a editar que viene por parametro en la funcion
          .then(() => {
            Swal.fire(
              "Editado",
              "El usuario ha sido editado exitosamente!",
              "success"
            );
            getAllUsers(); //obtenemos los usuarios nuevamente
            reset(DEFAULT_VALUES); //reseteamos el formulario
            setIsShowForm(!isShowForm); //cerramos el formulario
            setIsUserIdToEdit(); // cerramos el modo editar cambiando el estado que lo controla
          })
          .catch((err) => console.log(err));
      }
    });
  };

  /* funcion que obtiene todos los usuarios que estan cargados en la api */
  const getAllUsers = () => {
    const URL = BASE_URL + "/users/";

    axios
      .get(URL)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  /* funcion que sirve para editar la informacion de la card, cuando se requiera ejecutar esta funcion, se debe pasar la data del usuario a editar por prop */
  const handleClickEdit = (data) => {
    /* abrimos el Modal */
    setIsShowForm((isShowForm) => !isShowForm);
    /* montamos los datos del usuario que selecionamos a editar en el modal */
    reset(data);
    /* hacemos que el estado que maneaja si el fomrulario esta o no en modo editar almacene el id del usuario */
    setIsUserIdToEdit(data.id);
  };

  /* efecto que renderiza una sola vez al cargar la app y que ejecuta la funcion getAllUsers para obtener todos los usuarios que estan cargados en la api */
  useEffect(() => {
    getAllUsers();
  }, []);

  /* parte de codigo que pinta los componentes de la app */
  return (
    <main className="font-sans bg-gray-100">
      <Header setIsShowForm={setIsShowForm} />{" "}
      {/* pasamos el setIsShowForm al header para que el boton del header pueda cambiar el estado que muestra o oculta el modal */}
      <Modal
        isShowForm={isShowForm}
        setIsShowForm={setIsShowForm}
        register={register}
        handleSubmit={handleSubmit}
        submit={submit}
        reset={reset}
        setIsUserIdToEdit={setIsUserIdToEdit}
        isUserIdToEdit={isUserIdToEdit}
        errors={errors}
      />
      <UsersList
        users={users}
        deleteUser={deleteUser}
        handleClickEdit={handleClickEdit}
      />
      {/* pasamos el estado users que es el que contiene los usuarios. */}
    </main>
  );
}

export default App;
