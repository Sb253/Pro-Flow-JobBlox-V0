import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

type UserRole =
  | "owner"
  | "admin"
  | "manager"
  | "field_worker"
  | "sales_rep"
  | "subcontractor";

interface Permission {
  module: string;
  actions: string[];
}

interface RolePermissions {
  [key: string]: Permission[];
}

interface RoleContextType {
  userRole: UserRole;
  permissions: Permission[];
  hasPermission: (module: string, action: string) => boolean;
  canAccess: (module: string) => boolean;
  setUserRole: (role: UserRole) => void;
  getAllRoles: () => UserRole[];
  getRoleDisplayName: (role: UserRole) => string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const rolePermissions: RolePermissions = {
  owner: [
    { module: "dashboard", actions: ["view", "edit", "delete", "create"] },
    {
      module: "projects",
      actions: ["view", "edit", "delete", "create", "assign"],
    },
    { module: "clients", actions: ["view", "edit", "delete", "create"] },
    {
      module: "hr",
      actions: ["view", "edit", "delete", "create", "hire", "fire"],
    },
    {
      module: "financial",
      actions: ["view", "edit", "delete", "create", "approve"],
    },
    {
      module: "meetings",
      actions: ["view", "edit", "delete", "create", "host"],
    },
    {
      module: "admin",
      actions: ["view", "edit", "delete", "create", "manage"],
    },
    {
      module: "reports",
      actions: ["view", "edit", "delete", "create", "export"],
    },
    { module: "settings", actions: ["view", "edit", "delete", "create"] },
  ],
  admin: [
    { module: "dashboard", actions: ["view", "edit", "create"] },
    {
      module: "projects",
      actions: ["view", "edit", "delete", "create", "assign"],
    },
    { module: "clients", actions: ["view", "edit", "delete", "create"] },
    { module: "hr", actions: ["view", "edit", "create"] },
    { module: "financial", actions: ["view", "edit", "create"] },
    {
      module: "meetings",
      actions: ["view", "edit", "delete", "create", "host"],
    },
    { module: "reports", actions: ["view", "edit", "create", "export"] },
    { module: "settings", actions: ["view", "edit"] },
  ],
  manager: [
    { module: "dashboard", actions: ["view"] },
    { module: "projects", actions: ["view", "edit", "create", "assign"] },
    { module: "clients", actions: ["view", "edit", "create"] },
    { module: "hr", actions: ["view", "edit"] },
    { module: "financial", actions: ["view"] },
    { module: "meetings", actions: ["view", "edit", "create", "host"] },
    { module: "reports", actions: ["view", "create"] },
  ],
  field_worker: [
    { module: "dashboard", actions: ["view"] },
    { module: "projects", actions: ["view", "edit"] },
    { module: "meetings", actions: ["view", "create"] },
    { module: "reports", actions: ["view"] },
  ],
  sales_rep: [
    { module: "dashboard", actions: ["view"] },
    { module: "clients", actions: ["view", "edit", "create"] },
    { module: "projects", actions: ["view", "create"] },
    { module: "meetings", actions: ["view", "edit", "create", "host"] },
    { module: "reports", actions: ["view", "create"] },
  ],
  subcontractor: [
    { module: "dashboard", actions: ["view"] },
    { module: "projects", actions: ["view"] },
    { module: "meetings", actions: ["view"] },
  ],
};

const roleDisplayNames: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Administrator",
  manager: "Project Manager",
  field_worker: "Field Worker",
  sales_rep: "Sales Representative",
  subcontractor: "Subcontractor",
};

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [userRole, setUserRoleState] = useState<UserRole>("admin");
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    // In a real app, this would come from the user object or API
    const role = (user?.role as UserRole) || "admin";
    setUserRoleState(role);
    setPermissions(rolePermissions[role] || []);
  }, [user]);

  const hasPermission = (module: string, action: string): boolean => {
    const modulePermission = permissions.find((p) => p.module === module);
    return modulePermission ? modulePermission.actions.includes(action) : false;
  };

  const canAccess = (module: string): boolean => {
    return permissions.some((p) => p.module === module);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    setPermissions(rolePermissions[role] || []);
  };

  const getAllRoles = (): UserRole[] => {
    return Object.keys(rolePermissions) as UserRole[];
  };

  const getRoleDisplayName = (role: UserRole): string => {
    return roleDisplayNames[role] || role;
  };

  const value: RoleContextType = {
    userRole,
    permissions,
    hasPermission,
    canAccess,
    setUserRole,
    getAllRoles,
    getRoleDisplayName,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
