import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const User = () => {
  const userLS = JSON.parse(localStorage.getItem("user")) || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsUser(true);
      setIsEditing(false);
    } else {
      setIsUser(false);
      setIsEditing(false);
    }
  }, []);

  const onSubmit = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsEditing(false);
    setIsUser(true);
    reset();
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Está seguro que desea cerrar sesión?",
      text: "Tendrá que iniciar sesión nuevamente para acceder a su cuenta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FEE27D",
      cancelButtonColor: "#fff",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setIsEditing(false);
        setIsUser(false);
        reset();
        Swal.fire("Sesión cerrada!", "Su sesión ha sido cerrada.", "success");
      }
    });
  };

  const handleUpdate = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setValue("name", user.name);
    setValue("password", user.password);
    setValue("image", user.image);
    setIsEditing(true);
  };

  const backdropUrl = userLS.image;

  return (
    <div className="user_container">
      <div
        className={`login_container d-flex flex-column justify-content-center align-items-center ${
          isEditing || !isUser ? "d-flex" : "d-none"
        }`}
      >
        <h1>INICIAR SESIÓN</h1>
        <Form className="form_container" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="user">Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Usuario"
              id="user"
              {...register("name", {
                required: "El nombre de usuario es obligatorio",
                minLength: {
                  value: 5,
                  message: "La cantidad mínima de caracteres es de 5 dígitos",
                },
                maxLength: {
                  value: 100,
                  message: "La cantidad máxima de caracteres es de 100 dígitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.name?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              id="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "La contraseña debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 número) también puede incluir caracteres especiales",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="image">Imagen URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL de la imagen"
              id="image"
              {...register("image", {
                required: "La imagen es obligatoria",
                pattern: {
                  value: /^https?:\/\/[^\s]+$/i,
                  message: "La URL no es válida",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.image?.message}
            </Form.Text>
          </Form.Group>
          <Button type="submit" className="w-100 mt-1">
            {isEditing ? "Guardar" : "Iniciar Sesión"}
          </Button>
        </Form>
      </div>
      <div
        className={`logout_container d-flex flex-column justify-content-center align-items-center ${
          isUser ? "d-flex" : "d-none"
        } ${isEditing ? "d-none" : "d-flex"}`}
      >
        <div
          className="logout_image"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
      </div>
      <div
        className={`button_container d-flex flex-lg-row flex-column mt-3 gap-2 ${
          isUser ? "d-flex" : "d-none"
        } ${isEditing ? "d-none" : "d-flex"}`}
      >
        <button
          type="submit"
          className="w-100 edit_button"
          onClick={() => handleUpdate(userLS)}
        >
          Editar
        </button>
        <button
          type="submit"
          className="w-100 delete_button"
          onClick={() => handleLogout(userLS)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;
