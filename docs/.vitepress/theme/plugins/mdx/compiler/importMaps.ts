// importMaps

const importMaps: Record<string, any> = {};

export function addImportMap(key: string, value: any) {
  importMaps[key] = value;
}

export function handleImportMaps(script: string) {
  const _window = window as any;

  if (!_window.importMaps) _window.importMaps = importMaps;
  script = handleDefault(script);

  script = script.replace(
    /import(.*?)from\s+['"](.*?)['"]/g,
    (match, p1, p2) => {
      const key = p2;
      const value = importMaps[key];

      if (value) {
        if (!importMaps[`${key}`]) {
          importMaps[`${key}`] = value;
        }

        // 处理命名导出 { Line, Bar } 的情况
        if (p1.trim().startsWith('{') && p1.trim().endsWith('}')) {
          const namedImports = p1.trim().slice(1, -1).split(',').map((item: string) => item.trim());
          const assignments = namedImports.map((importName: string) => {
            const [importedName, localName] = importName.split(' as ').map((s: string) => s.trim());
            const finalName = localName || importedName;
            return `const ${finalName} = importMaps['${p2}']['${importedName}']`;
          });
          return assignments.join(';\n');
        }

        return `const ${p1} = importMaps['${p2}']`;
      } else {
        return match;
      }
    }
  );
  return script;
}

function handleDefault(script: string) {
  return script
    .replace(/import(.*?)from\s+['"]vue['"]/g, (_match, p1) => {
      p1 = p1.replace(/\sas\s/g, ":");
      return `const ${p1} = _vue`;
    })
    .replace(/import 'vue'/g, ""); // import {} from 'vue' ->
}
