export function toTime(hours: number, minutes: number): number {
  return hours * 2 + minutes / 30;
}

export function fromTime(time: number): [hour: string, minute: string] {
  const hr = Math.floor(time / 2);
  const hour = `${hr < 10 ? '0' : ''}${hr}`;
  const mn = Math.floor(((time / 2) % 1) * 60);
  const minute = `${mn < 10 ? '0' : ''}${mn}`;
  return [hour, minute];
}