import React, { useState } from 'react';
import './TestForm.css';

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
  const [maxPoints, setMaxPoints] = useState(100); // Maximum points
  const [testsLeft, setTestsLeft] = useState(0);   // Number of tests left
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState(null);

  const handleNumTestsChange = (e) => {
    const num = parseInt(e.target.value);

    if (num < 0) {
      setErrorMessage('Number of tests cannot be negative');
      setNumTests(0);
    } else {
      setErrorMessage('');
      setNumTests(num);
      setGrades(Array(num).fill(''));
      setMaxPoints(100);  // Reset maximum points
      setTestsLeft(0);    // Reset number of tests left
    }
  };

  const handleGradeChange = (e, index) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = e.target.value;
    setGrades(updatedGrades);
  };
  const calculateScoresForA = () => {
    const totalMaxPoints = maxPoints * numTests * testsLeft; // Total maximum points available
    const currentPoints = grades.reduce((acc, grade) => acc + Number(grade), 0); // Total points earned
    const pointsNeededForA = 0.9 * totalMaxPoints - currentPoints; // Points needed for an 'A'
  
    if (testsLeft === 0) {
      return 0; 
    } else {
      return pointsNeededForA / testsLeft; 
    }
  };
  const handleCalculate = () => {
    const scoreNeededPerTest = calculateScoresForA();
    setResults(scoreNeededPerTest.toFixed(2)); // Set results in state
  };

  return (
    <div className="test-form-container mx-auto p-4 rounded border border-gray-300">
      <label className="block font-bold mt-4">Number of Tests Taken:</label>
      <input
        type="number"
        className="input"
        value={numTests}
        onChange={handleNumTestsChange}
      />
      {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}

      {/* Maximum Points */}
      <label className="block font-bold mt-4">Maximum Points:</label>
      <input
        type="number"
        className="input"
        value={maxPoints}
        onChange={(e) => setMaxPoints(e.target.value)}
      />

      {/* Number of Tests Left */}
      <label className="block font-bold mt-4">Number of Tests Left:</label>
      <input
        type="number"
        className="input"
        value={testsLeft}
        onChange={(e) => setTestsLeft(e.target.value)}
      />

      {Array.from({ length: numTests }, (_, i) => (
        <TestInput
          key={i}
          label={`Test ${i + 1} Grade: `}
          value={grades[i]}
          onChange={(e) => handleGradeChange(e, i)}
        />
      ))}
      <button className="button mt-4" onClick={handleCalculate}>
        Calculate
      </button>

      {results && (
        <div className="results mt-4 font-bold">
          Score Needed on Each Test for an 'A': {results}
        </div>
      )}
    </div>
  );
}

export default TestForm;
