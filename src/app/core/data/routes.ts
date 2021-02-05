export const ROUTES = {
  auth: {
    login: '/',
    redirect: 'redirect'
  },
  client: {
    root: '/home',
    myProjects: '',
  },
  admin: {
    root: '/home',
    dashboard: '',
  },
  contractor: {
    root: '/home',
    projects: '',
  },
  landingPages: {
    contactUs: 'contact-us',
    whyChooseUs: 'why-choose-us',
    aboutUs: 'about-us',
    patioPackages: 'patio-packages',
    partners: 'partners',
    faqs: 'faqs',
    privacyPolicy: 'privacy-policy',
    legalNotice: 'legal-notice',
    requestEstimate: {
      root: 'request-estimate',
      step1: 'step-1',
      step2: 'step-2',
      step3: 'step-3',
      step4: 'step-4'
    },
    requestApplication: 'request-application',
    ideaBoard: 'idea-board',
    hardscapeEducation: 'hardscape-education',
    services: {
      root: 'services',
      patios: 'patios',
      walkways: 'walkways',
      retainingWalls: 'retaining-walls',
      driveways: 'driveways',
      poolPatios: 'pool-patios',
      completeTransformations: 'complete-transformations',
      designServices: 'design-services',
      stepsAndStaircases: 'steps-and-staircases',
      inlaysAndBorders: 'inlays-and-borders',
      paversVsConcrete: 'pavers-vs-concrete',
    },
    blog: 'blog'
  },
  // marketing landing pages
  marketingPages: {
    ct: {
      root: 'ct',
      tolland: 'tolland',
      fairfield: 'fairfield',
      hartford: 'hartford',
      litchfield: 'litchfield',
      middlesex: 'middlesex',
      newHaven: 'new-haven',
      newLondon: 'new-london',
      windham: 'windham',
    },
    westernMass: {
      root: 'westernmass',
    },
  },
  // local landing pages
  localPages: {
    contents: {
      financing: 'financing',
      freeFirePit: 'free-fire-pit',
      seasonSpecial: 'season-special'
    },
    ma: {
      root: 'ma',
      hampden: 'hampden'
    },
    ct: {
      root: 'ct',
      tolland: 'tolland'
    }
  },
  externalLinks: {
    login: 'login',
    redirect: 'redirect'
  }
};

export function toAbsolutePath(path: string | string[]): string {
  // this function accepts string or string array
  // CAUTION! - be aware, send only valid array or string
  if (typeof path === 'string') {
    return '/' + path;
  } else {
    return '/' + path.join('/');
  }
}
