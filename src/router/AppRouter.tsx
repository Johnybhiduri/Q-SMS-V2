// import { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";

// // import MainLayout from "../layouts/MainLayout";
// // import DashboardLayout from "../layouts/DashboardLayout";

// // import ScrollToTop from "../components/common/ScrollToTop";
// // import ProtectedRoute from "../components/auth/ProtectedRoute";

// // Keep Home eagerly loaded (landing page)
// import Home from "../pages/Home";

// // Lazy-loaded pages
// const About = lazy(() => import("../pages/About"));
// // const Pricing = lazy(() => import("../pages/Pricing"));
// const NotFound = lazy(() => import("../pages/NotFound"));
// const FAQ = lazy(() => import("../pages/Faq"));
// const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
// const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));
// const ReportAbuse = lazy(() => import("../pages/ReportAbuse"));
// const AcceptableUsePolicy = lazy(
//   () => import("../pages/AcceptableUseOfPolicy")
// );
// const TermsOfServices = lazy(
//   () => import("../pages/TermsOfServices")
// );
// // const HowItWorks = lazy(() => import("../pages/HowItWorks"));
// const Support = lazy(() => import("../pages/Support"));

// const AuthPage = lazy(
//   () => import("../auth/AuthPage")
// );

// const DashboardPage = lazy(
//   () => import("../dashboard/DashboardMain")
// );

// const AppRouter = () => {
//   return (
//     <>
//       {/* <ScrollToTop /> */}

//       <Suspense
//         fallback={
//           <div className="flex items-center justify-center min-h-screen">
//             Loading...
//           </div>
//         }
//       >
//         <Routes>
//           {/* Public marketing pages */}
//           {/* <Route element={<MainLayout />}> */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           {/* <Route path="/pricing" element={<Pricing />} /> */}
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//           <Route path="/report-abuse" element={<ReportAbuse />} />
//           <Route
//             path="/acceptable-use-policy"
//             element={<AcceptableUsePolicy />}
//           />
//           <Route
//             path="/terms-of-services"
//             element={<TermsOfServices />}
//           />
//           {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
//           <Route path="/support" element={<Support />} />
//         </Route>

//         {/* Auth */}
//         <Route path="/auth" element={<AuthPage />} />

//         {/* Protected Dashboard */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route
//             path="/dashboard"
//             element={<DashboardPage />}
//           />
//         </Route>

//         {/* 404 */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Suspense >
//     </>
//   );
// };

// export default AppRouter;