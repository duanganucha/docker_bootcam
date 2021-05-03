import React from "react";
import  "./Lottery.css"

function Lottery() {
  return (
    <>
      <h1 className="lottery-title">สามตัวงวดนี้</h1>
      <div className="lottery-container">
        <div className="lottery-number">1</div>
        <div className="lottery-number">2</div>
        <div className="lottery-number">3</div>
      </div>
      <button className="lottery-buttton" >Random</button>
    </>
  );
}
 
export default Lottery;
