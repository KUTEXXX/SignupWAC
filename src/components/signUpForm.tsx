import React, { useState, useEffect } from "react";
import 'bootstrap';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
import 'bootstrap-datepicker';

const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = () => {
        const today = new Date();
        const selectedDate = new Date(birthdate);
        const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()); // Fecha para personas mayores de 13 años

        if (selectedDate >= minAgeDate) {
            console.log('Fecha erronea');
            setErrorMessage('Debe ser mayor de 13 años para registrarse.');
            return; // Salir de la función si el usuario es menor de 13 años
        }

        if (email && confirmEmail && password && confirmPass && firstName && lastName && birthdate && isPasswordValid) {
            if(email === confirmEmail){
                if (password === confirmPass) {
                    // Aquí se hará la lógica del registro
                    console.log('Email:', email);
                    console.log('Password:', password);
                    console.log('First Name:', firstName);
                    console.log('Last Name:', lastName);
                    console.log('Birthdate:', birthdate);
                    // Enviar los datos al servidor y a la BBDD para el registro

                    // Resetear los campos después del registro exitoso
                    setEmail('');
                    setPassword('');
                    setConfirmPass('');
                    setFirstName('');
                    setLastName('');
                    setBirthdate('');
                    setIsPasswordValid(false);
                    setIsFormFilled(false);
                    setErrorMessage(''); // Limpiar el mensaje de error
                } else {
                    setErrorMessage('Las contraseñas no coinciden.');
                }
            }else{
                setErrorMessage('Las direcciones de correo no coinciden');
            }
        } else {
            setErrorMessage('Por favor, complete todos los campos y asegúrese de que la contraseña cumpla con los requisitos.');
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) => {
        const newName = e.target.value;
        // Expresión regular para verificar que solo se ingresen letras
        const nameRegex = /^["A-Z" "a-z"]+$/;
        if (nameRegex.test(newName) || newName === '') {
            setName(newName); // Establecer el nuevo valor si coincide con la expresión regular
            checkFormFilled(); // Verificar si el formulario está lleno
        }
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isValid = passwordRegex.test(newPassword);
        setIsPasswordValid(isValid);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }


    const changeButtonImage = () => {
        const buttonImage = document.getElementById('buttonImage') as HTMLImageElement;
        buttonImage.src = 'button2.png';
    }

    const checkFormFilled = () => {
        if (email && password && confirmPass && firstName && lastName && birthdate) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }

    return (
        <div>
            <img src="logo.png" alt="logo" className="logo" />
            <h1 className="title">Regístrate en WhatACook</h1>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="email" className="styleFont">Email:</label>
                    <div className="input">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); checkFormFilled() }}
                            onPaste={(e) => e.preventDefault()} // Evitar que se pueda pegar en el campo de email
                            onCopy={(e) => e.preventDefault()} // Evitar que se pueda copiar en el campo de email
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="styleFont">Confirmar email:</label>
                    <div className="input">
                        <input
                            type="email"
                            id="confirmEmail"
                            value={confirmEmail}
                            onChange={(e) => { setConfirmEmail(e.target.value); checkFormFilled() }}
                            onPaste={(e) => e.preventDefault()} // Evitar que se pueda pegar en el campo de email
                            onCopy={(e) => e.preventDefault()} // Evitar que se pueda copiar en el campo de email
                            autoComplete="off" 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="styleFont">Contraseña:</label>
                    <div className="input">
                        <input
                            type={isPasswordVisible ? "text" : "password"} // Cambiar el tipo de entrada según el estado de visibilidad de la contraseña
                            id="password"
                            value={password}
                            onChange={handlePasswordInput}
                            style={{ marginLeft: '35px' }} // Estilo en línea para establecer el margen izquierdo
                        />

                        <button type="button" onClick={togglePasswordVisibility} className="password-toggle-icon">
                            <img src={isPasswordVisible ? "eye_open.png" : "eye_closed.png"} alt="Toggle Password Visibility"
                                className="password-toggle-icon" />
                        </button>
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="styleFont">Confirmar contraseña:</label>
                    <div className="input">
                        <input
                            type={isPasswordVisible ? "text" : "password"} // Cambiar el tipo de entrada según el estado de visibilidad de la contraseña
                            id="confirmPassword"
                            value={confirmPass}
                            onChange={(e) => { setConfirmPass(e.target.value); checkFormFilled() }}
                        />

                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="firstName" className="styleFont">Nombre:</label>
                    <div className="input">
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => handleNameChange(e, setFirstName)} // Usar la función para manejar cambios
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="styleFont">Apellidos:</label>
                    <div className="input">
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => handleNameChange(e, setLastName)} // Usar la función para manejar cambios
                        />
                    </div>
                </div>
                <div className="birthdate-container">
                    <label htmlFor="birthdate" className="styleFont">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => { setBirthdate(e.target.value); checkFormFilled() }}
                        className="birthdate-input"
                    />
                </div>

            </form>

            <button
                id="submitButton"
                type="button"
                onClick={() => {
                    changeButtonImage();
                    handleSignUp();
                }}
            /*</div> disabled={!isFormFilled || !isPasswordValid}*/
            >
                <img src="button1.png" alt="Botón" id="buttonImage" />
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}


        </div>

    );
};

export default SignUpForm;
