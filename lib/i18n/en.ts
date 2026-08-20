import type { Translations } from './types';

export const en: Translations = {
  nav: {
    home: 'Home',
    services: 'Services',
    portfolio: 'Results',
    process: 'How we work',
    contact: 'Contact',
    cta: 'Get online',
    lang_label: 'Change language',
  },
  hero: {
    headline: "If you're not online,\nyou don't exist.",
    subheadline:
      'We build your digital presence from scratch: your website, your social media, and your place on Google. So your customers can find you, choose you, and come back.',
    cta_primary: 'I want to exist online',
    cta_secondary: 'See how we do it',
  },
  services: {
    title: 'Services',
    subtitle: 'Everything your business needs to shine online.',
    cta: 'Talk to us',
    items: [
      {
        title: 'Presence from scratch',
        description:
          'Starting from zero? We build everything: brand, logo, website, and profiles. You launch online with a complete, professional image.',
      },
      {
        title: 'Social media management',
        description:
          'We handle your social media: content, posts, responses. Your brand stays active and growing without you lifting a finger.',
      },
      {
        title: 'Advertising that sells',
        description:
          'Campaigns on Google and social media designed to bring real customers, not just "likes". We track every dollar spent.',
      },
      {
        title: 'Show up on Google',
        description:
          'We optimize your Google profile so you appear on the map and in searches when someone needs what you offer.',
      },
      {
        title: 'Professional website',
        description:
          'A page that loads fast, looks amazing on mobile, and turns visitors into customers.',
      },
    ],
  },
  portfolio: {
    title: 'Results',
    subtitle: "Real clients, not made up. This is what we built for businesses like yours.",
    items: [
      {
        title: 'BFS Karate',
        type: 'Client · Martial arts',
        description:
          'A complete digital presence from scratch: website, social media management, and an optimized Google profile so they show up when someone searches for a place to train.',
      },
      {
        title: 'Imperial Barbershop',
        type: 'Client · Barbershop',
        description:
          'Website and optimized Google profile so they show up when someone searches for a place to get a haircut.',
      },
      {
        title: 'The Latin Grill',
        type: 'Client · Restaurant',
        description:
          'We redesigned their site from scratch — clear menu and info, mobile-ready — so it looks as good as their food.',
      },
    ],
  },
  process: {
    title: 'How we work',
    subtitle: 'From invisible to unstoppable, in simple steps.',
    phases: [
      {
        title: 'We talk',
        description: 'You tell us about your business. We understand what you sell, to whom, and what you want to achieve.',
        details: [
          '30-minute intro call',
          'We listen, we don\'t pitch first',
          'We ask the right questions',
          'No jargon, in your language',
          'We define if there\'s a fit',
        ],
      },
      {
        title: 'We design your strategy',
        description: 'We build a plan tailored to you: what you need, in what order, and what results to expect.',
        details: [
          'Personalized proposal',
          'Clear priorities',
          'Realistic timeline',
          'Transparent pricing',
          'Everything in writing',
        ],
      },
      {
        title: 'We build',
        description:
          'We create your presence: site, social media, profiles, campaigns. We keep you in the loop without you needing to understand technology.',
        details: [
          'Website or profiles per plan',
          'Weekly updates',
          'Your approval at every step',
          'No surprises or hidden costs',
          'Delivered on time',
        ],
      },
      {
        title: 'We launch and measure',
        description: "You go live. And we show you results in clear numbers.",
        details: [
          'Coordinated launch',
          'Initial results report',
          'How many people saw and contacted you',
          'Quick post-launch adjustments',
          'Simple metrics dashboard',
        ],
      },
      {
        title: 'We grow together',
        description: 'We adjust, improve, and grow your presence month after month.',
        details: [
          'Monthly follow-up',
          'Updated content',
          'Optimized campaigns',
          'Direct WhatsApp support',
          'You focus on your business',
        ],
      },
    ],
  },
  contact: {
    title: "Let's talk",
    subtitle:
      'Tell us about your business. We\'ll tell you exactly what you need to start existing online.',
    picker_label: 'What does your business need?',
    categories: {
      consultation: {
        label: 'Initial consultation',
        description: "I want to know where to start. I need guidance before deciding.",
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: '',
      },
      app: {
        label: 'Website',
        description: 'I need a professional website for my business.',
        platform_label: 'Do you currently have a website?',
        platform_options: ['No, starting from scratch', 'Yes, I want to improve it', 'I have one but it\'s outdated'],
        users_label: '',
        stack_label: '',
      },
      internal: {
        label: 'Social media',
        description: 'I want to better manage my social media or have someone do it for me.',
        platform_label: '',
        platform_options: [],
        users_label: 'Which platforms are you on or want to be on?',
        stack_label: '',
      },
      api: {
        label: 'Online advertising',
        description: 'I want Google, Instagram, or Facebook campaigns that bring real customers.',
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: 'Do you have a monthly advertising budget?',
      },
      other: {
        label: 'Something else',
        description: "I have something specific in mind. I'll explain directly.",
        platform_label: '',
        platform_options: [],
        users_label: '',
        stack_label: '',
      },
    },
    form: {
      name: 'Name',
      name_placeholder: 'Your full name',
      email: 'Email',
      email_placeholder: 'you@email.com',
      company: 'Business (optional)',
      company_placeholder: 'Your business or brand name',
      message: 'Tell us about your business',
      message_placeholder:
        'What do you sell? Who are your customers? What\'s your biggest challenge getting more? The more you tell us, the better we can help.',
      submit: 'I want my call',
      submitting: 'Sending...',
      success_title: 'Message received!',
      success_message: "We'll get in touch within 24 hours. Check your email.",
      back: '← Change option',
    },
  },
  cta: {
    title: 'Your competition is already\nonline. Are you?',
    subtitle:
      'Book a 30-minute call. We\'ll tell you exactly what your business needs to start existing online. No commitment.',
    button: 'I want my call',
    note: 'No commitment. Just a conversation.',
  },
  footer: {
    tagline: 'We make you exist on the internet.',
    services_title: 'Services',
    company_title: 'Company',
    contact_title: 'Contact',
    services_links: ['Professional website', 'Social media', 'Online advertising'],
    company_links: ['Results', 'How we work', 'Contact'],
    rights: '© 2026 AlphaDev Studios. All rights reserved.',
    privacy: 'Privacy',
    terms: 'Terms',
  },
};
