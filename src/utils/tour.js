function changeTypeToString(code) {
  if (code === '12') {
    return '관광지';
  }
  if (code === '14') {
    return '문화시설';
  }
  if (code === '15') {
    return '축제공연행사';
  }
  if (code === '25') {
    return '여행코스';
  }
  if (code === '28') {
    return '레포츠';
  }
  if (code === '32') {
    return '숙박';
  }
  if (code === '38') {
    return '쇼핑';
  }
  if (code === '39') {
    return '음식점';
  }
}

export { changeTypeToString };
