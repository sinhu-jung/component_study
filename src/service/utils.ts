export const measureLines = (elem: HTMLElement, val: string) => {
  if (!elem || !val) return 0;
  const canvas = document.createElement("canvas");
  const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
  const style = window.getComputedStyle(elem);
  context.font = `${style.getPropertyValue(
    "font-size"
  )} ${style.getPropertyValue("font-family")}`;
  const metrics = val.split("\n").reduce((r, c) => {
    return (
      r +
      Math.max(Math.ceil(context.measureText(c).width / elem.offsetWidth), 1)
    );
  }, 0);
  return metrics;
};

export const randomize = ({
  min = 0,
  max = 0,
  step = 1,
}: {
  min: number;
  max: number;
  step: number;
}) => {
  if (max < min || max - min < step) throw new Error("wrong args");
  const num = Math.random() * (max - min) + min; // min << num << max
  return Math.max(Math.floor(num / step) * step, min);
};

export const pickRandom = <T>({
  data = [],
  length = 1,
}: {
  data: T[];
  length: number;
}) => {
  const shuffled = [...data].sort(() => (Math.random() - 0.5 > 0 ? 1 : -1));
  return shuffled.slice(0, length);
};

export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
