import { useState, useEffect } from "react";
import JobListing, { type Job } from "./JobListing";
import Spinner from "./Spinner";

interface Props {
  isHome?: boolean;
}

function JobListings({ isHome = true }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = isHome ? "/api/jobs?limit=3" : "/api/jobs";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(apiUrl);
        const data: Job[] = await res.json();
        if (isHome) {
          setJobs(data.slice(0, 3));
        } else {
          setJobs(data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome, apiUrl]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default JobListings;
