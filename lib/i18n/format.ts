export function formatTemplate(template: string, vars: Record<string, string | number>): string {
  return Object.keys(vars).reduce((acc, key) => {
    const value = String(vars[key]);
    return acc.replaceAll(`{${key}}`, value);
  }, template);
}

