import React from 'react';
import { Skeleton } from '@chakra-ui/core';

/**
 * Image skeleton, shows before image is loaded on slower devices
 * @param {string} height - The height of the image. Set to 100% by default
 */
const ImageSkeleton = ({ height = '100%' }) => {
  return <Skeleton height={height} />;
};

export default ImageSkeleton;
