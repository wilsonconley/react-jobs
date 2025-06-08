import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import type { JobApi } from "./components/JobListing";

function App() {
  const addJob = async (newJob: JobApi) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    console.log("Added job", await res.json());
    return;
  };

  const editJob = async (id: string, newJob: JobApi) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    console.log("Edited job", await res.json());
    return;
  };

  const deleteJob = async (id: string) => {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    console.log("Deleted job", id);
    return;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobLoader = async ({ params }: { params: any }) => {
    const res = await fetch(`/api/jobs/${params.id}`);
    const data = await res.json();
    return data;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/edit/:id"
          element={<EditJobPage editJobSubmit={editJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/add"
          element={<AddJobPage addJobSubmit={addJob} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
