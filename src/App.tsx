import DataDisplay from "./components/DataDisplay";

function App() {
  return (
    <div>
      <h1>React Fundamentals</h1>
      <DataDisplay url='https://jsonplaceholder.typicode.com/posts' />
    </div>
  );
}

export default App;
