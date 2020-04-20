import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import { useEffect, useState } from 'react';
import ServerResponse from '../server/interfaces/ServerResponse';
import ServerApi from '../server/enums/ServerApi';
import { isDefined } from '../server/common/ServerUtils';


const { publicRuntimeConfig } = getConfig();


export function proccessServerResponse(serverResponse: ServerResponse): [any, any] {
  if (!serverResponse) {
    throw new Error('Null response from server');
  }

  switch(serverResponse.status) {
    case 'success': {
      return [null, serverResponse.payload];
    }

    case 'fail': {
      console.error(serverResponse.payload);

      return [serverResponse.payload, null];
    }

    default: break;
  }

  return [null, null];
}

export async function getRequest(route: string, params?: any): Promise<[any, any]> {
  let path = `${publicRuntimeConfig.HOST_URL}/${ServerApi.API}/${route}`;

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
    credentials: 'include',
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  };

  const res = await fetch(path, options);

  return proccessServerResponse(await res.json());
}

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}