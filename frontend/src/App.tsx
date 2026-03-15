import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";   // ← IMPORTANT

// Pages
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ProfilePage from "@/pages/ProfilePage"
import SignUpPage from "./pages/Auth/SignUpPage";
import PendingUsersPage from "@/pages/admin/PendingUsersPage"
import SignInPage from "./pages/Auth/SignInPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ApprovedUsersPage from "./pages/admin/ApprovedUsersPage";
import ContactCardsPage from "./pages/ContactCardsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MyProfilePage from "./pages/MyProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import EventsPage from "./pages/EventsPage";
import AdminEventsPage from "./pages/admin/AdminEventsPage";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {/* <Layout> */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              {/* <Route path="/news" element={<News />} /> */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contacts" element={
                <ProtectedRoute>
                <ContactCardsPage />
                </ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} /> */}
              <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/profile/:id" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
}/>
              <Route
              path="/admin/pending-users"
              element={<PendingUsersPage/>}
              />

              <Route
              path="/admin/approved-users"
              element={<ApprovedUsersPage/>}
/>

              <Route path="/profile"
                element={
    <ProtectedRoute>
      <MyProfilePage />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile/edit"
  element={
    <ProtectedRoute>
      <EditProfilePage />
    </ProtectedRoute>
  }
/>

<Route path="/events" element={<EventsPage />} />
<Route path="/admin/events" element={<AdminEventsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </Layout> */}
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);


export default App;
