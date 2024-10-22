import { useEffect, useState } from "react";
import JobList from "./JobList";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
      setIsLoading(true);
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
        // console.log(jobs); Optional(testing for data loading)
      } catch (error) {
        console.log("Error loading data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {!isHome ? "Browse Jobs" : "Recent Jobs"}
          </h2>

          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobList job={job} key={job.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListings;
