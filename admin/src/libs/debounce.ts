// Your debounce function
const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: Parameters<F>) => {
    console.count("debounce");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
