import { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css'
import aboutus from './aboutus.jpg'

const About = (props) => {
        return (
            <div className='content'>
                <div className=''>
                              <img style={{width:'100%',height:'100vh'}} src={aboutus} alt="easytrack"/>
                       
                        </div>
                        
                 
                </div>
        )
    }

export default About;