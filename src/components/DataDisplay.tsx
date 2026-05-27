import useFetch from "../hooks/useFetch";

interface Metric {
  id: number;
  title: string;
}

interface DataDisplayProps {
  url: string;
}

const DataDisplay = ({ url }: DataDisplayProps) => {
  const { data, loading, error } = useFetch<Metric[]>(url);
  console.log(data);
  if (loading)
    return (
      <div aria-live='polite' aria-busy='true'>
        <span className='sr-only'>Loading data, please wait</span>
        <div aria-hidden='true'>Loading...</div>
      </div>
    );

  if (error)
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

export default DataDisplay;
