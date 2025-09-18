import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { GTSMarketingTrafficModule } from "./modules/GTSMarketingTrafficModule";
import { GTSCRMWithOmniInbox } from "./modules/GTSCRMWithOmniInbox";
import { GTSAnalyticsEnhanced } from "./modules/GTSAnalyticsEnhanced";
import { GTSAPIIntegrationsModule } from "./modules/GTSAPIIntegrationsModule";
import { GTSCalendarEnhanced } from "./modules/GTSCalendarEnhanced";
import { GTSFinanceCenterModule } from "./modules/GTSFinanceCenterModule";
import { GTSKnowledgeBaseModule } from "./modules/GTSKnowledgeBaseModule";
import { GTSAuditLoggingModule } from "./modules/GTSAuditLoggingModule";
import { GTSStaffManagementModule } from "./modules/GTSStaffManagementModule";
import { GTSPartnersDatabase } from "./modules/GTSPartnersDatabase";
import { GTSCMSContentHub } from "./modules/GTSCMSContentHub";
import { GTSIAMRolesPermissions } from "./modules/GTSIAMRolesPermissions";
import { GTSAIModulesDashboard } from "./GTSAIModulesDashboard";
import { GTSB2BClientPortal } from "../portal/GTSB2BClientPortal";
import { GTSQualityTrendsDashboard } from "./modules/GTSQualityTrendsDashboard";
import { GTSCRMReportsEnhanced } from "./modules/GTSCRMReportsEnhanced";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Building, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Settings, 
  TrendingUp, 
  AlertTriangle,
  UserPlus,
  Clock,
  Star,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Shield,
  Menu,
  LogOut,
  MousePointer,
  Brain,
  CheckCircle
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSExecutivePanelProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

const kpiCards = [
  {
    title: "Общая выручка",
    subtitle: "За текущий месяц",
    value: "₽12,450,000",
    previousValue: "₽10,800,000",
    change: "+15.2%",
    trend: "up" as const,
    icon: DollarSign,
    color: "#2BB673",
    bgGradient: "from-green-500/10 to-green-600/5"
  },
  {
    title: "Активные бронирования",
    subtitle: "Подтвержденных заявок",
    value: "1,247",
    previousValue: "1,149",
    change: "+8.5%",
    trend: "up" as const,
    icon: Calendar,
    color: "#3B82F6",
    bgGradient: "from-blue-500/10 to-blue-600/5"
  },
  {
    title: "Новые клиенты",
    subtitle: "За последние 7 дней",
    value: "342",
    previousValue: "353",
    change: "-3.2%",
    trend: "down" as const,
    icon: UserPlus,
    color: "#F59E0B",
    bgGradient: "from-orange-500/10 to-orange-600/5"
  },
  {
    title: "Загрузка флота",
    subtitle: "Среднее использование",
    value: "87%",
    previousValue: "78%",
    change: "+12.1%",
    trend: "up" as const,
    icon: Activity,
    color: "#8B5CF6",
    bgGradient: "from-purple-500/10 to-purple-600/5"
  },
  {
    title: "AI Эффективность",
    subtitle: "Точность рекомендаций",
    value: "93%",
    previousValue: "91%",
    change: "+2.8%",
    trend: "up" as const,
    icon: Brain,
    color: "#EC4899",
    bgGradient: "from-pink-500/10 to-pink-600/5"
  },
  {
    title: "NPS Score",
    subtitle: "Удовлетворенность клиентов",
    value: "8.7",
    previousValue: "8.2",
    change: "+6.1%",
    trend: "up" as const,
    icon: Star,
    color: "#91040C",
    bgGradient: "from-red-500/10 to-red-600/5"
  }
];

const alerts = [
  {
    id: '1',
    type: 'error' as const,
    category: 'Техника',
    title: 'Критическая неисправность',
    message: 'Вертолет R66 требует немедленного техобслуживания. Обнаружена неисправность двигателя.',
    location: 'Ангар А, стоянка 3',
    time: '2 мин назад',
    urgent: true,
    assignee: 'Техник Петров А.В.',
    actionRequired: 'Немедленная остановка эксплуатации'
  },
  {
    id: '2',
    type: 'warning' as const,
    category: 'Топливо',
    title: 'Низкий уровень топлива',
    message: 'Катер Yamaha FX252 требует дозаправки перед следующим выходом.',
    location: 'Причал Б, место 7',
    time: '8 мин назад',
    urgent: true,
    assignee: 'Механик Иванов С.М.',
    actionRequired: 'Заправка до 14:00'
  },
  {
    id: '3',
    type: 'success' as const,
    category: 'Бронирование',
    title: 'VIP бронирование подтверждено',
    message: 'Клиент Александров забронировал эксклюзивный тур на 3 дня с полным сервисом.',
    location: 'Пентхаус отель "Radisson"',
    time: '15 мин назад',
    urgent: false,
    assignee: 'Менеджер Смирнова К.А.',
    actionRequired: 'Подготовка VIP программы'
  }
];

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Главная панель с аналитикой',
    icon: BarChart3,
    active: true
  },
  {
    id: 'crm-reports',
    name: 'CRM Reports',
    description: 'Отчёты по продажам и конверсиям',
    icon: Target,
    active: false
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Трафик и маркетинг',
    icon: MousePointer,
    active: false
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Расширенная аналитика',
    icon: Activity,
    active: false
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'API и автоматизация',
    icon: Target,
    active: false
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Умный календарь',
    icon: Calendar,
    active: false
  },
  {
    id: 'crm',
    name: 'CRM',
    description: 'Управление клиентами',
    icon: Users,
    active: false
  },
  {
    id: 'partners',
    name: 'Partners',
    description: 'Партнеры и агенты',
    icon: Building,
    active: false
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Управление персоналом',
    icon: Users,
    active: false
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Финансовые отчеты',
    icon: DollarSign,
    active: false
  },
  {
    id: 'knowledge',
    name: 'Knowledge Base',
    description: 'База знаний и документация',
    icon: FileText,
    active: false
  },
  {
    id: 'cms',
    name: 'CMS',
    description: 'Управление контентом',
    icon: Globe,
    active: false
  },
  {
    id: 'iam',
    name: 'IAM',
    description: 'Права доступа',
    icon: Shield,
    active: false
  },
  {
    id: 'ai',
    name: 'AI Modules',
    description: 'Искусственный интеллект',
    icon: Brain,
    active: false
  },
  {
    id: 'audit',
    name: 'Audit & Logs',
    description: 'Аудит системы и логирование',
    icon: Activity,
    active: false
  },
  {
    id: 'quality',
    name: 'Quality & Trends',
    description: 'Качество обслуживания и тренды',
    icon: TrendingUp,
    active: false
  },
  {
    id: 'b2b-portal',
    name: 'B2B Client Portal',
    description: 'Корпоративные клиенты',
    icon: Building,
    active: false
  }
];

export function GTSExecutivePanel({ user, onLogout, onBackToHome }: GTSExecutivePanelProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex dark">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GTS</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-foreground font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  Executive
                </h1>
                <p className="text-xs text-muted-foreground">Панель управления</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {modules.map((module) => {
              const IconComponent = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-accent text-white' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <div className="text-left">
                      <div className="font-medium">{module.name}</div>
                      <div className="text-xs opacity-75">{module.description}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Menu */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user.name[0]}</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="text-foreground text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToHome}
                className="flex-1"
              >
                Главная
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Unified Admin Header */}
        <GTSUnifiedAdminHeader
          user={user}
          currentRole="Руководитель"
          currentPage={modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
          notificationCount={3}
          onSearch={(query) => console.log('Search:', query)}
          onLogin={() => console.log('Login clicked')}
          onLogout={onLogout}
          onBackToHome={onBackToHome}
        />
        
        {/* Mobile Toggle Button */}
        <div className="bg-card border-b border-border p-4 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5 mr-2" />
            Меню
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Dashboard */}
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="gts-heading-1 mb-2">Executive Dashboard</h1>
                  <p className="gts-caption-text">Комплексный обзор деятельности Grand Tour Sochi</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                    <Activity className="w-3 h-3 mr-1" />
                    Система в норме
                  </Badge>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Экспорт отчета
                  </Button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpiCards.map((kpi, index) => {
                  const IconComponent = kpi.icon;
                  return (
                    <Card key={index} className="group hover:border-accent/50 transition-colors">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-foreground text-sm">{kpi.title}</h3>
                              {kpi.trend === 'up' ? (
                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 text-red-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                          </div>
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.bgGradient} flex items-center justify-center`}>
                            <IconComponent className="w-5 h-5" style={{ color: kpi.color }} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--gts-font-heading)' }}>
                            {kpi.value}
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {kpi.change}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              от {kpi.previousValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Alerts Panel */}
              <Card className="overflow-hidden">
                <div className="border-b border-border bg-card">
                  <div className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <h2 className="gts-heading-2">Системные уведомления</h2>
                      <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {alerts.filter(a => a.urgent).length} критических
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Настроить
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`border-b border-border last:border-b-0 p-6 hover:bg-secondary/50 transition-colors ${
                        alert.urgent ? 'bg-red-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          alert.type === 'error' ? 'bg-red-500/10' :
                          alert.type === 'warning' ? 'bg-yellow-500/10' :
                          alert.type === 'success' ? 'bg-green-500/10' :
                          'bg-blue-500/10'
                        }`}>
                          {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                          {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                          {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {alert.category}
                              </Badge>
                              <h3 className="font-medium text-foreground">{alert.title}</h3>
                              {alert.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  Критично
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {alert.time}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* CRM Reports Module */}
          {activeModule === 'crm-reports' && (
            <GTSCRMReportsEnhanced
              onBack={() => setActiveModule('dashboard')}
            />
          )}

          {/* CRM Module */}
          {activeModule === 'crm' && (
            <GTSCRMWithOmniInbox
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Quality & Trends Module */}
          {activeModule === 'quality' && (
            <GTSQualityTrendsDashboard />
          )}

          {/* Marketing Module */}
          {activeModule === 'marketing' && (
            <GTSMarketingTrafficModule />
          )}

          {/* Analytics Module */}
          {activeModule === 'analytics' && (
            <GTSAnalyticsEnhanced onBack={() => setActiveModule('dashboard')} />
          )}

          {/* Integrations Module */}
          {activeModule === 'integrations' && (
            <GTSAPIIntegrationsModule />
          )}

          {/* Calendar Module */}
          {activeModule === 'calendar' && (
            <GTSCalendarEnhanced />
          )}

          {/* Finance Module */}
          {activeModule === 'finance' && (
            <GTSFinanceCenterModule />
          )}

          {/* Knowledge Base Module */}
          {activeModule === 'knowledge' && (
            <GTSKnowledgeBaseModule />
          )}

          {/* Audit Module */}
          {activeModule === 'audit' && (
            <GTSAuditLoggingModule />
          )}

          {/* Staff Module */}
          {activeModule === 'staff' && (
            <GTSStaffManagementModule />
          )}

          {/* Partners Module */}
          {activeModule === 'partners' && (
            <GTSPartnersDatabase />
          )}

          {/* CMS Module */}
          {activeModule === 'cms' && (
            <GTSCMSContentHub />
          )}

          {/* IAM Module */}
          {activeModule === 'iam' && (
            <GTSIAMRolesPermissions />
          )}

          {/* AI Modules */}
          {activeModule === 'ai' && (
            <GTSAIModulesDashboard />
          )}

          {/* B2B Portal */}
          {activeModule === 'b2b-portal' && (
            <GTSB2BClientPortal />
          )}
        </div>
      </div>
    </div>
  );
}