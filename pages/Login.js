import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function Login() {
  const navigate = useNavigate();

  return (
    <>
    <div className="pagebackground">
      {/* Background clouds */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>

      {/* Main content */}
      <div className="welcomeContainer">
        <h1 className="title">Learniverse</h1>
        <h2 className="subtitle">
          Choose your login 
        </h2>

       {/* role buttons */}
        <div className="buttonCont">
          <button
            className="welcomeButton"
            onClick={() => navigate('/studentlogin')}
          >
            Student Login
          </button>

          <button
            className="welcomeButton"
            onClick={() => navigate('/teacherlogin')}
          >
            Teacher Login
          </button>

          <button
            className="welcomeButton"
            onClick={() => navigate('/parentlogin')}
          >
            Parent Login
          </button>

          <button
            className="welcomeButton"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;
