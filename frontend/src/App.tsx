import React, { useState, useEffect } from 'react';

function App() {
  // State to hold the input text
  const [text, setText] = useState('')
  // State to hold the word type counts
  const [wordTypes, setWordTypes] = useState({})

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => {
    try {
      const lambdaEndpoint = process.env.BACKEND_URL;

      const response = await axios.post(lambdaEndpoint, { text });

      // better to add some class for declaration of response structure 
      setWordTypes(response.data);
    } catch (error) {
      // Will be catched by CloudWatch
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label>Input Text</label>
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={handleTextChange}
      />
      <br/>
      <label>Results</label>
      <textarea
        rows={4}
        cols={50}
        onChange={handleTextChange}
      >
        {Object.keys(wordTypes).map((type) => (
          <li key={type}>
            {type}: {wordTypes[type]}
          </li>
        ))}
      </textarea>
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;