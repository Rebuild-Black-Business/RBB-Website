const slugify = require('slugify');
const { toCamelCase } = require('./stringUtils');

// slug will look something like
// business-name-with-hyphens-rec123456
// where "rec123456" is the airtable ID for this business
// fallback is to generate a slug of _just_ the airtable id if no name is provided
exports.getSlugForBusiness = ({ name, businessName, airtableId }) => {
  if (!airtableId) {
    return null;
  }
  return `${slugify(businessName || name).toLowerCase()}-${airtableId}`;
};

// TODO: Replace with real fallback images for each category.
// This should all probably be defined in the database somewhere, eh?
const categoryData = {
  other: {
    label: 'Other',
    image: {
      src: 'assets/business-entertainment',
      alt: 'Other',
    },
    buttonText: 'Learn More',
  },
  entertainment: {
    label: 'Entertainment',
    image: {
      src: 'assets/business-entertainment-option',
      alt: 'Entertainment business',
    },
    buttonText: 'Learn more',
  },
  foodAndBeverage: {
    label: 'Food and Beverage',
    image: {
      src: 'assets/business-food-beverage',
      alt: 'Food and beverage business',
    },
    buttonText: 'Order',
  },
  healthAndWellness: {
    label: 'Health and Wellness',
    image: {
      src: 'assets/business-health',
      alt: 'Health and wellness business',
    },
    buttonText: 'Learn more',
  },
  professionalServices: {
    label: 'Professional Services',
    image: {
      src: 'assets/business-services',
      alt: 'Professional servicess business',
    },
    buttonText: 'Contact',
  },
  retail: {
    label: 'Retail',
    image: {
      src: 'assets/business-retail',
      alt: 'Retail business',
    },
    buttonText: 'Shop',
  },
};

const getCategory = category =>
  category ? toCamelCase(category.name || category) : 'Other';

exports.useImageForBusiness = business => {
  const { category, imageAlt, imageSrc } = business;

  const catVar = getCategory(category);

  const hasFallbackImage =
    category && Object.keys(categoryData).includes(catVar);
  const hasImage = !!(imageSrc || hasFallbackImage);

  let publicId = null;
  if (categoryData[catVar]) {
    publicId = categoryData[catVar].image.src;
  }

  let alt = imageAlt;
  if (!alt) {
    if (categoryData[catVar]) {
      alt = categoryData[catVar].image.alt;
    }
  }

  debugger;
  return {
    hasImage,
    publicId: !imageSrc ? publicId : 'assets/business-entertainment',
    src: imageSrc ? imageSrc : null,
    alt,
  };
};

exports.useCategoryMetadataForBusiness = category => {
  // I'm not sure how categories are going to work, so this probaably needs to
  // change. Also unsure how we're going to handle the schema category on the
  // card wrapee
  const catVar = getCategory(category);

  const categoryLabel =
    (categoryData[catVar] && categoryData[catVar].label) || category;

  let buttonText = 'Learn More';
  if (category && categoryData[category]) {
    buttonText = categoryData[category].buttonText;
  }
  return { label: categoryLabel, buttonText };
};
