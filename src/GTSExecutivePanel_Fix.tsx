import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../ui/dropdown-menu";
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
  CheckCircle,
  CheckCircle2,
  UserCheck,
  MoreHorizontal,
  Filter,
  Plus,
  ExternalLink,
  Timer,
  Bell,
  CalendarClock,
  AlertCircle,
  // Новые иконки для недостающих модулей
  Plane,
  Anchor,
  Gauge,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  Radio,
  MapPin,
  Navigation,
  Radar,
  AlertOctagon,
  Headphones,
  LifeBuoy,
  Zap,
  Truck
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

interface Task {
  id: string;
  title: string;
  dueDate: string;
  dueDateFormatted: string;
  relatedEntity: {
    type: 'Lead' | 'Deal' | 'Booking';
    id: string;
    name: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'due-today' | 'overdue' | 'completed';
  assignee: string;
  description?: string;
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

// Enhanced alerts with CRM-specific notifications
const alerts = [
  {
    id: '1',
    type: 'warning' as const,
    category: 'CRM',
    title: '3 holds expire in 2h',
    message: 'Клиенты Михайлов А.В., Петрова С.К. и Сидоров И.Н. имеют удержания, которые истекают через 2 часа.',
    location: 'CRM → Deals → Holdings',
    time: '5 мин назад',
    urgent: true,
    assignee: 'Менеджер Смирнова К.А.',
    actionRequired: 'Срочно связаться с клиентами'
  },
  {
    id: '2',
    type: 'error' as const,
    category: 'CRM',
    title: '2 deals stuck in Qualified >14 days',
    message: 'Сделки #4521 и #4389 находятся в статусе "Квалифицированные" более 14 дней без движения.',
    location: 'CRM → Pipeline → Qualified',
    time: '1 час назад',
    urgent: true,
    assignee: 'Руководитель отдела продаж',
    actionRequired: 'Проверить причины задержки'
  },
  {
    id: '3',
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
    id: '4',
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
    id: '5',
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

// Tasks data
const tasksData: Task[] = [
  {
    id: 'task-1',
    title: 'Подтвердить бронирование яхты',
    dueDate: '2024-01-15T14:00:00',
    dueDateFormatted: 'Сегодня, 14:00',
    relatedEntity: {
      type: 'Booking',
      id: 'BK-4521',
      name: 'Михайлов А.В. - Azimut 68'
    },
    priority: 'high',
    status: 'due-today',
    assignee: 'Смирнова К.А.',
    description: 'Клиент ожидает подтверждения бронирования на завтра'
  },
  {
    id: 'task-2',
    title: 'Обработать лид из Facebook',
    dueDate: '2024-01-15T16:30:00',
    dueDateFormatted: 'Сегодня, 16:30',
    relatedEntity: {
      type: 'Lead',
      id: 'LD-9832',
      name: 'Петрова С.К. - Вертолётная экскурсия'
    },
    priority: 'medium',
    status: 'due-today',
    assignee: 'Иванов П.М.',
    description: 'Первичный контакт с лидом по экскурсии на вертолёте'
  },
  {
    id: 'task-3',
    title: 'Закрыть сделку по аренде автомобиля',
    dueDate: '2024-01-14T18:00:00',
    dueDateFormatted: 'Вчера, 18:00',
    relatedEntity: {
      type: 'Deal',
      id: 'DL-6754',
      name: 'Сидоров И.Н. - McLaren 720S'
    },
    priority: 'high',
    status: 'overdue',
    assignee: 'Козлов А.В.',
    description: 'Сделка просрочена на 1 день, клиент не отвечает на звонки'
  },
  {
    id: 'task-4',
    title: 'Провести презентацию для корпоративного клиента',
    dueDate: '2024-01-13T15:00:00',
    dueDateFormatted: '2 дня назад, 15:00',
    relatedEntity: {
      type: 'Deal',
      id: 'DL-8821',
      name: 'ООО "Стройинвест" - Корпоративные услуги'
    },
    priority: 'high',
    status: 'overdue',
    assignee: 'Федорова М.И.',
    description: 'Презентация перенесена уже дважды, нужно срочно назначить встречу'
  },
  {
    id: 'task-5',
    title: 'Подготовить документы для VIP клиента',
    dueDate: '2024-01-14T12:00:00',
    dueDateFormatted: 'Завершено вчера',
    relatedEntity: {
      type: 'Booking',
      id: 'BK-3344',
      name: 'Александров В.П. - VIP пакет'
    },
    priority: 'medium',
    status: 'completed',
    assignee: 'Смирнова К.А.',
    description: 'Все документы подготовлены и переданы клиенту'
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
    id: 'fleet',
    name: 'Fleet Management',
    description: 'Управление флотом техники',
    icon: Truck,
    active: false
  },
  {
    id: 'operations',
    name: 'Operations Center',
    description: 'Операционный центр управления',
    icon: Radio,
    active: false
  },
  {
    id: 'weather',
    name: 'Weather & Conditions',
    description: 'Погода и условия безопасности',
    icon: CloudRain,
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

// Заглушки для недостающих модулей
const FleetManagementModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="gts-heading-1 mb-2">Fleet Management</h1>
        <p className="gts-caption-text">Управление флотом техники Grand Tour Sochi</p>
      </div>
      <Button variant="outline" size="sm">
        <Plus className="w-4 h-4 mr-2" />
        Добавить технику
      </Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Авиация</h3>
            <p className="text-sm text-muted-foreground">4 единицы техники</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>R66 Turbine</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
          <div className="flex justify-between">
            <span>AS350 B3</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
          <div className="flex justify-between">
            <span>Bell 407</span>
            <Badge className="bg-red-500/10 text-red-400">Техобслуживание</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Anchor className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Водный транспорт</h3>
            <p className="text-sm text-muted-foreground">8 единиц техники</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Azimut 68</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
          <div className="flex justify-between">
            <span>Princess 62</span>
            <Badge className="bg-yellow-500/10 text-yellow-400">Заправка</Badge>
          </div>
          <div className="flex justify-between">
            <span>Yamaha FX252</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className="font-semibold">Наземный транспорт</h3>
            <p className="text-sm text-muted-foreground">12 единиц техники</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>McLaren 720S</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
          <div className="flex justify-between">
            <span>Polaris RZR</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
          <div className="flex justify-between">
            <span>Can-Am X3</span>
            <Badge className="bg-green-500/10 text-green-400">Готов</Badge>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const OperationsCenterModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="gts-heading-1 mb-2">Operations Center</h1>
        <p className="gts-caption-text">Операционный центр управления GTS</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="bg-green-500/10 text-green-400">
          <Radar className="w-3 h-3 mr-1" />
          Все системы в норме
        </Badge>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Активные операции</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Рейс GTS-001</p>
              <p className="text-sm text-muted-foreground">Вертолетная экскурсия • В полете</p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-400">В работе</Badge>
          </div>

          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Anchor className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Рейс GTS-002</p>
              <p className="text-sm text-muted-foreground">Яхта Azimut 68 • На маршруте</p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-400">В работе</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Мониторинг безопасности</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>GPS трекинг</span>
            <Badge className="bg-green-500/10 text-green-400">Активен</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Связь с экипажами</span>
            <Badge className="bg-green-500/10 text-green-400">Стабильна</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Аварийные протоколы</span>
            <Badge className="bg-green-500/10 text-green-400">Готовы</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Диспетчерская</span>
            <Badge className="bg-green-500/10 text-green-400">Дежурит</Badge>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const WeatherConditionsModule = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="gts-heading-1 mb-2">Weather & Conditions</h1>
        <p className="gts-caption-text">Погодные условия и безопасность операций</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="bg-green-500/10 text-green-400">
          <CloudRain className="w-3 h-3 mr-1" />
          Полеты разрешены
        </Badge>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Thermometer className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold">Температура</h3>
        </div>
        <div className="text-2xl font-bold">+18°C</div>
        <p className="text-sm text-muted-foreground">Комфортная для полетов</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wind className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Ветер</h3>
        </div>
        <div className="text-2xl font-bold">8 м/с</div>
        <p className="text-sm text-muted-foreground">СВ направление</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">Видимость</h3>
        </div>
        <div className="text-2xl font-bold">15 км</div>
        <p className="text-sm text-muted-foreground">Отличная</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cloud className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold">Облачность</h3>
        </div>
        <div className="text-2xl font-bold">20%</div>
        <p className="text-sm text-muted-foreground">Минимальная</p>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Прогноз на 24 часа</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>12:00</span>
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              <span>+18°C</span>
              <Badge className="bg-green-500/10 text-green-400">Безопасно</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>15:00</span>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" />
              <span>+16°C</span>
              <Badge className="bg-yellow-500/10 text-yellow-400">Осторожно</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>18:00</span>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4" />
              <span>+14°C</span>
              <Badge className="bg-red-500/10 text-red-400">Запрет полетов</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Ограничения по типам операций</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              <span>Вертолетные экскурсии</span>
            </div>
            <Badge className="bg-green-500/10 text-green-400">Разрешено</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4" />
              <span>Морские прогулки</span>
            </div>
            <Badge className="bg-green-500/10 text-green-400">Разрешено</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Сафари на багги</span>
            </div>
            <Badge className="bg-green-500/10 text-green-400">Разрешено</Badge>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export function GTSExecutivePanel({ user, onLogout, onBackToHome }: GTSExecutivePanelProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [taskFilter, setTaskFilter] = useState<'all' | 'due-today' | 'overdue' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true;
    return task.status === taskFilter;
  });

  // Count tasks by status
  const taskCounts = {
    'due-today': tasks.filter(t => t.status === 'due-today').length,
    'overdue': tasks.filter(t => t.status === 'overdue').length,
    'completed': tasks.filter(t => t.status === 'completed').length,
    'all': tasks.length
  };

  // Task actions
  const markTaskDone = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
  };

  const snoozeTask = (taskId: string) => {
    // Snooze for 1 hour (simplified implementation)
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        dueDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        dueDateFormatted: 'Через 1 час'
      } : task
    ));
  };

  const reassignTask = (taskId: string, newAssignee: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, assignee: newAssignee } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'border-l-red-500 bg-red-500/5';
      case 'due-today': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'completed': return 'border-l-green-500 bg-green-500/5';
      default: return 'border-l-gray-500';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className={`${getStatusColor(task.status)} border-l-4 hover:shadow-lg transition-all duration-200`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-foreground">{task.title}</h3>
              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{task.dueDateFormatted}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {task.relatedEntity.type}
              </Badge>
              <span>{task.relatedEntity.name}</span>
            </div>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-2">{task.description}</p>
            )}
          </div>
          
          {task.status !== 'completed' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => markTaskDone(task.id)}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Выполнено
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => snoozeTask(task.id)}>
                  <Timer className="h-4 w-4 mr-2" />
                  Отложить на час
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => reassignTask(task.id, 'Новый исполнитель')}>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Переназначить
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть {task.relatedEntity.type}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Исполнитель: {task.assignee}</span>
          {task.status === 'completed' && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Выполнено
            </Badge>
          )}
          {task.status === 'overdue' && (
            <Badge variant="destructive" className="text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              Просрочено
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );

  const EmptyTasksState = () => (
    <div className="text-center py-12">
      <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        {taskFilter === 'completed' ? 'Все задачи выполнены' : 'Нет активных задач'}
      </h3>
      <p className="text-muted-foreground">
        {taskFilter === 'completed' 
          ? 'Отличная работа! Все задачи в этой категории завершены.'
          : 'У вас пока нет задач в этой категории.'}
      </p>
    </div>
  );

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
          notificationCount={alerts.filter(a => a.urgent).length + taskCounts.overdue}
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

              {/* Enhanced Notifications & Tasks Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notifications Panel */}
                <Card className="overflow-hidden">
                  <div className="border-b border-border bg-card">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-3">
                        <h2 className="gts-heading-2">Уведомления</h2>
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                          <Bell className="w-3 h-3 mr-1" />
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
                              <span className="text-xs text-muted-foreground">{alert.time}</span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-muted-foreground">
                                <span>📍 {alert.location}</span>
                                <br />
                                <span>👤 {alert.assignee}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                Действие
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Tasks Panel */}
                <Card className="overflow-hidden">
                  <div className="border-b border-border bg-card">
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-3">
                        <h2 className="gts-heading-2">Задачи</h2>
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                          <CalendarClock className="w-3 h-3 mr-1" />
                          {taskCounts.overdue} просрочено
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            {taskFilter === 'all' ? 'Все' : 
                             taskFilter === 'due-today' ? 'На сегодня' :
                             taskFilter === 'overdue' ? 'Просрочено' : 'Выполнено'}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setTaskFilter('all')}>
                            Все ({taskCounts.all})
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTaskFilter('due-today')}>
                            На сегодня ({taskCounts['due-today']})
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTaskFilter('overdue')}>
                            Просрочено ({taskCounts.overdue})
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTaskFilter('completed')}>
                            Выполнено ({taskCounts.completed})
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {filteredTasks.length > 0 ? (
                      <div className="p-6 space-y-4">
                        {filteredTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                        ))}
                      </div>
                    ) : (
                      <EmptyTasksState />
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Fleet Management Module */}
          {activeModule === 'fleet' && <FleetManagementModule />}

          {/* Operations Center Module */}
          {activeModule === 'operations' && <OperationsCenterModule />}

          {/* Weather & Conditions Module */}
          {activeModule === 'weather' && <WeatherConditionsModule />}

          {/* Marketing Module */}
          {activeModule === 'marketing' && (
            <GTSMarketingTrafficModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Analytics Module */}
          {activeModule === 'analytics' && (
            <GTSAnalyticsEnhanced 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Integrations Module */}
          {activeModule === 'integrations' && (
            <GTSAPIIntegrationsModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Calendar Module */}
          {activeModule === 'calendar' && (
            <GTSCalendarEnhanced 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* CRM Module */}
          {activeModule === 'crm' && (
            <GTSCRMWithOmniInbox 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Partners Module */}
          {activeModule === 'partners' && (
            <GTSPartnersDatabase 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Staff Module */}
          {activeModule === 'staff' && (
            <GTSStaffManagementModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Finance Module */}
          {activeModule === 'finance' && (
            <GTSFinanceCenterModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Knowledge Base Module */}
          {activeModule === 'knowledge' && (
            <GTSKnowledgeBaseModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* CMS Module */}
          {activeModule === 'cms' && (
            <GTSCMSContentHub 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* IAM Module */}
          {activeModule === 'iam' && (
            <GTSIAMRolesPermissions 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* AI Modules */}
          {activeModule === 'ai' && (
            <GTSAIModulesDashboard 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Audit & Logs Module */}
          {activeModule === 'audit' && (
            <GTSAuditLoggingModule 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* Quality & Trends Module */}
          {activeModule === 'quality' && (
            <GTSQualityTrendsDashboard 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}

          {/* B2B Client Portal */}
          {activeModule === 'b2b-portal' && (
            <GTSB2BClientPortal 
              onBack={() => setActiveModule('dashboard')}
              onNavigateToCalendar={() => setActiveModule('calendar')}
            />
          )}
        </div>
      </div>
    </div>
  );
}