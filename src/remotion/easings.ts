export const easeOut = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOut = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export const spring = (t: number, stiffness = 180, damping = 12): number => {
  const omega = Math.sqrt(stiffness);
  const zeta = damping / (2 * omega);
  const envelope = Math.exp(-zeta * omega * t);
  const frequency = omega * Math.sqrt(1 - zeta * zeta);
  return 1 - envelope * Math.cos(frequency * t);
};

export const linear = (t: number): number => t;
