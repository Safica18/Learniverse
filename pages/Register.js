import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function Register() {
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

        <div className="buttonCont">
          <button
            className="welcomeButton" onClick={() => navigate('/studentregister')}> Student Register
            </button>

          <button
            className="welcomeButton" onClick={() => navigate('/teacherregister')}> Teacher Register
          </button>

          <button
            className="welcomeButton" onClick={() => navigate('/parentregister')}> Parent Register
          </button>

          <button
            className="welcomeButton" onClick={() => navigate('/')}> Back
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Register;
