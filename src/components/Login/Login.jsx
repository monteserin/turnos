import { useState } from 'react';
import { Container, InnerContainer, PRecoverPass, BackButton, GoogleBtn, LoginInput, Panel, PWelcome, Separator, AccessBtn, ErrorMsg } from './Login.styles';
import { loginWithGoogle, signIn, signUp, sendPass, checkEmailAndPass } from './firebase/api';
import { Button, Input } from 'antd';
import googleIcon from './assets/google-icon.png';
import { U } from '../Layout/styles/common';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [loginState, setLoginState] = useState(0);

  const [recoverPasswordScreen, setRecoverPasswordScreen] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsgRegister, setErrorMsgRegister] = useState('');

  return (
    <Container>
      <InnerContainer>
        <Panel visible={loginState === 0}>
          <PWelcome>¡Bienvenido@ de nuevo!</PWelcome>
          <LoginInput type="text" placeholder="email" onChange={e => setEmail(e.target.value)} />
          <br />
          <LoginInput type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
          <br />


          <AccessBtn onClick={async () => {
            const response = await checkEmailAndPass(email, password);

            //auth/user-not-found
            if (response.includes('auth/user-not-found')) {
              setErrorMsg('Usuario no encontrado. El correo o la contraseña son incorrectos.');
            } else if (response.includes('google.com')) {
              setErrorMsg('Este email esta vinculado a un acceso utilizando el login con google. Por favor, pulsa el siguiente botón para loguearte con tu cuenta de google.');

            }
          }}>Acceder</AccessBtn>

          <ErrorMsg>{errorMsg}</ErrorMsg>


          <PRecoverPass onClick={() => setRecoverPasswordScreen(true)}>He olvidado mi contraseña</PRecoverPass>

          <p>¿No tienes cuenta? <U onClick={() => setLoginState(1)}>Puedes registrar una</U>.</p>

          <Separator><span className="txt">o</span> <span className="line"></span> </Separator>

          <br />

          <GoogleBtn onClick={loginWithGoogle}><img src={googleIcon} />Login con Google</GoogleBtn>
        </Panel>
        <Panel visible={loginState === 1}>
          <h2>Registro</h2>
          <p onClick={() => setLoginState(1)}>←</p>

          <LoginInput type="email" placeholder='tucorreo@example.com' onChange={e => setRegisterEmail(e.target.value)} /><br />

          <LoginInput type="password" placeholder='password' onChange={e => setRegisterPassword(e.target.value)} /><br />

          <ErrorMsg>{errorMsgRegister}</ErrorMsg>
          <AccessBtn onClick={async () => {
            const response = await signUp(registerEmail, registerPassword);
            if (response.includes('auth/email-already-in-use')) {
              setErrorMsgRegister('El email ya está en uso. Quizás lo tienes vinculado a un acceso con Google, en cuyo caso debes volver a la pantalla anterior y utilizar el acceso con Google.');
            } else if (response.includes('auth/weak-password')) {
              setErrorMsgRegister('La contraseña debe tener al menos 6 caracteres');
            }
          }}>Registrar</AccessBtn>
        </Panel>
        <Panel visible={loginState === 2}>
          <p onClick={() => setRecoverPasswordScreen(false)}>←</p>
          <p>Por favor, introduce el mail cuya contraseña deseas cambiar</p>
          <BackButton>Volver</BackButton>
          <LoginInput type="email" placeholder='tucorreo@example.com' onChange={e => setRecoverEmail(e.target.value)} />
          <Button onClick={async () => {
            const response = sendPass(recoverEmail);
            if (response === 'Email sent') {
              alert('Email enviado. Mira la carpeta de spam por si acaso.');
            }
          }}>Enviar</Button>
        </Panel>

      </InnerContainer>

    </Container >
  );
}

export default Login;
