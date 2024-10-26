import { About } from "./pages/about";
import { Dashboard } from "./pages/host/dashboard";
import { Home } from "./pages/home";
import { Host } from "./pages/host/host";
import { HostVanDetail } from "./pages/host/host-van-detail";
import { HostVanInfo } from "./pages/host/host-van-info";
import { HostVanPhotos } from "./pages/host/host-van-photos";
import { HostVanPricing } from "./pages/host/host-van-pricing";
import { Income } from "./pages/host/income";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Reviews } from "./pages/host/reviews";
import { Route } from "react-router-dom";
import { Van } from "./pages/van";
import { VanList } from "./pages/host/van-list";
import { Vans } from "./pages/vans";
import { vansLoader } from "./loaders";

function App() {
  return (
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:vanId" element={<Van />} />

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

      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

export default App;
