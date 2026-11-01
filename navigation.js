/* Shared by the viewer and its navigation tests. Page indices are zero-based. */
globalThis.VWBook = {
  start(page, count, spread) {
    page = Math.max(0, Math.min(count - 1, Math.trunc(page) || 0));
    return spread && page > 0 ? (page % 2 ? page : page - 1) : page;
  },
  visible(page, count, spread) {
    const start = this.start(page, count, spread);
    return spread && start > 0 && start + 1 < count ? [start, start + 1] : [start];
  },
  move(page, direction, count, spread) {
    const start = this.start(page, count, spread);
    if (!spread) return this.start(start + direction, count, false);
    const next = direction > 0 ? (start === 0 ? 1 : start + 2) : (start <= 1 ? 0 : start - 2);
    return this.start(next, count, true);
  },
  fromHash(hash, count) {
    const match = /^#page=(-?\d+)$/.exec(hash);
    return match ? this.start(Number(match[1]) - 1, count, false) : 0;
  }
};
