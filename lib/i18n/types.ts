export interface TranslationCategory {
  label: string;
  description: string;
  platform_label: string;
  platform_options: readonly string[];
  users_label: string;
  stack_label: string;
}

export interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    process: string;
    contact: string;
    cta: string;
    lang_label: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    cta: string;
    items: ReadonlyArray<{ title: string; description: string }>;
  };
  portfolio: {
    title: string;
    subtitle: string;
    items: ReadonlyArray<{ title: string; type: string; description: string }>;
  };
  process: {
    title: string;
    subtitle: string;
    phases: ReadonlyArray<{ title: string; description: string; details: readonly string[] }>;
  };
  contact: {
    title: string;
    subtitle: string;
    picker_label: string;
    categories: {
      consultation: TranslationCategory;
      app: TranslationCategory;
      internal: TranslationCategory;
      api: TranslationCategory;
      other: TranslationCategory;
    };
    form: {
      name: string;
      name_placeholder: string;
      email: string;
      email_placeholder: string;
      company: string;
      company_placeholder: string;
      message: string;
      message_placeholder: string;
      submit: string;
      submitting: string;
      success_title: string;
      success_message: string;
      back: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    note: string;
  };
  footer: {
    tagline: string;
    services_title: string;
    company_title: string;
    contact_title: string;
    services_links: readonly string[];
    company_links: readonly string[];
    rights: string;
    privacy: string;
    terms: string;
  };
}
