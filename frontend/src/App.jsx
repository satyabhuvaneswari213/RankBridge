import Home from "./pages/Home";
import RankPredictor from "./pages/RankPredictor";
import CollegeResults from "./pages/CollegeResults";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Compare from "./pages/Compare";
import AdminDashboard from "./pages/AdminDashboard";
import CollegeDetails from "./pages/CollegeDetails";

function App() {
  const path = window.location.pathname;

  if (path === "/predictor") {
    return <RankPredictor />;
  }

  if (path === "/results") {
    return <CollegeResults />;
  }

  if (path === "/dashboard") {
    return <Dashboard />;
  }

  if (path === "/login") {
    return <Login />;
  }

  if (path === "/signup") {
    return <Signup />;
  }
  
  if (path === "/compare") {
  return <Compare />;
}
if (path === "/admin") {
  return <AdminDashboard />;
}
if (path.startsWith("/college/")) {
  return <CollegeDetails />;
}
  return <Home />;
}

export default App;