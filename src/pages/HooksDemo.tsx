import { Link } from "react-router-dom";
import DataDisplay from "../components/DataDisplay";
import MetricsQuery from "../components/MetricsQuery";

/**
 * Shows the same API data fetched two ways: a hand written custom hook (useFetch)
 * and an RTK Query generated hook. The rendered output is intentionally identical,
 * so the comparison is about the data layer rather than the UI.
 */
const HooksDemo = () => {
  return (
    <div>
      <h1>React Fundamentals</h1>
      <Link to='/'>Home</Link>

      <section aria-labelledby='custom-hook-heading'>
        <h2 id='custom-hook-heading'>Custom hook (useFetch)</h2>
        <DataDisplay url='https://jsonplaceholder.typicode.com/posts' />
      </section>

      <section aria-labelledby='rtk-query-heading'>
        <h2 id='rtk-query-heading'>Redux Toolkit Query</h2>
        <MetricsQuery />
      </section>
    </div>
  );
};

export default HooksDemo;
