import { AppContext, App, Plugin } from "vue";
import { IndicatorCard } from '../packages/indicator-card'
import { Bullet } from '../packages/bullet'

export type SFCWithInstall<T> = T & Plugin;
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export function withInstall<T, E extends Record<string, any>>(
  main: T,
  name?: string,
  extra?: E | undefined
): SFCWithInstall<T> & E {
  (main as any).name = (main as any).name ?? name;
  (main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }

    app.component('IndicatorCard', IndicatorCard)
    app.component('Bullet', Bullet);
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
}