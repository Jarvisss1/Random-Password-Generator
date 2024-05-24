import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./usePasswordGenerator/usePasswordGenerator";
import useStrengthIndicator from "./strength/useStrengthIndicator";

function App() {
  const [length, setLength] = useState(4);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", value: true },
    { title: "Include Lowercase Letters", value: false },
    { title: "Include Numbers", value: false },
    { title: "Include Symbols", value: false },
  ]);

  const [copied, setCopied] = useState(false);

  const { password, generatePassword, errorMessage } = usePasswordGenerator();

  const handleCheckbox = (index) => {
    const updatedCheckboxData = checkboxData.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          value: !item.value,
        };
      }
      return item;
    });
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const strength = useStrengthIndicator(password);

  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="password">{password}</div>
          <button className="copyButton" onClick={handleCopy}>
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      )}

      <div className="charlength">
        <span>
          <label htmlFor="">Character length</label>
          <label htmlFor="" id="length">
            {length}
          </label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          id="charlength"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="checkbox">
        {checkboxData.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={item.title}
              name={item.title}
              value={item.value}
              checked={item.value}
              onChange={() => handleCheckbox(index)}
            />
            <label htmlFor={item.title}>{item.title}</label>
          </div>
        ))}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {password && <div className={`strength ${strength}`}>{strength}</div>}
      <button
        className="generateButton"
        onClick={() => generatePassword(checkboxData, length)}
      >
        GENERATE PASSWORD
      </button>
    </div>
  );
}

export default App;
