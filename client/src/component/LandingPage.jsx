import React, { useState } from 'react'
import '../styles/LandingPage.css'
import icon from '../assets/icon.png'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

import dw from '../assets/dw.gif'
const LandingPage = () => {

  const [data, setData] = useState()
  const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
    const newData = {};
    formData.forEach((value, key) => {
      newData[key] = value;
    });
    fetch('http://localhost:3000/api/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: newData.from_fname,
      lastName: newData.from_lname,
      emailId: newData.from_email,
      
    }),
  })


  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(text => {
    console.log('Success:', text);
    setData(newData); 
    e.target.reset(); 
  })


        emailjs.sendForm('service_xrgsffd', 'template_swjc796', form.current, 'd-tDrjklgMWD_unMU')
            .then((result) => {
console.log(data)
                console.log(result);
                alert('Form submitted successfully!');
                setData(newData);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
            });
    };

    console.log(data)
  return (
    <>
      <div className="mainLanding">
        <div className="ml">
          <br />
          <br />
          <div className="head">
            <img src={icon} style={{
              width: 30,
              height: 30,
              flexShrink: 0
            }} alt="" />
            <p className='heading' style={{ fontSize: 24 }}><span>PrimeFunded</span></p>
          </div>
          <p className='heading'>Launching Soon</p>
          <p className="para" style={{ fontSize: 22 }}>Promising a <span>Transparent, Efficient, and Affordable</span>  Prop Trading Solution</p>

          <div className="blur">
            <p className="para" style={{ fontSize: 16 }}>Register Now to Get Discount Up to 50% on Launch</p>
            <br />
            <br />
            
            <form method="post" id='contact-form' ref={form} onSubmit={sendEmail}>
             
              <div className="input">
              <input type="text" className='inputbar'  id="fname" name="from_fname" placeholder='First Name' />
              <input type="text" className='inputbar'  id="lname" name="from_lname" placeholder='Last Name' />
              <input type="email" className='inputbar'  id="email" name="from_email" placeholder='Your Email' />
              <button className="mainbtn" type="submit">Submit</button>
            </div>
            <br />

              
            </form>

            <br />
            <button className="mainbtn2" > <img src={dw} alt="" className="sm" /> JOIN OUR DISCORD</button>
            <p className="para" style={{ fontSize: 12 }}>To check Giveaway Winners</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default LandingPage