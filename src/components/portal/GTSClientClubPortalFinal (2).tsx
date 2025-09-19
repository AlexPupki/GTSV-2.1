import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { 
  Calendar,
  Gift,
  Star,
  Trophy,
  Crown,
  CreditCard,
  QrCode,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  ChevronRight,
  Tag,
  Percent,
  Users,
  Sparkles,
  Heart,
  Plane,
  Anchor,
  Car,
  MessageCircle
} from "lucide-react";
import { GTSSocialTierFeatures } from "./GTSSocialTierFeatures";

interface GTSClientClubPortalFinalProps {
  onBack?: () => void;
}

// Tier colors
const tierColors = {
  bronze: { bg: "#8C6239", text: "#FFFFFF", light: "#B8804D" },
  silver: { bg: "#C0C0C0", text: "#000000", light: "#D4D4D4" },
  gold: { bg: "#FFD700", text: "#000000", light: "#FFE55C" },
  platinum: { bg: "#E5E4E2", text: "#000000", light: "#F0EFED" }
};

// Mock current user data
const currentUser = {
  id: "member-001",
  name: "Александр Петров",
  email: "a.petrov@techcorp.ru",
  phone: "+7 905 123-45-67",
  tier: "platinum" as keyof typeof tierColors,
  bonusBalance: 15420,
  totalSpent: 2850000,
  joinDate: "2022-03-15",
  lastBooking: "2024-12-01",
  avatar: "АП",
  lifetimeBookings: 47,
  membershipId: "GTS-PLT-001",
  nextTierProgress: 100,
  privileges: ["Priority Support", "Free Upgrades", "Exclusive Events", "Concierge Service"]
};

export function GTSClientClubPortalFinal({ onBack }: GTSClientClubPortalFinalProps) {
  const [activeTab, setActiveTab] = useState("social");

  const getTierInfo = (tier: keyof typeof tierColors) => {
    return tierColors[tier];
  };

  const getTierDisplayName = (tier: keyof typeof tierColors) => {
    const names = {
      bronze: "Бронза",
      silver: "Серебро", 
      gold: "Золото",
      platinum: "Платина"
    };
    return names[tier];
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-[#232428] text-white text-lg">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-heading text-white">
                  ClientClub - {currentUser.name.split(' ')[0]}
                </h1>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: getTierInfo(currentUser.tier).bg, 
                      color: getTierInfo(currentUser.tier).text 
                    }}
                  >
                    {getTierDisplayName(currentUser.tier)} Member
                  </Badge>
                  <span className="text-sm text-[#A6A7AA]">{currentUser.membershipId}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Моя карта
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Бонусный баланс</p>
                  <p className="text-2xl font-heading text-white">{currentUser.bonusBalance.toLocaleString()}</p>
                  <p className="text-xs text-green-400">баллов</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Всего бронирований</p>
                  <p className="text-2xl font-heading text-white">{currentUser.lifetimeBookings}</p>
                  <p className="text-xs text-blue-400">за все время</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Потрачено всего</p>
                  <p className="text-2xl font-heading text-white">₽{(currentUser.totalSpent / 1000000).toFixed(1)}M</p>
                  <p className="text-xs" style={{ color: getTierInfo(currentUser.tier).bg }}>
                    {getTierDisplayName(currentUser.tier)} уровень
                  </p>
                </div>
                <Trophy className="h-8 w-8" style={{ color: getTierInfo(currentUser.tier).bg }} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Участников {getTierDisplayName(currentUser.tier)}</p>
                  <p className="text-2xl font-heading text-white">247</p>
                  <p className="text-xs text-emerald-400">в сообществе</p>
                </div>
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Features Integration */}
        <GTSSocialTierFeatures currentUser={currentUser} />
      </div>
    </div>
  );
}