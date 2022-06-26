import React, { useState, useEffect, useRef } from "react";

const ColorValue = ({ value }) => {

  return <>
    {value < 2.5 && <>  <div className='bg-red-500 rounded-full w-10 h-10'></div></>}
    {value >= 2.5 && value < 4.5 && <>  <div className='bg-yellow-500 rounded-full w-10 h-10'></div></>}
    {value >= 4.5 && <>  <div className='bg-green-500 w-10 h-10'></div></>}
  </>
};
export default ColorValue;