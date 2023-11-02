import React, { useState } from 'react';
import './TestForm.css'; // Import the CSS file

function TestInput({ label, value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input type="number" className="input" value={value} onChange={onChange} />
    </div>
  );
}

function TestForm() {
  const [numTests, setNumTests] = useState(0);
  const [grades, setGrades] = useState([]);

  const handleNumTestsChange = (e) => {
    const num = parseInt(e.target.value);
    setNumTests(num);
    setGrades(Array(num).fill(''));
  };

  const handleGradeChange = (e, index) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = e.target.value;
    setGrades(updatedGrades);
  };

  // Calculate scores needed for an A here

  return (
    <div className="test-form-container">
      <label className="label">Number of Tests:</label>
      <input type="number" className="input" value={numTests} onChange={handleNumTestsChange} />
      {Array.from({ length: numTests }, (_, i) => (
        <TestInput
          key={i}
          label={`Test ${i + 1} Grade: `}
          value={grades[i]}
          onChange={(e) => handleGradeChange(e, i)}
        />
      ))}
     <button className="button">Calculate</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TestForm />
    </div>
  );
}

export default App;
