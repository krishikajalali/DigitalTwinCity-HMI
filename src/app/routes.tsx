import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/main-layout";
import { Dashboard } from "./pages/dashboard";
import { CityView3D } from "./pages/city-view-3d";
import { LiveMapLayers } from "./pages/live-map-layers";
import { PolicySimulator } from "./pages/policy-simulator";
import { ScenarioManager } from "./pages/scenario-manager";
import { PredictiveAnalytics } from "./pages/predictive-analytics";
import { TrafficSystems } from "./pages/traffic-systems";
import { EnvironmentalData } from "./pages/environmental-data";
import { InfrastructureHealth } from "./pages/infrastructure-health";
import { EmergencyAlerts } from "./pages/emergency-alerts";
import { CitizenFeedback } from "./pages/citizen-feedback";
import { PublicSentiment } from "./pages/public-sentiment";
import { ServiceRequests } from "./pages/service-requests";
import { DataSources } from "./pages/data-sources";
import { Reports } from "./pages/reports";
import { UserRoles } from "./pages/user-roles";
import { MenuLayouts } from "./pages/menu-layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "3d-view", Component: CityView3D },
      { path: "map-layers", Component: LiveMapLayers },
      { path: "policy-simulator", Component: PolicySimulator },
      { path: "scenario-manager", Component: ScenarioManager },
      { path: "predictive-analytics", Component: PredictiveAnalytics },
      { path: "traffic-systems", Component: TrafficSystems },
      { path: "environmental-data", Component: EnvironmentalData },
      { path: "infrastructure-health", Component: InfrastructureHealth },
      { path: "emergency-alerts", Component: EmergencyAlerts },
      { path: "citizen-feedback", Component: CitizenFeedback },
      { path: "public-sentiment", Component: PublicSentiment },
      { path: "service-requests", Component: ServiceRequests },
      { path: "data-sources", Component: DataSources },
      { path: "reports", Component: Reports },
      { path: "user-roles", Component: UserRoles },
      { path: "menus", Component: MenuLayouts },
    ],
  },
]);
