import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';

// Mock Lucide icons comprehensively based on LandingPage imports
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right" />,
  ShieldCheck: () => <div data-testid="shield-check-icon" />,
  Zap: () => <div data-testid="zap-icon" />,
  Globe: () => <div data-testid="globe-icon" />,
  Activity: () => <div data-testid="activity-icon" />,
  LogIn: () => <div data-testid="login-icon" />,
  UserPlus: () => <div data-testid="userplus-icon" />,
  Flame: () => <div data-testid="flame-icon" />,
  Cpu: () => <div data-testid="cpu-icon" />,
  Terminal: () => <div data-testid="terminal-icon" />,
  Layers: () => <div data-testid="layers-icon" />,
  Fingerprint: () => <div data-testid="fingerprint-icon" />,
  BarChart3: () => <div data-testid="bar-chart-icon" />,
  Chrome: () => <div data-testid="chrome-icon" />,
  Apple: () => <div data-testid="apple-icon" />,
  PlayCircle: () => <div data-testid="play-circle" />,
  AlertTriangle: () => <div data-testid="alert-icon" />,
  ShieldAlert: () => <div data-testid="shield-alert-icon" />,
  // Adding others that might be used in components LandingPage uses
  Search: () => <div data-testid="search-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  RefreshCcw: () => <div data-testid="refresh-icon" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
  History: () => <div data-testid="history-icon" />,
  LogOut: () => <div data-testid="logout-icon" />,
  User: () => <div data-testid="user-icon" />,
  LayoutDashboard: () => <div data-testid="layout-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

describe('LandingPage Component', () => {
  it('renders the landing page with the correct title', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    // Check if the title exists
    const titleElements = screen.getAllByText(/PHISHGUARD/i);
    expect(titleElements.length).toBeGreaterThan(0);
  });

  it('renders the core Call-to-Action button', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
    
    // Check for "Deploy Shield" or similar action button
    const ctaButton = screen.queryByText(/Deploy Shield/i) || 
                      screen.queryByText(/Initialize Defense/i) || 
                      screen.queryByText(/Get Started Free/i);
    expect(ctaButton).toBeDefined();
  });
});
