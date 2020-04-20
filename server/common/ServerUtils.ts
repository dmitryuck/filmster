import fetch from 'isomorphic-unfetch';


export function buildRouteUrl(route: string, ...params: string[]): string {
  return `/${route}${params.reduce((result, param) => result += '/:'+param, '')}`;
}

export function isDefined(...values: any) {
  return values &&
    Array.from(values)
      .every(v => v !== null && v !== undefined && v !== false && v !== 'null' && v !== 'undefined' && v !== 'false' && v !== '');
}

export async function getExtRequest(url: string, params?: any): Promise<any> {
  let path = url;

  if (params) {
    path += Object
      .keys(params)
      .filter(key => isDefined(params[key]))
      .map((key, index) => {
        const startWith = index === 0 ? '?' : '&';
        return startWith + key + '=' + params[key];
      })
      .join('');
  }

  const options: RequestInit = {
    method: 'GET'
  };

  const res = await fetch(path, options);

  return await res.json();
}