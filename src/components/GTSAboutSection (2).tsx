import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Shield, Crown, Users, MapPin } from "lucide-react";

const clubFeatures = [
  {
    icon: Crown,
    title: "Эксклюзивность",
    description: "Закрытое членство для истинных ценителей качества и статуса"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Высочайшие стандарты безопасности и профессиональное сопровождение"
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Клуб единомышленников с общими ценностями и интересами"
  },
  {
    icon: MapPin,
    title: "Уникальные маршруты",
    description: "Доступ к секретным локациям и эксклюзивным маршрутам"
  }
];

export function GTSAboutSection() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 lg:mb-8">
              <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-4">
                <span className="text-xs tracking-wider text-black/60 uppercase font-medium">О КЛУБЕ</span>
              </div>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-light mb-6 lg:mb-8 tracking-wider text-black leading-tight">
                GRAND TOUR
                <span className="block text-[#91040C]">SOCHI CLUB</span>
              </h2>
            </div>
            
            <div className="space-y-6 mb-8 lg:mb-12">
              <p className="text-lg lg:text-xl text-black/80 font-light leading-relaxed">
                Эксклюзивный клуб для тех, кто ценит качество, комфорт и неординарные впечатления. 
                Мы создаем уникальные приключения на премиальной технике в самых живописных 
                локациях Сочи и Краснодарского края.
              </p>
              
              <p className="text-base lg:text-lg text-black/60 font-light leading-relaxed">
                Каждое путешествие с GTS — это не просто аренда техники, а тщательно продуманный 
                опыт с персональным сервисом, который соответствует статусу наших членов.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">50+</div>
                <div className="text-sm text-black/60 tracking-wide">Членов клуба</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">15</div>
                <div className="text-sm text-black/60 tracking-wide">Единиц техники</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">200+</div>
                <div className="text-sm text-black/60 tracking-wide">Маршрутов</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">24/7</div>
                <div className="text-sm text-black/60 tracking-wide">Поддержка</div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {clubFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#91040C]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-2 tracking-wide">{feature.title}</h4>
                    <p className="text-sm text-black/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <Card className="border-0 shadow-none bg-transparent overflow-hidden">
              <div className="relative">
                <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="GTS Club Experience"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 lg:top-6 right-4 lg:right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#91040C] rounded-full"></div>
                    <span className="text-xs font-medium text-black tracking-wide">ПРЕМИУМ КЛУБ</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>


      </div>
    </section>
  );
}