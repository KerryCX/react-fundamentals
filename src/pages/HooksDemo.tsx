import { Link } from "react-router-dom";
import DataDisplay from "../components/DataDisplay";

const HooksDemo = () => {
  return (
    <div>
      <h1>React Fundamentals</h1>
      <Link to='/'>Home</Link>
      <DataDisplay url='https://jsonplaceholder.typicode.com/posts' />
    </div>
  );
};

export default HooksDemo;
