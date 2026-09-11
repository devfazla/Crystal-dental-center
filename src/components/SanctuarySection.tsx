import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Language } from '../types';
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
      tagAr: 'أجنحة هادئة بإطلالة بانورامية',
      titleEn: 'Private suites above the city skyline.',
      titleAr: 'غرف علاجية خاصة تعلو أفق المدينة.',
      descEn:
        'Located on the 8th floor of Crystal Tower in Sharq, our private suites are designed as a quiet sanctuary. Acoustic insulation shields you from street noise, while floor-to-ceiling windows bring in natural light and tranquil skyline views.',
      descAr:
        'في الدور الثامن من برج كريستال بالشرق، صُممت غرفنا الخاصة كملاذ هادئ بعيداً عن صخب الشارع. عزل صوتي متطور ونوافذ بانورامية ممتدة تمنحك إضاءة طبيعية وإطلالة تبعث على الاسترخاء والاطمئنان.',
      highlightsEn: [
        'Soundproofed Private Suites',
        '8th Floor · Crystal Tower',
        'Kuwait Skyline Views',
      ],
      highlightsAr: [
        'غرف خاصة معزولة تماماً',
        'الدور الثامن · برج كريستال',
        'إطلالة بانورامية على أفق الكويت',
      ],
      image: skylineSuiteImg,
      altEn: 'Private luxury dental suite on the 8th floor of Crystal Tower overlooking Kuwait City skyline',
      altAr: 'غرفة علاجية خاصة بإطلالة بانورامية هادئة على مدينة الكويت في برج كريستال',
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
      titleEn: 'Contoured chairs engineered for absolute ease.',
      titleAr: 'كراسي علاجية مصممة لراحتك التامة.',
      descEn:
        'Physical tension shouldn’t be part of dental visits. Our treatment chairs are crafted with bespoke memory foam contours and tailored cervical neck support, relieving pressure points so your entire body remains relaxed from start to finish.',
      descAr:
        'لا مكان للإجهاد البدني أثناء العلاج. كراسينا الطبية مجهزة بدعامات ميموري فوم مخصصة تسند الرقبة والظهر وتخفف نقاط الضغط، لتشعر براحة جسدية تامة طوال مدة زيارتك.',
      highlightsEn: [
        'Bespoke Memory Foam Contours',
        'Cervical Neck & Back Support',
        'Calming Ambient Illumination',
      ],
      highlightsAr: [
        'دعامات ميموري فوم فائقة الراحة',
        'إسناد مريح للرقبة والظهر',
        'إضاءة هادئة ومريحة للعين',
      ],
      image: ergonomicChairImg,
      altEn: 'Bespoke ergonomic contoured dental chair with cervical memory foam support',
      altAr: 'كرسي أسنان طبي فائق الراحة بتصميم إرجونومي يدعم راحة الظهر والرقبة',
      layout: 'text-left', // texts [left] image [right]
      bgClassName: 'bg-[#faf6f0]', // Soft warm cashmere/sand clinic sanctuary wash
      badgeAccent: 'text-[#008f7a]',
      dividerAccent: 'bg-[#d8c3a5]/50',
    },
    {
      id: 'care',
      number: '03',
      tagEn: 'GENTLE PATIENT CARE',
      tagAr: 'رعاية إنسانية مطمئنة',
      titleEn: 'Paced entirely to your comfort, with complete transparency.',
      titleAr: 'رعاية هادئة تسير وفق راحتك وبشفافية تامة.',
      descEn:
        'We take the time to listen, explain every step with high-definition digital imaging, and answer every question before we begin. No rushing, no pressure — just gentle, compassionate care that eliminates dental anxiety.',
      descAr:
        'نمنحك كامل الوقت للاستماع والإجابة عن كل استفسار بشفافية وباستخدام أحدث تقنيات التصوير الرقمي قبل البدء. لا استعجال ولا ضغوط — فقط رعاية طبية هادئة تزيل أي رهبة وتمنحك راحة البال والثقة.',
      highlightsEn: [
        'Unrushed Consultations',
        'Clear Digital Imaging Explanations',
        'Gentle, Compassionate Team',
      ],
      highlightsAr: [
        'استشارات هادئة دون أي استعجال',
        'شرح شفاف بالتصوير الرقمي',
        'فريق طبي ودود ومطمئن',
      ],
      image: gentleCareImg,
      altEn: 'Gentle and reassuring consultation with patient in calm luxury clinic suite',
      altAr: 'استشارة طبية هادئة ومطمئنة في عيادة كريستال',
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
          <h2 className="font-headline-xl text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-[62px] lg:leading-[66px] text-on-surface uppercase tracking-tight text-center">
            {isArabic ? 'عيادتنا' : 'OUR CLINIC'}
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base lg:text-lg font-normal max-w-2xl text-center leading-relaxed">
            {isArabic
              ? 'تقع في الدور الثامن من برج كريستال بالشرق — صُممت لتمنحكم أقصى درجات الراحة والهدوء والخصوصية التامة.'
              : 'Located on the 8th floor of Crystal Tower in Sharq — designed for your tranquility, physical ease, and complete peace of mind.'}
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
            className={`min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-b border-outline-variant/30 last:border-b-0 ${card.bgClassName} transition-colors duration-300`}
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
                  <img
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


