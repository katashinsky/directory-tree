// @ts-ignore
interface Array {
  last: () => any;
}

Array.prototype.last = function (): any {
  return this[this.length - 1];
};
