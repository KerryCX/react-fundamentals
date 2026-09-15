/**
 * The RTK Query counterpart to DataDisplay.
 *
 * Deliberately renders the same loading, error, empty and success states as the
 * useFetch version so the two approaches can be compared like for like on the
 * Hooks Demo page. The visible output is identical; what differs is where the
 * state comes from.
 *
 * isLoading is true only when there is no cached data yet. A background refresh
 * of data already in the cache surfaces as isFetching instead, which is why the
 * two are separate flags.
 */
import { useGetMetricsQuery } from "../features/metrics/metricsApi";

const MetricsQuery = () => {
  const { data, isLoading, isError } = useGetMetricsQuery();

  if (isLoading)
    return (
      <div aria-live='polite' aria-busy='true'>
        <span className='sr-only'>Loading data, please wait</span>
        <div aria-hidden='true'>Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div role='alert'>
        <span>Unable to load data. Please try again later.</span>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div>
        <span className='sr-only'>There is no data</span>
        <div aria-hidden='true'>No data available</div>
      </div>
    );

  return (
    <ul>
      {data.map((d) => (
        <li key={d.id}>Title: {d.title}</li>
      ))}
    </ul>
  );
};

export default MetricsQuery;
