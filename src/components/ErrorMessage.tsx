import { useState } from "react";

type Props = {
  className?: string;
  message?: string;
  children?: React.ReactNode;
};

const ErrorMessage = ({ className, message, children }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("default value");

  const handleChangeMessage = () => {
    if (errorMessage === "default value") {
      setErrorMessage("my Value");
    } else {
      setErrorMessage("default value");
    }
  };

  return (
    <>
      <div id="test" className={`text-red-500 ${className}`}>
        {errorMessage}
      </div>
      <button onClick={handleChangeMessage}>Klick</button>
    </>
  );
};

export default ErrorMessage;
