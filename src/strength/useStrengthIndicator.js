import zxcvbn from "zxcvbn";    

export default function useStrengthIndicator(password) {
  const strength = zxcvbn(password);
  const strengthIndicator = [
    { label: "Weak", value: 0 },
    { label: "Weak", value: 1 },
    { label: "Fair", value: 2 },
    { label: "Good", value: 3 },
    { label: "Strong", value: 4 },
  ];

  return strengthIndicator[strength.score].label;
  
}