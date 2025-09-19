// 🎯 GTS Executive Panel v2025-09-17 - Полное соответствие чек-листу модулей
import React, { useState, useMemo } from "react";
import { GTSBookingsModule } from "./modules/GTSBookingsModule";
import { GTSDispatchModule } from "./modules/GTSDispatchModule";
import { GTSRoutesSchedulesModule } from "./modules/GTSRoutesSchedulesModule";
import { GTSFleetMaintenanceModule } from "./modules/GTSFleetMaintenanceModule";
import { GTSInventoryPartsModule } from "./modules/GTSInventoryPartsModule";
import { GTSPricingOffersModule } from "./modules/GTSPricingOffersModule";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem,
  DropdownMenuSeparator 
} from "../ui/dropdown-menu";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  // Core Icons
  BarChart3, Calendar, Users, Building2, DollarSign, FileText, MessageSquare, 
  Settings, TrendingUp, AlertTriangle, Clock, Star, Target, ArrowUpRight, 
  Activity, Globe, Shield, Menu, LogOut, Brain, CheckCircle, Bell,
  
  // Module Icons по чек-листу
  Package, // Bookings
  Radio, // Dispatch  
  Route, // Routes & Schedules
  Truck, // Fleet & Maintenance
  Archive, // Inventory & Parts
  Tag, // Pricing & Offers
  Heart, // CRM & Loyalty
  Megaphone, // Sales Channels
  Image, // Content/Media
  CreditCard, // Finance & Billing
  UserCheck, // HR & Scheduling
  FileCheck, // Compliance/Docs
  PieChart, // Analytics
  Zap, // Settings & Integrations
  Headphones, // Notifications / Support
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download,
  Edit3, Copy, Trash2, Eye, EyeOff, Refresh
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

// 🎯 15 МОДУЛЕЙ СОГЛАСНО ЧЕК-ЛИСТУ v2025-09-17
const MODULE_CONFIGS = [
  {
    id: 'bookings',
    name: 'Bookings',
    description: 'Управление заказами и бронированиями',
    icon: Package,
    category: 'operations',
    features: ['Список заказов', 'Карточка заказа', 'Массовые операции', 'Hold/Confirm/Cancel', 'Метрики загрузки'],
    entities: ['Клиент', 'Канал продаж', 'Услуга/маршрут', 'Дата/слоты', 'Транспорт', 'Предоплата', 'Статус', 'UTM'],
    priority: 'high'
  },
  {
    id: 'dispatch',
    name: 'Dispatch',
    description: 'Оперативное управление выездами',
    icon: Radio,
    category: 'operations',
    features: ['Доска выездов', 'Карта', 'Таймлайн', 'Мониторинг статусов', 'Назначение экипажа'],
    entities: ['Экипаж', 'Техника', 'Маршрут', 'Статус выезда', 'Инциденты'],
    priority: 'high'
  },
  {
    id: 'routes',
    name: 'Routes & Schedules',
    description: 'Маршруты и расписания',
    icon: Route,
    category: 'operations',
    features: ['Маршруты', 'Чек-поинты', 'Ограничения', 'Версионность', 'Зависимости от флота'],
    entities: ['Маршрут', 'Чек-поинты', 'Длительность', 'Погодные ограничения', 'Допуски'],
    priority: 'medium'
  },
  {
    id: 'fleet',
    name: 'Fleet & Maintenance',
    description: 'Управление флотом и техобслуживание',
    icon: Truck,
    category: 'operations',
    features: ['Единицы техники', 'Пробег/моточасы', 'Регламенты ТО', 'Повреждения', 'Страховые случаи'],
    entities: ['Техника', 'ТО', 'Наряды', 'Запчасти', 'VIN/серия'],
    priority: 'high'
  },
  {
    id: 'inventory',
    name: 'Inventory & Parts',
    description: 'Склад и запчасти',
    icon: Archive,
    category: 'operations',
    features: ['Приходы/расходы', 'Минимальные остатки', 'Поставщики', 'ABC/XYZ анализ'],
    entities: ['Запчасти', 'Остатки', 'Поставщики', 'Заказы'],
    priority: 'medium'
  },
  {
    id: 'pricing',
    name: 'Pricing & Offers',
    description: 'Ценообразование и предложения',
    icon: Tag,
    category: 'commercial',
    features: ['Прайс по сезонности', 'Промо-коды', 'Бандлы', 'Симулятор цены'],
    entities: ['Цены', 'Сезонность', 'Каналы', 'Промо-коды'],
    priority: 'medium'
  },
  {
    id: 'crm',
    name: 'CRM & Loyalty',
    description: 'Управление клиентами и лояльность',
    icon: Heart,
    category: 'commercial',
    features: ['Профили клиентов', 'Сегменты', 'Статусы клуба', 'Рефералы', 'Персональные цены'],
    entities: ['Клиент', 'Сегменты', 'Membership', 'Рефералы'],
    priority: 'high'
  },
  {
    id: 'channels',
    name: 'Sales Channels',
    description: 'Каналы продаж',
    icon: Megaphone,
    category: 'commercial',
    features: ['Сайт', 'Avito', 'Партнеры', 'Колл-центр', 'SLA ответов'],
    entities: ['Канал', 'Источник', 'Конверсия', 'SLA'],
    priority: 'medium'
  },
  {
    id: 'content',
    name: 'Content/Media',
    description: 'Контент и медиа',
    icon: Image,
    category: 'marketing',
    features: ['Медиабиблиотека', 'Права использования', 'Подборки под маршруты'],
    entities: ['Медиафайлы', 'Права', 'Коллекции'],
    priority: 'low'
  },
  {
    id: 'finance',
    name: 'Finance & Billing',
    description: 'Финансы и биллинг',
    icon: CreditCard,
    category: 'finance',
    features: ['Счета/акты', 'Касса', 'Комиссии', 'Выплаты', 'Экспорт в бухучет'],
    entities: ['Счета', 'Платежи', 'Комиссии', 'Выплаты'],
    priority: 'high'
  },
  {
    id: 'hr',
    name: 'HR & Scheduling',
    description: 'Персонал и планирование',
    icon: UserCheck,
    category: 'management',
    features: ['Сотрудники', 'Роли', 'Графики', 'Смены', 'Обучение/сертификации'],
    entities: ['Сотрудник', 'Роли', 'Графики', 'KPI'],
    priority: 'medium'
  },
  {
    id: 'compliance',
    name: 'Compliance/Docs',
    description: 'Соответствие и документооборот',
    icon: FileCheck,
    category: 'management',
    features: ['Оферта', 'Согласия ПДн', 'ТБ инструкции', 'Чек-листы', 'E-подписания'],
    entities: ['Документы', 'Согласия', 'Инструкции'],
    priority: 'medium'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Аналитика и отчетность',
    icon: PieChart,
    category: 'intelligence',
    features: ['Доски', 'CAC/LTV', 'NPS/CSAT', 'Инциденты', 'Словарь метрик'],
    entities: ['Метрики', 'События', 'Доски'],
    priority: 'high'
  },
  {
    id: 'settings',
    name: 'Settings & Integrations',
    description: 'Настройки и интеграции',
    icon: Zap,
    category: 'system',
    features: ['RBAC', 'API-ключи', 'Вебхуки', 'Интеграции', '2FA'],
    entities: ['Настройки', 'Интеграции', 'API'],
    priority: 'medium'
  },
  {
    id: 'support',
    name: 'Notifications & Support',
    description: 'Уведомления и поддержка',
    icon: Headphones,
    category: 'system',
    features: ['SMS/email/push шаблоны', 'Локализация', 'Тикеты', 'FAQ'],
    entities: ['Шаблоны', 'Тикеты', 'Знания'],
    priority: 'medium'
  }
];

// 🎯 УНИВЕРСАЛЬНЫЕ UX-ПАТТЕРНЫ
const UX_PATTERNS = {
  commandPalette: true, // ⌘K
  quickSearch: true,
  tableFixedColumns: true,
  savedFilters: true,
  bulkActions: true,
  inlineEdit: true,
  optimisticUI: true,
  emptyStates: true,
  skeletons: true,
  coachMarks: true,
  statusBadges: true,
  breadcrumbs: true
};

// 🎯 KPI ДАННЫЕ
const kpiData = [
  {
    title: "Общая выручка",
    value: "₽12.4M",
    change: "+15.2%",
    trend: "up" as const,
    icon: DollarSign,
    color: "#2BB673"
  },
  {
    title: "Активные бронирования", 
    value: "1,247",
    change: "+8.5%",
    trend: "up" as const,
    icon: Package,
    color: "#3B82F6"
  },
  {
    title: "Загрузка флота",
    value: "87%",
    change: "+12.1%", 
    trend: "up" as const,
    icon: Truck,
    color: "#8B5CF6"
  },
  {
    title: "NPS Score",
    value: "8.7",
    change: "+6.1%",
    trend: "up" as const,
    icon: Star,
    color: "#91040C"
  }
];

// 🎯 КРИТИЧЕСКИЕ АЛЕРТЫ
const criticalAlerts = [
  {
    id: 'alert-1',
    type: 'error' as const,
    module: 'fleet',
    title: 'Критическая неисправность',
    message: 'Вертолет R66 требует немедленного ТО',
    urgent: true,
    time: '2 мин назад'
  },
  {
    id: 'alert-2', 
    type: 'warning' as const,
    module: 'bookings',
    title: '3 holds истекают через 2 часа',
    message: 'Требуется подтверждение клиентов',
    urgent: true,
    time: '5 мин назад'
  },
  {
    id: 'alert-3',
    type: 'info' as const,
    module: 'crm',
    title: 'VIP бронирование подтверждено',
    message: 'Клиент Александров - эксклюзивный тур',
    urgent: false,
    time: '15 мин назад'
  }
];

// 🎯 ОСНОВНОЙ КОМПОНЕНТ
export function GTSExecutivePanelV2025({ user, onLogout, onBackToHome }: GTSExecutivePanelProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 🔍 ФИЛЬТРАЦИЯ МОДУЛЕЙ
  const filteredModules = useMemo(() => {
    return MODULE_CONFIGS.filter(module => {
      const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // 🎯 КАТЕГОРИИ МОДУЛЕЙ
  const categories = [
    { id: 'all', name: 'Все модули', count: MODULE_CONFIGS.length },
    { id: 'operations', name: 'Операции', count: MODULE_CONFIGS.filter(m => m.category === 'operations').length },
    { id: 'commercial', name: 'Коммерция', count: MODULE_CONFIGS.filter(m => m.category === 'commercial').length },
    { id: 'finance', name: 'Финансы', count: MODULE_CONFIGS.filter(m => m.category === 'finance').length },
    { id: 'management', name: 'Управление', count: MODULE_CONFIGS.filter(m => m.category === 'management').length },
    { id: 'intelligence', name: 'Аналитика', count: MODULE_CONFIGS.filter(m => m.category === 'intelligence').length },
    { id: 'system', name: 'Система', count: MODULE_CONFIGS.filter(m => m.category === 'system').length }
  ];

  // ⌘K Command Palette Handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 🎯 МОДУЛЬ DASHBOARD
  const DashboardModule = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white">Executive Dashboard</h1>
          <p className="text-[#A6A7AA]">Центр управления Grand Tour Sochi</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCommandPalette(true)}
            className="border-[#232428] text-white hover:bg-[#17181A]"
          >
            <Command className="w-4 h-4 mr-2" />
            ⌘K
          </Button>
          <Badge className="bg-green-500/10 text-green-400">
            <Activity className="w-3 h-3 mr-1" />
            Все системы в норме
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="bg-[#121214] border-[#232428] hover:border-[#91040C]/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#A6A7AA]">{kpi.title}</p>
                    <p className="text-2xl font-heading text-white">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-400">{kpi.change}</span>
                    </div>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}10` }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Critical Alerts */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#91040C]" />
            Критические уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {criticalAlerts.map((alert) => (
            <Alert 
              key={alert.id} 
              className={`${
                alert.type === 'error' ? 'border-red-500/20 bg-red-500/5' :
                alert.type === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' :
                'border-blue-500/20 bg-blue-500/5'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{alert.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.module}
                      </Badge>
                      {alert.urgent && (
                        <Badge className="bg-red-500/10 text-red-400 text-xs">
                          Срочно
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#A6A7AA]">{alert.message}</p>
                    <p className="text-xs text-[#A6A7AA] mt-1">{alert.time}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                    Действие
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Module Quick Access */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Быстрый доступ к модулям</CardTitle>
          <CardDescription className="text-[#A6A7AA]">
            Наиболее используемые функции системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MODULE_CONFIGS.filter(m => m.priority === 'high').map((module) => {
              const IconComponent = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className="p-4 bg-[#17181A] rounded-lg hover:bg-[#1F2024] transition-colors group"
                >
                  <IconComponent className="w-6 h-6 text-[#91040C] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-white">{module.name}</p>
                  <p className="text-xs text-[#A6A7AA] mt-1">{module.features.length} функций</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );



  // 🎯 COMMAND PALETTE OVERLAY
  const CommandPalette = () => {
    if (!showCommandPalette) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
        <Card className="w-full max-w-2xl bg-[#121214] border-[#232428]">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 p-4 border-b border-[#232428]">
              <Command className="w-5 h-5 text-[#A6A7AA]" />
              <Input
                placeholder="Поиск модулей, функций, клиентов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-white focus:ring-0"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      setShowCommandPalette(false);
                    }}
                    className="w-full flex items-center gap-3 p-4 hover:bg-[#17181A] text-left"
                  >
                    <IconComponent className="w-5 h-5 text-[#91040C]" />
                    <div>
                      <p className="font-medium text-white">{module.name}</p>
                      <p className="text-sm text-[#A6A7AA]">{module.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 🎯 SIDEBAR
  const Sidebar = () => (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-[#121214] border-r border-[#232428] transition-all duration-200`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!sidebarCollapsed && (
            <h2 className="font-heading text-white">Модули системы</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:bg-[#17181A]"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {!sidebarCollapsed && (
          <>
            {/* Category Filter */}
            <div className="mb-4">
              <div className="grid grid-cols-1 gap-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#91040C] text-white'
                        : 'text-[#A6A7AA] hover:bg-[#17181A] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="mb-4 bg-[#232428]" />
          </>
        )}

        {/* Module List */}
        <div className="space-y-1">
          {/* Dashboard */}
          <button
            onClick={() => setActiveModule('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeModule === 'dashboard'
                ? 'bg-[#91040C] text-white'
                : 'text-[#A6A7AA] hover:bg-[#17181A] hover:text-white'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>

          {/* Filtered Modules */}
          {filteredModules.map((module) => {
            const IconComponent = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeModule === module.id
                    ? 'bg-[#91040C] text-white'
                    : 'text-[#A6A7AA] hover:bg-[#17181A] hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {!sidebarCollapsed && (
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>{module.name}</span>
                      {module.priority === 'high' && (
                        <div className="w-2 h-2 bg-[#91040C] rounded-full" />
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // 🎯 GENERIC MODULE RENDERER
  const GenericModule = ({ module }: { module: typeof MODULE_CONFIGS[0] }) => {
    const IconComponent = module.icon;
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#A6A7AA] mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{module.name}</span>
            </div>
            <h1 className="text-3xl font-heading text-white">{module.name}</h1>
            <p className="text-[#A6A7AA]">{module.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${
              module.priority === 'high' ? 'bg-red-500/10 text-red-400' :
              module.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
              'bg-green-500/10 text-green-400'
            }`}>
              Приоритет: {module.priority === 'high' ? 'Высокий' : module.priority === 'medium' ? 'Средний' : 'Низкий'}
            </Badge>
          </div>
        </div>

        {/* Module Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <IconComponent className="w-5 h-5 text-[#91040C]" />
                Основные функции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader>
              <CardTitle className="text-white">Сущности и поля</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.entities.map((entity, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {entity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Status */}
        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-8">
            <div className="text-center">
              <IconComponent className="w-16 h-16 text-[#A6A7AA] mx-auto mb-4" />
              <h3 className="text-xl font-heading text-white mb-2">Модуль в разработке</h3>
              <p className="text-[#A6A7AA] mb-4">
                Полная реализация модуля {module.name} согласно чек-листу v2025-09-17
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-heading text-white">{module.features.length}</div>
                  <div className="text-sm text-[#A6A7AA]">Функций</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-white">{module.entities.length}</div>
                  <div className="text-sm text-[#A6A7AA]">Сущностей</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-heading text-[#91040C]">0%</div>
                  <div className="text-sm text-[#A6A7AA]">Готовность</div>
                </div>
              </div>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                Начать разработку
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // 🎯 MAIN RENDER
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white dark">
      {/* Command Palette */}
      <CommandPalette />

      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToHome} className="text-white hover:bg-[#17181A]">
              ← Главная
            </Button>
            <div>
              <h1 className="text-xl font-heading text-white">GTS Executive Panel v2025</h1>
              <p className="text-sm text-[#A6A7AA]">15 модулей • Чек-лист v2025-09-17</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-white hover:bg-[#17181A]">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#91040C] rounded-full text-xs flex items-center justify-center text-white">
                {criticalAlerts.filter(a => a.urgent).length}
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-[#17181A]">
                  {user.name} <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                  Настройки
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#232428]" />
                <DropdownMenuItem onClick={onLogout} className="text-white hover:bg-[#17181A]">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeModule === 'dashboard' && <DashboardModule />}
          {activeModule === 'bookings' && <GTSBookingsModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule === 'dispatch' && <GTSDispatchModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule === 'routes' && <GTSRoutesSchedulesModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule === 'fleet' && <GTSFleetMaintenanceModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule === 'inventory' && <GTSInventoryPartsModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule === 'pricing' && <GTSPricingOffersModule onBackToModules={() => setActiveModule('dashboard')} />}
          {activeModule !== 'dashboard' && activeModule !== 'bookings' && activeModule !== 'dispatch' && activeModule !== 'routes' && activeModule !== 'fleet' && activeModule !== 'inventory' && activeModule !== 'pricing' && (
            <GenericModule module={MODULE_CONFIGS.find(m => m.id === activeModule)!} />
          )}
        </div>
      </div>
    </div>
  );
}

export default GTSExecutivePanelV2025;