import { Context } from 'hono';

export const successResponse = (c: Context, data: any, message: string = "Success", statusCode: number = 200) => {
    return c.json({
        success: true,
        message: message,
        data: data
    }, statusCode as any);
};

export const errorResponse = (c: Context, message: string = "Internal Server Error", statusCode: number = 500) => {
    return c.json({
        success: false,
        message: message,
        data: null
    }, statusCode as any);
};
