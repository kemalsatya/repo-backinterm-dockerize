import { Context } from 'hono';
import { link, type HateoasLink } from './hateoas.util';
import type { paginationMeta } from './pagination.util';


export const paginationLinks = (page: number, limit: number, totalPages: number, api: string, extraQuery: string = "") => {
    const querySuffix = extraQuery ? `&${extraQuery}` : ""
    const links = [
        link.self(`/api/${api}?page=${page}&limit=${limit}${querySuffix}`),
        link.create(`/api/${api}`)
    ]

    if (page > 1) links.push(link.prev(`/api/${api}?page=${page - 1}&limit=${limit}${querySuffix}`))
    if (page < totalPages) links.push(link.next(`/api/${api}?page=${page + 1}&limit=${limit}${querySuffix}`))

    return links
}

export const successResponseHTPaginated = (c: Context, data: any, meta: paginationMeta, links: HateoasLink[], message: string = "Success", statusCode: number = 200) => {
    return c.json({
        success: true,
        message,
        data,
        meta,
        _links: links
    }, statusCode as any)
}

export const successResponse = (c: Context, data: any, message: string = "Success", statusCode: number = 200) => {
    return c.json({
        success: true,
        message: message,
        data: data,
    }, statusCode as any);
};

export const successResponseHT = (c: Context, data: any, links: HateoasLink[], message: string = "Success", statusCode: number = 200) => {
    return c.json({
        success: true,
        message: message,
        data: data,
        _links: links
    }, statusCode as any);
};

export const errorResponse = (c: Context, message: string = "Internal Server Error", statusCode: number = 500) => {
    return c.json({
        success: false,
        message: message,
        data: null
    }, statusCode as any);
};
