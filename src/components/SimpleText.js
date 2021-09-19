import React, { useState } from 'react';
import conversion from '../utils/conversion';
import DisplayHTML from './DisplayHtml';

const Simpletextarea = () => {
  const [displayText, setDisplayText] = useState('');

  const handleChange = (newText) => {
    //this is where we put our function to change the input from markdown into html
    let changedText = conversion(newText);
    setDisplayText(changedText);
  };

  return (
    <div>
      <div className='textArea'>
        <label>Enter value : </label>
        <textarea
          type='textarea'
          name='textValue'
          rows='20'
          cols='50'
          onChange={(event) => handleChange(event.target.value)}
        />
        <DisplayHTML displayText={displayText} />
      </div>
    </div>
  );
};

export default Simpletextarea;
