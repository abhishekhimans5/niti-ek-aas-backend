export const responseFormatter = (req,res,next) => {
    res.success = (msg,data,code = 200) => {
        return res.status(code).json({
            success : true,
            msg,
            data
        });
    };

    res.error = (msg,code = 500, type = 'SERVER_ERROR') => {
        res.status(code).json({
            success : false,
            msg,
            type
        });
    };

    next();
}