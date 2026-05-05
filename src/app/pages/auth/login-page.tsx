import { useState } from "react";
import {
  Shield,
  Building2,
  ChevronRight,
  Eye,
  EyeOff,
  Zap,
  Users,
  MapPin,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { useAuth, UserRole } from "../../context/auth-context";

const PRESETS = [
  {
    role: "authority" as UserRole,
    label: "City Authority",
    sublabel: "Admin & Operations",
    defaultName: "City Admin",
    defaultEmail: "admin@citydigitaltwin.gov",
    icon: Shield,
    accentColor: "var(--dt-purple)",
    accentBg: "rgba(184, 78, 255, 0.12)",
    accentBorder: "rgba(184, 78, 255, 0.4)",
    badge: "AUTHORITY",
    badgeBg: "rgba(184, 78, 255, 0.2)",
    description:
      "Full platform access — manage city operations, send alerts to citizens, and configure infrastructure.",
    features: [
      "Send Alerts to Citizens",
      "User & Role Management",
      "Data Sources & Reports",
      "Predictive Analytics & Simulations",
    ],
    avatar: "CA",
  },
  {
    role: "citizen" as UserRole,
    label: "Citizen",
    sublabel: "Public Portal",
    defaultName: "Resident",
    defaultEmail: "citizen@city.in",
    icon: Building2,
    accentColor: "var(--dt-cyan)",
    accentBg: "rgba(0, 240, 255, 0.1)",
    accentBorder: "rgba(0, 240, 255, 0.35)",
    badge: "CITIZEN",
    badgeBg: "rgba(0, 240, 255, 0.15)",
    description:
      "Access public city dashboards — live maps, air quality, emergency alerts, and service requests.",
    features: [
      "Live Map & 3D City View",
      "Emergency Alerts (read-only)",
      "Submit Feedback & Requests",
      "Public Sentiment Tracker",
    ],
    avatar: "RD",
  },
];

type AuthTab = "signin" | "signup";

export function LoginPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState<AuthTab>("signin");
  const [selectedPreset, setSelectedPreset] = useState<
    (typeof PRESETS)[0] | null
  >(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [entering, setEntering] = useState(false);

  const handlePresetSelect = (preset: (typeof PRESETS)[0]) => {
    setSelectedPreset(preset);
    setName(preset.defaultName);
    setEmail(preset.defaultEmail);
  };

  const handleEnter = () => {
    if (!selectedPreset) return;
    setEntering(true);
    setTimeout(() => {
      login({
        name: name || selectedPreset.defaultName,
        role: selectedPreset.role,
        avatar: selectedPreset.avatar,
      });
    }, 600);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden flex"
      style={{ backgroundColor: "var(--dt-bg-primary)" }}
    >
      {/* Left Panel — Branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[46%] p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0e27 0%, #0f1629 40%, #1a0a2e 100%)",
          borderRight: "1px solid rgba(184, 78, 255, 0.15)",
        }}
      >
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184,78,255,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--dt-cyan), var(--dt-purple))",
              }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div
                className="text-lg text-white font-bold"
                // style={{ color: "var(--dt-text-primary)" }}
              >
                DigitalTwin
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--dt-cyan)" }}
              >
                City HMI
              </div>
            </div>
          </div>
        </div>

        {/* Center copy */}
        <div className="relative z-10">
          <h1
            className="text-5xl text-white font-bold leading-tight mb-6"
            // style={{ color: "var(--dt-text-primary)" }}
          >
            The City's{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--dt-cyan), var(--dt-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Digital Brain
            </span>
          </h1>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "var(--dt-text-secondary)" }}
          >
            Real-time intelligence for smarter urban management. Monitor,
            simulate, and respond — all from one command center.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: MapPin, label: "12 City Zones", color: "var(--dt-cyan)" },
              { icon: Users, label: "248 Users", color: "var(--dt-purple)" },
              {
                icon: BarChart3,
                label: "2.4M Data Points",
                color: "var(--dt-lime)",
              },
              {
                icon: AlertCircle,
                label: "Live Alerts",
                color: "var(--dt-amber)",
              },
            ].map((stat) => {
              const I = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: stat.color,
                  }}
                >
                  <I className="w-3.5 h-3.5" />
                  {stat.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom legal */}
        <div
          className="relative z-10 text-white text-xs"
          // style={{ color: "var(--dt-text-muted)" }}
        >
          © 2026 DigitalTwin City HMI — Prototype
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--dt-cyan), var(--dt-purple))",
              }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--dt-text-primary)" }}
            >
              DigitalTwin City HMI
            </span>
          </div>

          {/* Tab switcher */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {(["signin", "signup"] as AuthTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-smooth"
                style={
                  tab === t
                    ? {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "var(--dt-text-primary)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                      }
                    : { color: "var(--dt-text-muted)" }
                }
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: "var(--dt-text-primary)" }}
          >
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h2>
          <p
            className="text-sm mb-8"
            style={{ color: "var(--dt-text-secondary)" }}
          >
            {tab === "signin"
              ? "Select your role preset or enter credentials."
              : "Choose a role to get started with the platform."}
          </p>

          {/* Role Presets */}
          <p
            className="text-xs uppercase tracking-widest mb-3 font-semibold"
            style={{ color: "var(--dt-text-muted)" }}
          >
            Select Role Preset
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isSelected = selectedPreset?.role === preset.role;
              return (
                <button
                  key={preset.role}
                  onClick={() => handlePresetSelect(preset)}
                  className="text-left p-4 rounded-xl transition-smooth hover:scale-[1.02] relative"
                  style={{
                    backgroundColor: isSelected
                      ? preset.accentBg
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSelected ? preset.accentBorder : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isSelected
                      ? `0 0 16px ${preset.accentBg}`
                      : "none",
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                  )}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: preset.accentBg }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: preset.accentColor }}
                    />
                  </div>
                  <div
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--dt-text-primary)" }}
                  >
                    {preset.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--dt-text-muted)" }}
                  >
                    {preset.sublabel}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preset detail card */}
          {selectedPreset && (
            <div
              className="rounded-xl p-4 mb-6"
              style={{
                backgroundColor: selectedPreset.accentBg,
                border: `1px solid ${selectedPreset.accentBorder}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: selectedPreset.badgeBg,
                    color: selectedPreset.accentColor,
                  }}
                >
                  {selectedPreset.badge}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--dt-text-primary)" }}
                >
                  {selectedPreset.label}
                </span>
              </div>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--dt-text-secondary)" }}
              >
                {selectedPreset.description}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {selectedPreset.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: "var(--dt-text-secondary)" }}
                  >
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: selectedPreset.accentColor }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4 mb-6">
            {tab === "signup" && (
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "var(--dt-text-secondary)" }}
                >
                  Display Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-smooth"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--dt-text-primary)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,240,255,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
            )}
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--dt-text-secondary)" }}
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@city.gov"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-smooth"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--dt-text-primary)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(0,240,255,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--dt-text-secondary)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-smooth"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--dt-text-primary)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(0,240,255,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: "var(--dt-text-muted)" }}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enter button */}
          <button
            onClick={handleEnter}
            disabled={!selectedPreset || entering}
            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-smooth flex items-center justify-center gap-2"
            style={
              selectedPreset && !entering
                ? {
                    background: `linear-gradient(135deg, ${selectedPreset.accentColor}, ${selectedPreset.role === "authority" ? "var(--dt-cyan)" : "var(--dt-purple)"})`,
                    color:
                      selectedPreset.role === "authority"
                        ? "white"
                        : "var(--dt-bg-primary)",
                    boxShadow: `0 4px 20px ${selectedPreset.accentBg}`,
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "var(--dt-text-muted)",
                    cursor: "not-allowed",
                  }
            }
          >
            {entering ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                  style={{
                    borderColor: "currentColor",
                    borderTopColor: "transparent",
                  }}
                />
                Entering City Twin...
              </>
            ) : (
              <>
                Enter City Twin
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p
            className="text-center text-xs mt-4"
            style={{ color: "var(--dt-text-muted)" }}
          >
            This is a UI prototype — no real authentication
          </p>
        </div>
      </div>
    </div>
  );
}
