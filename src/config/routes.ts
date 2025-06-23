// Route configuration
import { lazy } from "react"
import type { RouteConfig } from "@/types"

// Lazy load components for code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const Customers = lazy(() => import("@/pages/Customers"))
const Jobs = lazy(() => import("@/pages/Jobs"))
const Invoices = lazy(() => import("@/pages/Invoices"))
const Employees = lazy(() => import("@/pages/Employees"))
const Reports = lazy(() => import("@/pages/Reports"))
const Settings = lazy(() => import("@/pages/Settings"))
const Login = lazy(() => import("@/pages/Login"))
const NotFound = lazy(() => import("@/pages/NotFound"))

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: Dashboard,
    exact: true,
    protected: true,
    title: "Dashboard",
    description: "Overview of your business metrics and activities",
  },
  {
    path: "/customers",
    component: Customers,
    protected: true,
    roles: ["owner", "admin", "manager"],
    title: "Customers",
    description: "Manage your customer database",
  },
  {
    path: "/jobs",
    component: Jobs,
    protected: true,
    title: "Jobs",
    description: "Track and manage your jobs",
  },
  {
    path: "/invoices",
    component: Invoices,
    protected: true,
    roles: ["owner", "admin", "manager"],
    title: "Invoices",
    description: "Create and manage invoices",
  },
  {
    path: "/employees",
    component: Employees,
    protected: true,
    roles: ["owner", "admin"],
    title: "Employees",
    description: "Manage your team",
  },
  {
    path: "/reports",
    component: Reports,
    protected: true,
    roles: ["owner", "admin", "manager"],
    title: "Reports",
    description: "Business analytics and reports",
  },
  {
    path: "/settings",
    component: Settings,
    protected: true,
    title: "Settings",
    description: "Configure your application",
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    title: "Login",
    description: "Sign in to your account",
  },
  {
    path: "*",
    component: NotFound,
    title: "Page Not Found",
    description: "The page you are looking for does not exist",
  },
]

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find((route) => route.path === path)
}

export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter((route) => route.protected)
}

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter((route) => !route.protected)
}
