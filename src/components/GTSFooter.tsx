import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { GTSStyles } from "../utils/gts-styles";

interface GTSFooterProps {
  onNavigateToLogin?: () => void;
  onNavigateToUIKit?: () => void;
  onNavigateToDemo?: () => void;
  onNavigateToNewLeadDemo?: () => void;
}

export function GTSFooter({ onNavigateToLogin, onNavigateToUIKit, onNavigateToDemo, onNavigateToNewLeadDemo }: GTSFooterProps = {}) {
  return (
    <footer className="bg-black text-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="text-2xl lg:text-3xl font-light tracking-wider mb-4 lg:mb-6">
              <span className="text-white">GRAND TOUR</span>
              <span className="block text-[#91040C]">SOCHI</span>
            </div>
            <p className="text-white/60 mb-6 lg:mb-8 font-light leading-relaxed text-sm lg:text-base">
              Премиальный клуб активного отдыха в Сочи. 
              <span className="hidden sm:inline"> Эксклюзивные экспедиции, аренда техники и закрытые клубные привилегии 
              для ценителей качества и статуса.</span>
            </p>
            <div className="flex space-x-4 lg:space-x-6">
              <a href="#" className="text-white/60 hover:text-[#91040C] transition-colors">
                <Instagram className={GTSStyles.icons.medium} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#91040C] transition-colors">
                <Facebook className={GTSStyles.icons.medium} />
              </a>
              <a href="#" className="text-white/60 hover:text-[#91040C] transition-colors">
                <Youtube className={GTSStyles.icons.medium} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="order-3 lg:order-2">
            <h4 className="text-white font-medium mb-4 lg:mb-6 tracking-wide text-sm lg:text-base">УСЛУГИ</h4>
            <ul className="space-y-3 lg:space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors text-sm">Аренда катеров</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Багги экспедиции</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Slingshot туры</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">Вертолётные экскурсии</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-sm">VIP программы</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="order-2 lg:order-3">
            <h4 className="text-white font-medium mb-4 lg:mb-6 tracking-wide text-sm lg:text-base">КОНТАКТЫ</h4>
            <div className="space-y-3 lg:space-y-4 text-white/60">
              <div className="flex items-start">
                <Phone className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm">+7 (862) 555-0123</div>
                  <div className="text-xs text-white/40">Ежедневно 24/7</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm break-all">club@grandtoursochi.ru</div>
                  <div className="text-xs text-white/40">Ответим в течение часа</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className={`${GTSStyles.icons.small} mr-2 lg:mr-3 mt-0.5 text-[#91040C] flex-shrink-0`} />
                <div>
                  <div className="text-sm">Сочи, Олимпийский парк</div>
                  <div className="text-xs text-white/40">Адлерский район</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Membership CTA */}
        <div className="border-t border-white/10 pt-8 lg:pt-12 mb-8 lg:mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 lg:p-8 text-center">
            <h3 className="text-xl lg:text-2xl font-light text-white mb-3 lg:mb-4 tracking-wide">
              ПРЕМИАЛЬНОЕ ЧЛЕНСТВО
            </h3>
            <p className="text-white/60 mb-4 lg:mb-6 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
              Получите доступ к эксклюзивным мероприятиям, приоритетному бронированию 
              <span className="hidden sm:inline"> и персональному консьерж-сервису</span>
            </p>
            <button className={`${GTSStyles.buttons.primary} px-6 lg:px-8 py-3 text-sm tracking-wider`}>
              УЗНАТЬ ПОДРОБНЕЕ
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 lg:pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center text-white/40 text-xs lg:text-sm space-y-4 lg:space-y-0">
          <div>
            © 2024 Grand Tour Sochi. Все права защищены.
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs lg:text-sm">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
            <a href="#" className="hover:text-white transition-colors">Условия членства</a>
            {onNavigateToLogin && (
              <button
                onClick={onNavigateToLogin}
                className="hover:text-white transition-colors text-left"
              >
                Вход в систему
              </button>
            )}
            {onNavigateToDemo && (
              <button
                onClick={onNavigateToDemo}
                className="hover:text-[#91040C] transition-colors text-left"
              >
                Demo
              </button>
            )}
            {onNavigateToNewLeadDemo && (
              <button
                onClick={onNavigateToNewLeadDemo}
                className="hover:text-[#91040C] transition-colors text-left"
              >
                New Lead Demo
              </button>
            )}
            {onNavigateToUIKit && (
              <button
                onClick={onNavigateToUIKit}
                className="hover:text-white transition-colors text-left"
              >
                UI Kit
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}