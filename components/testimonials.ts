const A = "/assets";

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  body: string;
  logo?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Felix Ohswald",
    role: "CEO & Founder, GoStudent",
    avatar: `${A}/12f172cd6a6e33fb.png`,
    quote:
      "“The most important part of growing your business is establishing a foundation of trustworthy, competent employees…”",
    body: "Even if you are hiring quickly, it’s vital that every new hire embodies the company culture and ethos you want to maintain. Sophie was one of the main drivers of our company’s growth and managed to build an unmatched, top-tier team. If you ever have the chance to work with Highflyers – do it!",
    logo: `${A}/2ed0dfe2d3ea0220.png`,
  },
  {
    name: "Benedict Kurz",
    role: "CEO & Co-Founder Knowunity",
    avatar: `${A}/12471f895ddbbdb1.png`,
    quote:
      "“We were able to fill several of our most critical key positions with top-tier talent...”",
    body: "What impressed us most was the unique combination of speed, precision, and the team’s deep market expertise. Every candidate introduced was not only outstanding in terms of skills but also aligned with our company culture and long-term vision.",
  },
  {
    name: "Laurent Martinot",
    role: "CEO & Founder",
    avatar: `${A}/a8900c96b0b1f1af.png`,
    quote:
      "“If recruiting were an Olympic sport, Highflyers would already have several gold medals…”",
    body: "Efficient, sharp, and always in a good mood — Sophie somehow manages to make job talks feel like coffee with a friend (but with results!).",
    logo: `${A}/156459ed87cc9b3a.webp`,
  },
  {
    name: "Ali Mahlodji",
    role: "CEO & Founder futureOne",
    avatar: `${A}/56f8dc966aa6fe08.png`,
    quote:
      "“Our experience with this recruitment process was nothing short of extraordinary…”",
    body: "The speed and efficiency with which our new team member was identified and onboarded were beyond our expectations. The new hire was not just a fit skill-wise but also melded perfectly with the culture at futureOne. We highly recommend their services to anyone looking for a swift, effective, and culturally aligned recruitment solution.",
  },
  {
    name: "Sebastian Haupt",
    role: "CEO & Founder, Sell&Stay",
    avatar: `${A}/f3fa58a41501a9ec.jpg`,
    quote:
      "“Outstanding recruiting services. We’ve already partnered with Highflyers for several key positions across our Family Office...”",
    body: "And the results have been excellent every time. Most recently, we successfully hired our new Managing Director through their support – a perfect match in both expertise and cultural fit. We couldn’t be happier with the outcome and fully recommend Highflyers for critical executive hires.",
    logo: `${A}/5ba6e57aca0dcf3d.png`,
  },
  {
    name: "Vlado Stanic",
    role: "CEO & Founder, OnZero",
    avatar: `${A}/18d9fa8d93100075.png`,
    quote: "“Highflyers delivered outstanding recruitment support…”",
    body: "Achieving swift, diverse, and highly efficient results, their insightful consultations were instrumental in pinpointing the ideal candidates for our crucial roles. The ability to understand our unique needs and match them with top-tier talent was impressive. I wholeheartedly recommend their services to any organization seeking to build a strong, skilled team.",
  },
];
