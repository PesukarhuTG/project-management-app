const checkTokenExpired = () => {
  const expTime = Number(localStorage.getItem('expToken'));
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime > expTime) {
    return false;
  }
  return true;
};

export default checkTokenExpired;
