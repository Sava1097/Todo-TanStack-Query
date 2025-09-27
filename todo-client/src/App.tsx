import "./App.css";
import { Todos } from "./components/Todos";

function App() {
  return (
    <div className="md:min-h-screen bg-gray-50 flex md:items-center justify-center p-4">
      <Todos />
    </div>
  );
}

export default App;
