import "./App.css";
import { useState } from "react";

function App() {
  const [colour, setColour] = useState("");
  const [fnColour, setFnColour] = useState("");
  const onclick = async (): Promise<void> => {
    try {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab.id) {
        chrome.scripting.executeScript<string[], void>({
          target: { tabId: tab.id! },
          args: [colour, fnColour],
          func: (colour, fnColour) => (
            (document.body.style.backgroundColor = colour),
            (document.body.style.color = fnColour),
            document
              .querySelectorAll("p")
              .forEach((p) => (p.style.color = fnColour))
          ),
        });
      } else {
        console.error("No active tab found");
      }
    } catch (error) {
      console.error("Error executing script:", error);
    }
  };

  return (
    <>
      <h1 className="font-bebas">Change the Background Color and Font Color</h1>
      <div className="card p-4 mt-4 border rounded shadow-md text-center">
        <h2>Change the font color</h2>
        <input
          type="color"
          onChange={(e) => setFnColour(e.currentTarget.value)}
        />
        <h2>Change the backgroundColor</h2>
        <input
          type="color"
          onChange={(e) => setColour(e.currentTarget.value)}
        />
        <button
          className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onclick}
        >
          Click me
        </button>
      </div>
    </>
  );
}

export default App;
