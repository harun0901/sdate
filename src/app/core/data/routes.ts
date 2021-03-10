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
    root: 'home',
    dashboard: '',
  },
  contractor: {
    root: '/home',
    projects: '',
  },
  root: '',
  home: {
    root: 'home',
    chats: 'chats',
    chatroom_root: 'chatroom',
    chatroom: 'chatroom/:userId',
    inbox: 'inbox',
    visitors: 'visitors',
    likes: 'likes',
    favorites: 'favorites',
    myprofile: 'my-profile',
    profile_root: 'profile',
    profile: 'profile/:userId',
    support: {
      root: 'support',
      guideline: 'guideline',
      faq: 'faq',
      contact: 'contact',
    },
    legal: {
      root: 'legal',
      terms: 'terms',
      privacy: 'privacy',
      imprint: 'imprint',
    }
  },
  dashboard: {
    root: 'dashboard',
    dashboard: 'dashboard',
    manageUser: 'manage-user',
    categoryManage: 'manage-category',
    payment: 'payment',
    manageGift: 'manage-gift',
    manageContact: 'manage-contact',
    manageGuideline: 'manage-guideline',
    manageFaq: 'manage-faq',
    manageTerms: 'manage-terms',
    managePrivacy: 'manage-privacy',
    manageLanguage: 'manage-language',
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
