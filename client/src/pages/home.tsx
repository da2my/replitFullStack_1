import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Box,
  Github,
  Rocket,
  Play,
  Book,
  Download,
  ExternalLink,
  PuzzleIcon,
  Bolt,
  Code,
  FolderSync,
  Share,
  Shield,
  TrendingUp,
  Hammer,
  TestTube,
  Settings,
  Twitter,
  MessageCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between" data-testid="header-navigation">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Box className="text-primary-foreground w-4 h-4" />
              </div>
              <span className="text-xl font-bold" data-testid="text-logo">MonoRepo</span>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              <a href="#overview" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-overview">
                Overview
              </a>
              <a href="#packages" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-packages">
                Packages
              </a>
              <a href="#getting-started" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-getting-started">
                Getting Started
              </a>
              <a href="#scripts" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-scripts">
                Scripts
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm" className="hidden md:flex items-center space-x-2" data-testid="button-github">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" data-testid="button-menu">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge variant="outline" className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20 mb-4" data-testid="badge-unified-platform">
              <Rocket className="w-4 h-4 mr-2" />
              Unified Development Platform
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" data-testid="heading-hero">
            One Repository,<br />
            <span className="text-primary">Three Applications</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Centralized monorepo for React web frontend, React Native mobile app, and FastAPI backend. 
            Shared utilities, consistent development experience, and streamlined deployment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3" data-testid="button-get-started">
              <Download className="w-4 h-4 mr-2" />
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3" data-testid="button-documentation">
              <Book className="w-4 h-4 mr-2" />
              Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Project Structure Overview */}
      <section id="overview" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-project-structure">Project Structure</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4" data-testid="heading-workspace-organization">Workspace Organization</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-workspace-description">
                Our monorepo follows a clean workspace structure using npm workspaces, enabling 
                efficient package management and cross-project dependencies.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3" data-testid="item-shared-utilities">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <span>Shared utilities and components</span>
                </li>
                <li className="flex items-center space-x-3" data-testid="item-unified-scripts">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Unified development scripts</span>
                </li>
                <li className="flex items-center space-x-3" data-testid="item-cross-package-imports">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <span>Cross-package imports</span>
                </li>
                <li className="flex items-center space-x-3" data-testid="item-consistent-tooling">
                  <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                  <span>Consistent tooling configuration</span>
                </li>
              </ul>
            </div>
            <Card className="bg-secondary border-border code-block">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium" data-testid="text-directory-structure">Directory Structure</span>
                  <Code className="w-4 h-4 text-muted-foreground" />
                </div>
                <pre className="text-sm font-mono leading-relaxed overflow-x-auto" data-testid="code-directory-tree">
                  <code>
                    <span className="syntax-comment">├── packages/</span><br />
                    <span className="syntax-comment">│   ├── web/</span>          <span className="syntax-comment"># React frontend</span><br />
                    <span className="syntax-comment">│   ├── mobile/</span>       <span className="syntax-comment"># React Native app</span><br />
                    <span className="syntax-comment">│   ├── backend/</span>      <span className="syntax-comment"># FastAPI server</span><br />
                    <span className="syntax-comment">│   └── shared/</span>       <span className="syntax-comment"># Common utilities</span><br />
                    <span className="syntax-comment">├── package.json</span>      <span className="syntax-comment"># Root workspace config</span><br />
                    <span className="syntax-comment">├── tsconfig.json</span>     <span className="syntax-comment"># Shared TypeScript config</span><br />
                    <span className="syntax-comment">└── README.md</span>         <span className="syntax-comment"># Documentation</span>
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section id="packages" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-application-packages">Application Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Web Package Card */}
            <Card className="hover:border-primary/50 transition-colors" data-testid="card-web-frontend">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-chart-1/20 rounded-lg flex items-center justify-center">
                    <Code className="text-chart-1 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold" data-testid="heading-web-frontend">Web Frontend</h3>
                    <span className="text-sm text-muted-foreground" data-testid="text-web-tech-stack">React + TypeScript</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid="text-web-description">
                  Modern React application with TypeScript, Vite for fast builds, and shared component library.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-chart-1/10 text-chart-1" data-testid="badge-react">React 18</Badge>
                  <Badge variant="secondary" className="bg-chart-1/10 text-chart-1" data-testid="badge-typescript">TypeScript</Badge>
                  <Badge variant="secondary" className="bg-chart-1/10 text-chart-1" data-testid="badge-vite">Vite</Badge>
                </div>
                <Button variant="secondary" className="w-full" data-testid="button-view-web-package">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Package
                </Button>
              </CardContent>
            </Card>

            {/* Mobile Package Card */}
            <Card className="hover:border-primary/50 transition-colors" data-testid="card-mobile-app">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-chart-2/20 rounded-lg flex items-center justify-center">
                    <span className="text-chart-2 text-lg">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold" data-testid="heading-mobile-app">Mobile App</h3>
                    <span className="text-sm text-muted-foreground" data-testid="text-mobile-tech-stack">React Native + Expo</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid="text-mobile-description">
                  Cross-platform mobile application using React Native and Expo for iOS and Android deployment.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-chart-2/10 text-chart-2" data-testid="badge-react-native">React Native</Badge>
                  <Badge variant="secondary" className="bg-chart-2/10 text-chart-2" data-testid="badge-expo">Expo</Badge>
                  <Badge variant="secondary" className="bg-chart-2/10 text-chart-2" data-testid="badge-mobile-typescript">TypeScript</Badge>
                </div>
                <Button variant="secondary" className="w-full" data-testid="button-view-mobile-package">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Package
                </Button>
              </CardContent>
            </Card>

            {/* Backend Package Card */}
            <Card className="hover:border-primary/50 transition-colors" data-testid="card-backend-api">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-chart-3/20 rounded-lg flex items-center justify-center">
                    <span className="text-chart-3 text-lg">🖥️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold" data-testid="heading-backend-api">Backend API</h3>
                    <span className="text-sm text-muted-foreground" data-testid="text-backend-tech-stack">FastAPI + Python</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid="text-backend-description">
                  High-performance Python API with FastAPI, automatic documentation, and async support.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3" data-testid="badge-fastapi">FastAPI</Badge>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3" data-testid="badge-python">Python 3.11+</Badge>
                  <Badge variant="secondary" className="bg-chart-3/10 text-chart-3" data-testid="badge-uvicorn">Uvicorn</Badge>
                </div>
                <Button variant="secondary" className="w-full" data-testid="button-view-backend-package">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shared Utilities Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-shared-utilities">Shared Utilities</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6" data-testid="heading-common-components">Common Components & Utils</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4" data-testid="item-ui-components">
                  <div className="w-8 h-8 bg-chart-4/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <PuzzleIcon className="text-chart-4 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-ui-components">UI Components</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-ui-components-description">Reusable React components that work across web and mobile platforms with consistent styling.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4" data-testid="item-utility-functions">
                  <div className="w-8 h-8 bg-chart-5/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Bolt className="text-chart-5 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-utility-functions">Utility Functions</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-utility-functions-description">Common helper functions for data validation, formatting, and business logic shared across packages.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4" data-testid="item-type-definitions">
                  <div className="w-8 h-8 bg-chart-1/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Code className="text-chart-1 w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-type-definitions">Type Definitions</h4>
                    <p className="text-sm text-muted-foreground" data-testid="text-type-definitions-description">TypeScript interfaces and types ensuring consistency across frontend and backend implementations.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="bg-secondary border-border code-block">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium" data-testid="text-package-import-example">Package Import Example</span>
                  <Code className="w-4 h-4 text-muted-foreground" />
                </div>
                <pre className="text-sm font-mono leading-relaxed overflow-x-auto" data-testid="code-import-examples">
                  <code>
                    <span className="syntax-comment">// In web package</span><br />
                    <span className="syntax-keyword">import</span> <span className="syntax-operator">{'{'}</span> <span className="syntax-string">Button</span><span className="syntax-operator">,</span> <span className="syntax-string">formatDate</span> <span className="syntax-operator">{'}'}</span> <span className="syntax-keyword">from</span> <span className="syntax-string">'@monorepo/shared'</span><span className="syntax-operator">;</span><br /><br />
                    <span className="syntax-comment">// In mobile package</span><br />
                    <span className="syntax-keyword">import</span> <span className="syntax-operator">{'{'}</span> <span className="syntax-string">validateEmail</span> <span className="syntax-operator">{'}'}</span> <span className="syntax-keyword">from</span> <span className="syntax-string">'@monorepo/shared/utils'</span><span className="syntax-operator">;</span><br /><br />
                    <span className="syntax-comment">// Type definitions</span><br />
                    <span className="syntax-keyword">import</span> <span className="syntax-keyword">type</span> <span className="syntax-operator">{'{'}</span> <span className="syntax-string">User</span><span className="syntax-operator">,</span> <span className="syntax-string">ApiResponse</span> <span className="syntax-operator">{'}'}</span> <span className="syntax-keyword">from</span> <span className="syntax-string">'@monorepo/shared/types'</span><span className="syntax-operator">;</span>
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-getting-started">Getting Started</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6" data-testid="heading-installation-setup">Installation & Setup</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4" data-testid="step-clone-repository">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-primary font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-clone-repository">Clone Repository</h4>
                    <p className="text-sm text-muted-foreground mb-3" data-testid="text-clone-repository-description">Get the latest version of the monorepo from GitHub.</p>
                    <Card className="bg-secondary border-border code-block">
                      <CardContent className="p-3">
                        <code className="text-sm font-mono" data-testid="code-git-clone">git clone https://github.com/your-org/monorepo.git</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-start space-x-4" data-testid="step-install-dependencies">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-primary font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-install-dependencies">Install Dependencies</h4>
                    <p className="text-sm text-muted-foreground mb-3" data-testid="text-install-dependencies-description">NPM workspaces will install all package dependencies.</p>
                    <Card className="bg-secondary border-border code-block">
                      <CardContent className="p-3">
                        <code className="text-sm font-mono" data-testid="code-npm-install">npm install</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-start space-x-4" data-testid="step-start-development">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-primary font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-2" data-testid="heading-start-development">Start Development</h4>
                    <p className="text-sm text-muted-foreground mb-3" data-testid="text-start-development-description">Run all packages in development mode simultaneously.</p>
                    <Card className="bg-secondary border-border code-block">
                      <CardContent className="p-3">
                        <code className="text-sm font-mono" data-testid="code-npm-run-dev">npm run dev</code>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6" data-testid="heading-workspace-configuration">Workspace Configuration</h3>
              <Card className="bg-secondary border-border code-block">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium" data-testid="text-package-json">package.json</span>
                    <Code className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <pre className="text-sm font-mono leading-relaxed overflow-x-auto" data-testid="code-workspace-config">
                    <code>
                      <span className="syntax-operator">{'{'}</span><br />
                      &nbsp;&nbsp;<span className="syntax-string">"name"</span><span className="syntax-operator">:</span> <span className="syntax-string">"@monorepo/root"</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;<span className="syntax-string">"private"</span><span className="syntax-operator">:</span> <span className="syntax-keyword">true</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;<span className="syntax-string">"workspaces"</span><span className="syntax-operator">:</span> <span className="syntax-operator">[</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"packages/*"</span><br />
                      &nbsp;&nbsp;<span className="syntax-operator">],</span><br />
                      &nbsp;&nbsp;<span className="syntax-string">"scripts"</span><span className="syntax-operator">:</span> <span className="syntax-operator">{'{'}</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"dev"</span><span className="syntax-operator">:</span> <span className="syntax-string">"concurrently npm:dev:*"</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"dev:web"</span><span className="syntax-operator">:</span> <span className="syntax-string">"npm run dev -w web"</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"dev:mobile"</span><span className="syntax-operator">:</span> <span className="syntax-string">"npm run dev -w mobile"</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"dev:backend"</span><span className="syntax-operator">:</span> <span className="syntax-string">"npm run dev -w backend"</span><span className="syntax-operator">,</span><br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"build"</span><span className="syntax-operator">:</span> <span className="syntax-string">"npm run build --workspaces"</span><br />
                      &nbsp;&nbsp;<span className="syntax-operator">{'}'}</span><br />
                      <span className="syntax-operator">{'}'}</span>
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Development Scripts Section */}
      <section id="scripts" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-development-scripts">Development Scripts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="bg-background border-border" data-testid="card-development-scripts">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-chart-1/20 rounded-lg flex items-center justify-center">
                    <Play className="text-chart-1 w-4 h-4" />
                  </div>
                  <span className="font-medium" data-testid="heading-development">Development</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" data-testid="script-npm-run-dev">
                    <code className="font-mono text-xs">npm run dev</code>
                    <span className="text-muted-foreground">All packages</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-dev-web">
                    <code className="font-mono text-xs">npm run dev:web</code>
                    <span className="text-muted-foreground">Web only</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-dev-mobile">
                    <code className="font-mono text-xs">npm run dev:mobile</code>
                    <span className="text-muted-foreground">Mobile only</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-dev-api">
                    <code className="font-mono text-xs">npm run dev:api</code>
                    <span className="text-muted-foreground">Backend only</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border" data-testid="card-build-scripts">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-chart-2/20 rounded-lg flex items-center justify-center">
                    <Hammer className="text-chart-2 w-4 h-4" />
                  </div>
                  <span className="font-medium" data-testid="heading-build">Build</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" data-testid="script-npm-run-build">
                    <code className="font-mono text-xs">npm run build</code>
                    <span className="text-muted-foreground">All packages</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-build-web">
                    <code className="font-mono text-xs">npm run build:web</code>
                    <span className="text-muted-foreground">Web bundle</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-build-mobile">
                    <code className="font-mono text-xs">npm run build:mobile</code>
                    <span className="text-muted-foreground">Mobile bundle</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-build-shared">
                    <code className="font-mono text-xs">npm run build:shared</code>
                    <span className="text-muted-foreground">Shared library</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border" data-testid="card-testing-scripts">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-chart-3/20 rounded-lg flex items-center justify-center">
                    <TestTube className="text-chart-3 w-4 h-4" />
                  </div>
                  <span className="font-medium" data-testid="heading-testing">Testing</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" data-testid="script-npm-test">
                    <code className="font-mono text-xs">npm test</code>
                    <span className="text-muted-foreground">All tests</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-test-web">
                    <code className="font-mono text-xs">npm run test:web</code>
                    <span className="text-muted-foreground">Web tests</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-test-api">
                    <code className="font-mono text-xs">npm run test:api</code>
                    <span className="text-muted-foreground">API tests</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-test-e2e">
                    <code className="font-mono text-xs">npm run test:e2e</code>
                    <span className="text-muted-foreground">End-to-end</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border" data-testid="card-utility-scripts">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-chart-4/20 rounded-lg flex items-center justify-center">
                    <Settings className="text-chart-4 w-4 h-4" />
                  </div>
                  <span className="font-medium" data-testid="heading-utilities">Utilities</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" data-testid="script-npm-run-lint">
                    <code className="font-mono text-xs">npm run lint</code>
                    <span className="text-muted-foreground">Code quality</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-format">
                    <code className="font-mono text-xs">npm run format</code>
                    <span className="text-muted-foreground">Code format</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-clean">
                    <code className="font-mono text-xs">npm run clean</code>
                    <span className="text-muted-foreground">Clean builds</span>
                  </div>
                  <div className="flex justify-between" data-testid="script-npm-run-docs">
                    <code className="font-mono text-xs">npm run docs</code>
                    <span className="text-muted-foreground">Generate docs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center" data-testid="heading-key-features">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="text-center" data-testid="feature-synchronized-development">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FolderSync className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-synchronized-development">Synchronized Development</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-synchronized-development-description">
                Run all applications simultaneously with hot reloading and shared dependency management.
              </p>
            </div>

            <div className="text-center" data-testid="feature-code-sharing">
              <div className="w-16 h-16 bg-chart-2/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share className="text-chart-2 w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-code-sharing">Code Sharing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-code-sharing-description">
                Reuse components, utilities, and types across web, mobile, and backend applications.
              </p>
            </div>

            <div className="text-center" data-testid="feature-fast-setup">
              <div className="w-16 h-16 bg-chart-3/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-chart-3 w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-fast-setup">Fast Setup</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-fast-setup-description">
                Get started quickly with pre-configured tooling, scripts, and development environment.
              </p>
            </div>

            <div className="text-center" data-testid="feature-type-safety">
              <div className="w-16 h-16 bg-chart-4/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-chart-4 w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-type-safety">Type Safety</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-type-safety-description">
                End-to-end TypeScript support with shared type definitions across all packages.
              </p>
            </div>

            <div className="text-center" data-testid="feature-performance">
              <div className="w-16 h-16 bg-chart-5/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-chart-5 w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-performance">Performance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-performance-description">
                Optimized build processes and efficient dependency management for faster development.
              </p>
            </div>

            <div className="text-center" data-testid="feature-developer-tools">
              <div className="w-16 h-16 bg-chart-1/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bolt className="text-chart-1 w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-3" data-testid="heading-developer-tools">Developer Bolt</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-developer-tools-description">
                Integrated linting, formatting, testing, and documentation tools for consistent code quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4" data-testid="footer">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4" data-testid="footer-logo">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Box className="text-primary-foreground w-4 h-4" />
                </div>
                <span className="text-xl font-bold" data-testid="text-footer-logo">MonoRepo</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid="text-footer-description">
                Unified development platform for React web, React Native mobile, and FastAPI backend applications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-github">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-discord">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-documentation">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-getting-started-footer">Getting Started</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-api-reference">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-examples">Examples</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-deployment">Deployment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-community">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-github-issues">GitHub Issues</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-discussions">Discussions</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-contributing">Contributing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-license">License</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground" data-testid="text-copyright">
            <p>&copy; 2024 MonoRepo. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
