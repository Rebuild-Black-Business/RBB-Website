export const scrollToId = id => {
  const element = document.querySelector(id);
  return (
    element &&
    window.scrollTo({
      left: 0,
      top: element.offsetTop - 20,
      behavior: 'smooth',
    })
  );
};
