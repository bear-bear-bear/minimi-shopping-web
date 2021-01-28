const preloadImages = () => {
  // 이미지 디렉터리 경로
  const IMG_DIR_PATH = 'https://bear-bear-bear.github.io/minimi-shopping-web/src/img';
  const images = {
    blue: ['t', 'p', 's'],
    yellow: ['t', 'p', 's'],
    pink: ['t', 'p', 's'],
  };

  const allPath = Object.keys(images)
    .reduce((acc, color) => {
      const categorys = images[color];
      const paths = categorys.map((category) => `${IMG_DIR_PATH}/${color}_${category}.png`);

      acc.push(paths);
      return acc;
    }, [])
    .flat();

  allPath.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

export default preloadImages;
