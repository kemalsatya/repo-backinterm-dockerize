export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HateoasLink {
  rel: string,
  href: string,
  method: HttpMethod
}

export const link = {
  self:       (href: string): HateoasLink => ({ rel: 'self',       href, method: 'GET' }),
  update:     (href: string): HateoasLink => ({ rel: 'update',     href, method: 'PUT' }),
  patch:      (href: string): HateoasLink => ({ rel: 'patch',      href, method: 'PATCH' }),
  delete:     (href: string): HateoasLink => ({ rel: 'delete',     href, method: 'DELETE' }),
  collection: (href: string): HateoasLink => ({ rel: 'collection', href, method: 'GET' }),
  create:     (href: string): HateoasLink => ({ rel: 'create',     href, method: 'POST' }),
  next:       (href: string): HateoasLink => ({ rel: 'next',       href, method: 'GET' }),
  prev:       (href: string): HateoasLink => ({ rel: 'prev',       href, method: 'GET' }),
  // relasi ke resource lain
  rel: (name: string, href: string, method: HateoasLink['method'] = 'GET'): HateoasLink =>
    ({ rel: name, href, method }),
};