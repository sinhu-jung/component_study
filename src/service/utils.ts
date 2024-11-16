export const measureLines = (elem: HTMLTextAreaElement, val: string) => {
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
