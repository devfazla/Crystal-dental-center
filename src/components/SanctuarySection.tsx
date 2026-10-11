import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Language } from '../types';
import { SafeImage } from './SafeImage';
import skylineSuiteImg from '../assets/images/sanctuary_skyline_suite_1789122138231.jpg';
import ergonomicChairImg from '../assets/images/sanctuary_ergonomic_chair_1789122152133.jpg';
import gentleCareImg from '../assets/images/sanctuary_gentle_care_1789122167099.jpg';

interface SanctuarySectionProps {
  language: Language;
  onNextSection?: () => void;
}

export const SanctuarySection: React.FC<SanctuarySectionProps> = ({
  language,
}) => {
  const isArabic = language === 'ar';

  const cards = [
    {
      id: 'suites',
      number: '01',
      tagEn: 'PANORAMIC SUITES',
      tagAr: 'أجنحة بإطلالة بانورامية',
      titleEn: 'Private suites above the skyline.',
      titleAr: 'غرف علاجية خاصة فوق أفق المدينة.',
      descEn:
        'Eight floors above Ahmed Al-Jaber Street, the rooms are insulated from traffic noise. Floor-to-ceiling windows bring in daylight and a long view over the city.',
      descAr:
        'في الدور الثامن فوق شارع أحمد الجابر، الغرف معزولة عن ضجيج الشارع. النوافذ الممتدة من الأرضية إلى السقف تدخل الضوء الطبيعي وتفتح النظر على المدينة.',
      highlightsEn: [
        'Soundproofed rooms',
        '8th floor, Crystal Tower',
        'Skyline views',
      ],
      highlightsAr: [
        'غرف معزولة الصوت',
        'الدور الثامن، برج كريستال',
        'إطلالة على الأفق',
      ],
      image: skylineSuiteImg,
      altEn: 'Private dental suite on the 8th floor of Crystal Tower overlooking the Kuwait City skyline',
      altAr: 'غرفة علاجية خاصة في الدور الثامن ببرج كريستال بإطلالة على مدينة الكويت',
      layout: 'image-left', // image [left] texts [right]
      bgClassName: 'bg-[#f1f7f6]', // Fresh subtle mint/teal wash fitting app theme
      badgeAccent: 'text-[#008f7a]',
      dividerAccent: 'bg-[#008f7a]/30',
    },
    {
      id: 'chairs',
      number: '02',
      tagEn: 'ERGONOMIC COMFORT',
      tagAr: 'راحة جسدية متكاملة',
      titleEn: 'Chairs built for long visits.',
      titleAr: 'كراسي تُعدّ للجلسات الطويلة.',
      descEn:
        'Nothing about the chair should leave your body tense. Memory-foam contours and cervical support take the pressure off your neck and back while the work gets done.',
      descAr:
        'لا شيء في الكرسي يجب أن يترك جسدك متوتراً. حواف ميموري فوم ودعامات عنقية تسحب الضغط عن رقبتك وظهرك بينما يجري العمل.',
      highlightsEn: [
        'Memory-foam contours',
        'Neck and back support',
        'Soft ambient lighting',
      ],
      highlightsAr: [
        'حواف ميموري فوم',
        'دعم الرقبة والظهر',
        'إضاءة هادئة',
      ],
      image: ergonomicChairImg,
      altEn: 'Ergonomic dental chair with memory foam cervical support',
      altAr: 'كرسي أسنان إرجونومي بدعامات ميموري فوم للرقبة والظهر',
      layout: 'text-left', // texts [left] image [right]
      bgClassName: 'bg-[#faf6f0]', // Soft warm cashmere/sand clinic sanctuary wash
      badgeAccent: 'text-[#008f7a]',
      dividerAccent: 'bg-[#d8c3a5]/50',
    },
    {
      id: 'care',
      number: '03',
      tagEn: 'GENTLE CARE',
      tagAr: 'رعاية لطيفة',
      titleEn: 'At your pace, with nothing hidden.',
      titleAr: 'على سرعتك، وبدون شيء مخفي.',
      descEn:
        'We show you the images, explain the step before it happens, and answer questions before we begin. There’s no rushing, no pressure to decide on the spot.',
      descAr:
        'نريك الصور، ونشرح كل خطوة قبل أن تحدث، ونجيب عن أسئلتك قبل أن نبدأ. لا استعجال، ولا ضغط لتقرر في اللحظة.',
      highlightsEn: [
        'Consultations without a clock on them',
        'Digital images, explained',
        'A team that takes it slowly',
      ],
      highlightsAr: [
        'استشارات بلا ساعة تعدّ',
        'صور رقمية مشروحة',
        'فريق يأخذ وقته',
      ],
      image: gentleCareImg,
      altEn: 'Calm consultation at Crystal Dental Center',
      altAr: 'استشارة هادئة في مركز كريستال للأسنان',
      layout: 'image-left', // image [left] texts [right]
      bgClassName: 'bg-[#eef4f8]', // Serene pale sky/cool slate medical wash
      badgeAccent: 'text-[#008f7a]',
      dividerAccent: 'bg-[#004d5a]/25',
    },
  ];

  return (
    <section id="experience" className="w-full">
      {/* Section Header: OUR CLINIC */}
      <div className="w-full bg-surface border-b border-outline-variant/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          <h2 className="font-headline-xl text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-[62px] lg:leading-[66px] text-on-surface uppercase tracking-tight text-center font-extrabold">
            {isArabic ? (
              <span className="heading-accent">عيادتنا</span>
            ) : (
              <>Our <span className="heading-accent">Clinic.</span></>
            )}
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base lg:text-lg font-normal max-w-2xl text-center leading-relaxed">
            {isArabic
              ? 'في الدور الثامن من برج كريستال بالشرق؛ مهيأة للهدوء والضوء والخصوصية.'
              : 'On the 8th floor of Crystal Tower in Sharq, laid out around quiet, light and privacy.'}
          </p>
        </motion.div>
      </div>

      {/* Alternating Full-Screen Sections with Customized App-Theme Backgrounds */}
      {cards.map((card) => {
        const isImageLeft = card.layout === 'image-left';

        return (
          <div
            key={card.id}
            id={`sanctuary-${card.id}`}
            className={`md:min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-outline-variant/30 last:border-b-0 ${card.bgClassName} transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
              {/* IMAGE COLUMN */}
              <motion.div
                initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full ${
                  isImageLeft
                    ? 'lg:order-1'
                    : 'order-1 lg:order-2'
                }`}
              >
                <div className="w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-white/70 border border-slate-200/80 shadow-md relative group">
                  <SafeImage
                    src={card.image}
                    alt={isArabic ? card.altAr : card.altEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* TEXT COLUMN */}
              <motion.div
                initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full text-left rtl:text-right ${
                  isImageLeft
                    ? 'lg:order-2'
                    : 'order-2 lg:order-1'
                }`}
              >
                {/* Number & Category Marker */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#008f7a] tracking-wider">
                    {card.number}
                  </span>
                  <span className={`w-8 h-[1.5px] ${card.dividerAccent}`} />
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-semibold">
                    {isArabic ? card.tagAr : card.tagEn}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 tracking-tight leading-[1.2] mb-5">
                  {isArabic ? card.titleAr : card.titleEn}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-8 max-w-xl">
                  {isArabic ? card.descAr : card.descEn}
                </p>

                {/* Clean Feature Highlights */}
                <div className="flex flex-wrap gap-2.5">
                  {(isArabic ? card.highlightsAr : card.highlightsEn).map(
                    (highlight, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-slate-200/90 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 text-[#008f7a] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
};


