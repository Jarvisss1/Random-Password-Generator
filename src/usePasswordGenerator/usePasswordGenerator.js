import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charset = "";
    let generatedPassword = ""; 

    const selectedOptions = checkboxData.filter((item) => item.value);
    if (selectedOptions.length === 0) {
      setErrorMessage("Please select at least one option");
      setPassword("");
      return;
    }

    selectedOptions.forEach((item) => {
      switch (item.title) {
        case "Include Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "0123456789";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(
        Math.floor(Math.random() * charset.length)
      );
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, generatePassword, errorMessage };
};

export default usePasswordGenerator;
