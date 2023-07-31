import React, { useEffect, useState } from 'react'

export const useInput = () => {
    const [temp,setTemp]=useState('');

    useEffect(() => {
      setTemp('');
    
    }, [])
    

    const inputHandleOnChange =(event)=>{
        setTemp(event.target.value);
    }

    return [temp,inputHandleOnChange];
}
