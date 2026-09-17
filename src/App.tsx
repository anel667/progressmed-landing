/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, ShieldCheck, Clock, Check, X, FileText, Lock } from 'lucide-react';

declare global {
  interface Window {
    ttq?: {
      track: (eventName: string, params?: Record<string, unknown>) => void;
      page: () => void;
    };
  }
}

const WHATSAPP_NUMBER = '77084255544';
const DEFAULT_MESSAGE = 'Здравствуйте! Хочу записаться на прием к онкогинекологу в ProgressMed (г. Астана).';
const LOGO_URL = 'https://i.ibb.co.com/sf8QgZ5/IMG-5512.png';

export default function App() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleWhatsAppClick = () => {
    setIsRedirecting(true);

    // 1. Гарантированная отправка целевых событий в TikTok Pixel
    if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
      try {
        // Стандартное ключевое событие "Contact" (для оптимизации рекламы TikTok на обращения)
        window.ttq.track('Contact', {
          content_name: 'WhatsApp_Lead_ProgressMed',
          content_category: 'Astana_Oncology',
          currency: 'KZT',
          value: 0,
        });

        // Дополнительное событие клика по кнопке
        window.ttq.track('ClickButton', {
          content_name: 'WhatsApp_Button_Click',
        });
      } catch (e) {
        console.warn('TikTok Pixel tracking error:', e);
      }
    }

    // 2. Формирование ссылки WhatsApp
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 3. Переход в WhatsApp с надежным окном (180ms), чтобы запрос пикселя успел отправиться в TikTok
    setTimeout(() => {
      window.location.href = waUrl;
    }, 180);
  };

  return (
    <main className="min-h-screen w-full bg-[#f6f8f7] relative flex flex-col items-center justify-between px-5 py-6 sm:py-10 select-none overflow-hidden">
      
      {/* Докторский монохромный паттерн в стиле WhatsApp */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230f3b2e' fill-rule='evenodd'%3E%3Cpath d='M25 15h4v-4h4v4h4v4h-4v4h-4v-4h-4z'/%3E%3Cpath d='M85 18c0-2.2 1.8-4 4-4s4 1.8 4 4v10c0 4.4-3.6 8-8 8s-8-3.6-8-8v-3h2v3c0 3.3 2.7 6 6 6s6-2.7 6-6V18h-2z'/%3E%3Ccircle cx='81' cy='18' r='2'/%3E%3Ccircle cx='93' cy='18' r='2'/%3E%3Ccircle cx='85' cy='40' r='3.5'/%3E%3Cpath d='M15 80h10l3-8 5 16 4-12 3 4h12' stroke='%230f3b2e' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M105 75c-3-3-8-3-11 0l-5 5c-3 3-3 8 0 11s8 3 11 0l5-5c3-3 3-8 0-11zm-9.5 9.5l-5.5-5.5c1.5-1.5 4-1.5 5.5 0l5.5 5.5c-1.5 1.5-4 1.5-5.5 0z'/%3E%3Cpath d='M55 110l-4-8v-6h4v-2h-6v2h1v6l-4 8a3 3 0 0 0 2.5 4.5h8a3 3 0 0 0 2.5-4.5z'/%3E%3Cpath d='M115 25c-2 0-3.8 1.2-4.5 3-.7-1.8-2.5-3-4.5-3-2.8 0-5 2.2-5 5 0 4.5 9.5 9.5 9.5 9.5s9.5-5 9.5-9.5c0-2.8-2.2-5-5-5z'/%3E%3Cpath d='M50 40c-2.5 0-4.5 2-4.5 4.5 0 2 1 3.5 1.5 5.5.5 2 1 4 2 4s1.5-3 2-4.5c.5 1.5 1 4.5 2 4.5s1.5-2 2-4c.5-2 1.5-3.5 1.5-5.5 0-2.5-2-4.5-4.5-4.5h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Верхний деликатный статус-бейдж */}
      <div className="z-10 pt-1">
        <div className="inline-flex items-center space-x-2 bg-white/95 backdrop-blur-xs border border-emerald-900/10 px-3.5 py-1 rounded-full shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-medium text-slate-700">
            Дежурный администратор онлайн
          </span>
        </div>
      </div>

      {/* Основная карточка */}
      <div className="w-full max-w-[360px] flex flex-col items-center text-center my-auto py-2 z-10">
        
        {/* Аватарка: подогнана "рамочка в рамочку" с мягким сиянием */}
        <div className="relative mb-4 sm:mb-5 flex items-center justify-center">
          <div className="absolute -inset-7 rounded-full bg-emerald-600/20 blur-2xl pointer-events-none animate-pulse" />
          <div className="absolute -inset-3 rounded-full bg-teal-500/25 blur-xl pointer-events-none" />

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-2xl flex items-center justify-center shrink-0 bg-white">
            <img
              src={LOGO_URL}
              alt="ProgressMed — Клиника в Астане"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-[1.12] select-none"
            />
          </div>
        </div>

        {/* Название клиники */}
        <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 mb-1">
          ProgressMed
        </h1>

        {/* Город и статус */}
        <p className="text-sm font-semibold text-emerald-900 mb-1">
          Медицинский центр • г. Астана
        </p>

        {/* Ключевое позиционирование */}
        <p className="text-xs sm:text-[13px] text-slate-600 font-medium max-w-[280px] mb-4 leading-snug">
          Прием ведущего онкогинеколога страны. Экспертная диагностика и доказательное лечение.
        </p>

        {/* 3 аккуратных тезиса доверия */}
        <div className="w-full bg-white/85 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-3 mb-4 sm:mb-5 space-y-2 text-left shadow-xs">
          <div className="flex items-center space-x-2 text-xs text-slate-700">
            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Прием строго по записи, без ожидания и очередей</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-700">
            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>УЗИ экспертного класса и полный спектр анализов</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-700">
            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>Быстрый ответ и запись администратором в чате</span>
          </div>
        </div>

        {/* Сдержанная благородная темная кнопка WhatsApp */}
        <button
          id="btn-whatsapp-chat"
          onClick={handleWhatsAppClick}
          className="w-full flex items-center justify-center space-x-2.5 bg-[#0e7457] hover:bg-[#0b5c45] active:scale-[0.99] text-white font-semibold text-base py-3.5 px-6 rounded-full transition-all duration-150 shadow-lg shadow-[#0e7457]/25 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#0e7457]" />
          <span>
            {isRedirecting ? 'Переходим в WhatsApp...' : 'Записаться в WhatsApp'}
          </span>
        </button>

        <div className="flex items-center justify-center space-x-3 text-[11px] text-slate-400 mt-2.5 font-medium">
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-emerald-700" />
            <span>Ответ за 1–2 мин</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
            <span>Лицензия Минздрава РК</span>
          </span>
        </div>

      </div>

      {/* Футер для прохождения модерации TikTok Ads */}
      <footer className="w-full max-w-sm pt-4 pb-1 text-center z-10 flex flex-col items-center space-y-2">
        
        {/* Обязательный медицинский дисклеймер */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold px-2">
          Имеются противопоказания. Необходима консультация специалиста
        </p>

        {/* Юридические ссылки (Политика конфиденциальности, Условия использования) */}
        <div className="flex items-center justify-center space-x-2.5 text-[11px] text-slate-500 font-medium">
          <button
            type="button"
            onClick={() => setActiveModal('privacy')}
            className="hover:text-emerald-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Политика конфиденциальности
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setActiveModal('terms')}
            className="hover:text-emerald-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            Условия использования
          </button>
        </div>

        <div className="text-[10px] text-slate-400">
          © {new Date().getFullYear()} ТОО «ProgressMed» • г. Астана • Все права защищены
        </div>
      </footer>

      {/* Модальное окно: Политика конфиденциальности */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-7 max-h-[85vh] flex flex-col text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base sm:text-lg">
                <Lock className="w-5 h-5 text-emerald-700" />
                <span>Политика конфиденциальности</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 py-4 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта медицинского центра ProgressMed (г. Астана), в соответствии с Законом Республики Казахстан «О персональных данных и их защите».
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">1. Сбор информации</h4>
              <p>
                Мы обрабатываем данные, которые вы добровольно предоставляете при обращении через мессенджер WhatsApp (имя, контактный номер телефона, цель обращения для записи на прием к врачу-онкогинекологу).
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">2. Цели обработки</h4>
              <p>
                Собранная информация используется исключительно для консультации, согласования даты и времени приема специалистов, а также подтверждения записи. Медицинские сведения составляют охраняемую законом врачебную тайну.
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">3. Маркетинговые и аналитические пиксели</h4>
              <p>
                На сайте используется сервис веб-аналитики TikTok Pixel для оценки эффективности рекламных кампаний. Пиксель фиксирует факт посещения страницы и клик по кнопке связи. Личные медицинские диагнозы третьим лицам не передаются.
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">4. Защита данных</h4>
              <p>
                Клиника принимает все необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, изменения или разглашения.
              </p>
              <p className="text-[11px] text-slate-400 pt-2">
                Контакты для связи: г. Астана, тел: +7 (708) 425-55-44.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно: Условия использования */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-7 max-h-[85vh] flex flex-col text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base sm:text-lg">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>Условия использования</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 py-4 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Добро пожаловать на информационный сайт медицинского центра ProgressMed. Пользуясь сайтом, вы соглашаетесь со следующими условиями:
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">1. Информационный характер</h4>
              <p>
                Материалы, представленные на сайте, носят исключительно ознакомительный характер и не заменяют очной консультации, диагностики или лечения квалифицированного врача-специалиста.
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">2. Запись на прием</h4>
              <p>
                Нажатие кнопки перехода в мессенджер WhatsApp перенаправляет пользователя на диалог с официальным администратором клиники для уточнения расписания и записи на прием. Окончательное заключение соглашения на оказание медицинских услуг происходит непосредственно в клинике.
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">3. Медицинские противопоказания</h4>
              <p>
                Любые медицинские процедуры и назначения имеют индивидуальные противопоказания. Требуется обязательная консультация лечащего онкогинеколога.
              </p>
              <h4 className="font-semibold text-slate-800 pt-1">4. Интеллектуальная собственность</h4>
              <p>
                Логотип ProgressMed, товарный знак, графические материалы и тексты защищены законодательством Республики Казахстан об интеллектуальной собственности.
              </p>
              <p className="text-[11px] text-slate-400 pt-2">
                Медицинский центр ProgressMed • г. Астана
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
