export function sectorOverlap(program, sector) {
  if (!sector) return 0;
  return program.sectors?.includes(sector) ? 1 : 0;
}
