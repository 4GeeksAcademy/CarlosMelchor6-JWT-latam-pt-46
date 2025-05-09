// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { RegisterForm } from "./pages/RegisterForm";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route 
      path="/dashboard" 
      element={
      <PrivateRoute>
        <Dashboard/>
      </PrivateRoute>} />
    </Route>
  )
);