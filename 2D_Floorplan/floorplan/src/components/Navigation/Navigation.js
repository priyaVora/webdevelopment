import React from 'react';
import 'tachyons';

const Navigation = () => {
    return(
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p className='f3 link dim black underline pa3 pointer'>Homepage</p>
      <p className='f3 link dim black underline pa3 pointer'>Create Floorplan</p>
      <p className='f3 link dim black underline pa3 pointer'>Projects</p>
      <p className='f3 link dim black underline pa3 pointer'>About Us</p>
      <p className='f3 link dim black underline pa3 pointer'>Contact</p>
    </nav>
        );
}

export default Navigation;
