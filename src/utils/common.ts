export const debounce = (fn: any, delay: number) => {
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  return function (...args: any) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
