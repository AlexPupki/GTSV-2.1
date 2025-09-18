import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star, Play, Heart, MessageCircle, Share2, ThumbsUp, Calendar, MapPin } from "lucide-react";

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  verified: boolean;
}

interface Story {
  id: string;
  author: string;
  avatar: string;
  date: string;
  type: 'photo' | 'video';
  content: string;
  caption: string;
  likes: number;
  comments: number;
  location?: string;
  service: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Анна Петрова",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c68f7b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NjUzNzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    date: "15 янв 2025",
    text: "Незабываемый день на Yamaha 252S! Профессиональная команда, идеальная техника. Обязательно вернемся!",
    service: "Катер Yamaha 252S",
    verified: true
  },
  {
    id: "2", 
    name: "Дмитрий Волков",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzczOXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    date: "12 янв 2025", 
    text: "Slingshot R превзошел все ожидания! Адреналин зашкаливает, а виды Красной Поляны просто космос.",
    service: "Polaris Slingshot R",
    verified: true
  },
  {
    id: "3",
    name: "Мария Соколова", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NTY2NTM3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5,
    date: "8 янв 2025",
    text: "Полет на Robinson R44 - это что-то невероятное! Пилот показал все самые красивые места. Рекомендую!",
    service: "Вертолёт Robinson R44",
    verified: true
  }
];

const stories: Story[] = [
  {
    id: "1",
    author: "Андрей К.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NTY2NTM3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2 дня назад",
    type: "photo",
    content: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZHxlbnwxfHx8fDE3NTYxNDI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Honda Talon покорил все вершины! 🏔️ Такого драйва давно не испытывал",
    likes: 89,
    comments: 12,
    location: "Красная Поляна",
    service: "Honda Talon"
  },
  {
    id: "2", 
    author: "Елена М.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "4 дня назад",
    type: "video", 
    content: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Романтический закат на Slingshot ❤️ Идеальное свидание!",
    likes: 124,
    comments: 18,
    location: "Набережная Сочи", 
    service: "Polaris Slingshot R"
  },
  {
    id: "3",
    author: "Максим Р.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTM3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "1 неделя назад",
    type: "photo",
    content: "https://images.unsplash.com/photo-1621499901409-cfc9598bf28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBib2F0JTIwbHV4dXJ5JTIweWFjaHR8ZW58MXx8fHwxNzU2MTQyNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Корпоративная поездка на Yamaha 252S 🛥️ Команда в восторге!",
    likes: 67,
    comments: 8,
    location: "Чёрное море",
    service: "Yamaha 252S"
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function GTSUnifiedTestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'stories'>('reviews');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light mb-4 tracking-wider text-black">
            ОТЗЫВЫ И ИСТОРИИ ГОСТЕЙ
          </h2>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Реальные впечатления наших клиентов о приключениях с GTS
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'reviews' 
                  ? 'bg-white shadow-sm text-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Отзывы клиентов
            </button>
            <button
              onClick={() => setActiveTab('stories')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'stories' 
                  ? 'bg-white shadow-sm text-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Истории гостей
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'reviews' ? (
            /* Reviews Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <ImageWithFallback
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black">{review.name}</h3>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {review.service}
                    </Badge>
                    {review.verified && (
                      <Badge className="bg-green-500 text-white text-xs">
                        Проверено
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Stories Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden bg-white border-gray-200 hover:shadow-lg transition-shadow">
                  {/* Story Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={story.avatar}
                        alt={story.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-black text-sm">{story.author}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {story.date}
                          {story.location && (
                            <>
                              <span>•</span>
                              <MapPin className="w-3 h-3" />
                              {story.location}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="relative aspect-square">
                    <ImageWithFallback
                      src={story.content}
                      alt={story.caption}
                      className="w-full h-full object-cover"
                    />
                    {story.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-black ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-black/70 text-white text-xs">
                        {story.service}
                      </Badge>
                    </div>
                  </div>

                  {/* Story Footer */}
                  <div className="p-4">
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {story.caption}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {story.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {story.comments}
                        </div>
                      </div>
                      <button className="flex items-center gap-1 hover:text-black transition-colors">
                        <Share2 className="w-4 h-4" />
                        Поделиться
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {activeTab === 'reviews' 
              ? 'Поделитесь своими впечатлениями о поездке с GTS'
              : 'Отметьте нас в своих фото и видео'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-gray-300">
              {activeTab === 'reviews' ? 'Оставить отзыв' : 'Загрузить фото'}
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
              Посмотреть все
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}