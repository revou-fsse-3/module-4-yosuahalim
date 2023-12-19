import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (errorMsg) return;
    setCount(count + 1);
  };

  const handleCount2 = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    //Min length 5
    if (e.target.value.length < 5) {
      setErrorMsg("error, min length is 5");
    } else {
      setErrorMsg("");
    }
  };

  useEffect(() => {
    console.log("useEffect");

    return () => {
      console.log("clean up");
    };
  }, [count]);

  return (
    <>
      <div>
        <form action="">
          <input value={inputValue} onChange={handleOnChangeText} type="text" />
          {errorMsg && <span style={{ color: "red" }}>{errorMsg}</span>}
          <button
            disabled={errorMsg ? true : false}
            ref={buttonRef}
            onClick={(e) => handleCount(e)}
          >
            increment
          </button>
        </form>
        {count}
      </div>
    </>
  );
}

export default App;
