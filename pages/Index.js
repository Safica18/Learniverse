import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';

function Index() {
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

        <h2 className="subtitle">Building Future Skills Through Fun And Adaptive Learning. </h2>
         <h3 className="para"> Followed by UK National Curriculum </h3>
        {/* selct level - Key stage 1 or Key stage 2*/}
        <div className="levelSec">
         

          <div className="levelCont">
            {/* for KS1 */}
            <div className="levelCont ks1">
              <h3>KS1</h3>
              <p>(Ages 5 – 7)</p>
              
            </div>

            {/* for KS2 */}
            <div className="levelCont ks2">
              <h3>KS2</h3>
              <p>(Ages 7 – 11)</p> 
              
            </div>
          </div>
        </div>

        {/* Login and Register buttons */}
        <div className="buttonCont">
          <button className="welcomeButton" onClick={() => navigate('/register')}> Register</button>

          <button className="welcomeButton" onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Index;
