import { Route, Routes } from "react-router-dom";

import { About } from "./pages/about";
import { AuthProvider } from "./store/auth-context";
import { Dashboard } from "./pages/host/dashboard";
import { Home } from "./pages/home";
import { Host } from "./pages/host/host";
import { HostVanDetail } from "./pages/host/host-van-detail";
import { HostVanInfo } from "./pages/host/host-van-info";
import { HostVanPhotos } from "./pages/host/host-van-photos";
import { HostVanPricing } from "./pages/host/host-van-pricing";
import { Income } from "./pages/host/income";
import { Layout } from "./components/layout";
import { Login } from "./pages/login";
import { NotFound } from "./pages/not-found";
import { ProtectedRoute } from "./components/protected-route";
import { Reviews } from "./pages/host/reviews";
import { Van } from "./pages/van";
import { VanList } from "./pages/host/van-list";
import { Vans } from "./pages/vans";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:vanId" element={<Van />} />

          <Route element={<ProtectedRoute />}>
            <Route path="host" element={<Host />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="vans" element={<VanList />} />
              <Route path="vans/:vanId" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="photos" element={<HostVanPhotos />} />
                <Route path="pricing" element={<HostVanPricing />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
