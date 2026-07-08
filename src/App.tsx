import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";

const About = lazy(() => import("./pages/About"));
// const Pricing = lazy(() => import("../pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/Faq"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ReportAbuse = lazy(() => import("./pages/ReportAbuse"));
const AcceptableUsePolicy = lazy(
  () => import("./pages/AcceptableUseOfPolicy")
);
const TermsOfServices = lazy(
  () => import("./pages/TermsOfServices")
);
// const HowItWorks = lazy(() => import("../pages/HowItWorks"));
const Support = lazy(() => import("./pages/Support"));
const AuthPage = lazy(
  () => import("./auth/AuthPage")
);
const Dashboard = lazy(
  () => import("./pages/Dashboard")
);


// Layout for public pages: Header + Footer
function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Layout for Dashboard: NO Header, but keeps Footer
function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* Public routes — Header + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/report-abuse" element={<ReportAbuse />} />
          <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
          <Route path="/terms-of-services" element={<TermsOfServices />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* Dashboard — Footer only, no Header */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}