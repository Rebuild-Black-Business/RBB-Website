const BASE_SITE_URL = 'https://www.rebuildblackbusiness.com';

export default {
  siteMetadata: {
    title: `Rebuild Black Business`,
    // eslint-disable-next-line max-len
    description: `Restore wealth to Black communities through economic empowerment and resource allocation.`,
    author: {
      name: 'Rebuild Black Business',
    },
    organization: {
      name: 'Rebuild Black Business',
      url: BASE_SITE_URL,
      logo:
        'https://res.cloudinary.com/rebuild-black-business/image/upload/v1591562585/assets/RBBLogoFinal_ugdskx.png',
    },
    seo: {
      title: `Rebuild Black Business`,
      description: `Restore wealth to Black communities through economic empowerment and resource allocation.`,
      image:
        'https://res.cloudinary.com/rebuild-black-business/image/upload/v1591726474/assets/rbb-socialimage_g7rhcj.jpg',
    },
    social: {
      twitter: 'rebuildingblack',
      fbAppID: 'RebuildingBlack',
      instagram: 'rebuildingblack',
      github: 'https://github.com/Rebuild-Black-Business',
      contact: 'social@rebuildblackbusiness.com',
      bugs: 'engineering@rebuildblackbusiness.com',
      image:
        'https://res.cloudinary.com/rebuild-black-business/image/upload/v1591726474/assets/rbb-socialimage_g7rhcj.jpg',
    },
    logo: {
      src: '#',
      alt: 'Rebuild Black Business',
    },
    image: `https://res.cloudinary.com/rebuild-black-business/image/upload/v1591726474/assets/rbb-socialimage_g7rhcj.jpg`, // used for RSS feed image and SEO fallback
    logoText: 'Rebuild Black Business',
    siteUrl: BASE_SITE_URL,
    menuLinks: [
      {
        name: 'About',
        slug: '/about',
      },
      {
        name: 'Businesses',
        slug: '/businesses',
      },
      {
        name: 'Fundraisers',
        slug: '/fundraisers',
      },
      {
        name: 'Allies',
        slug: '/allies',
      },
    ],
    photoCreditLinks: [
      {
        photographer: 'Clay Banks',
        url: 'https://www.instagram.com/clay.banks',
        pagePathname: '/',
      },
      {
        photographer: 'John Cameron',
        url: 'https://unsplash.com/@john_cameron',
        pagePathname: '/',
      },
      {
        photographer: 'Kelly Lacy',
        url: 'https://instagram.com/kellymlacy',
        pagePathname: '/',
      },
      {
        photographer: 'Mike Von',
        url: 'https://thevoncomplex.com',
        pagePathname: '/',
      },
      {
        photographer: 'Kelly Lacy',
        url: 'https://instagram.com/kellymlacy',
        pagePathname: '/about',
      },
      {
        photographer: 'WOCinTechChat.com',
        url: 'http://www.wocintechchat.com/',
        pagePathname: '/about',
      },
      {
        photographer: 'Allison Christine',
        url: 'https://www.instagram.com/happpyal/',
        pagePathname: '/about',
      },
      {
        photographer: 'Chris Slupski',
        url: 'https://unsplash.com/@kslupski',
        pagePathname: '/about',
      },
      {
        photographer: 'Jason Leung',
        url: 'https://www.instagram.com/xninjason/',
        pagePathname: '/businesses',
      },
      {
        photographer: 'Julian Myles',
        url: 'https://julianmyles.nyc',
        pagePathname: '/businesses',
      },
      {
        photographer: 'Joe Yates',
        url: 'https://www.instagram.com/josephyates_/',
        pagePathname: '/allies',
      },
      {
        photographer: 'Logan Weaver ',
        url: 'https://lgnwvrphto.com',
        pagePathname: '/allies',
      },
    ],
  },
};
