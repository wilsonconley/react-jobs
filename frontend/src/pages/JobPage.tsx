import { useLoaderData } from "react-router-dom";

function JobPage() {
  const job = useLoaderData();
  return <h1>{job.title}</h1>;
}

const jobLoader = async ({ params }: { params: any }) => {
  const res = await fetch(`/api/job/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
