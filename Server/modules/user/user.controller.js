const userService = require('./user.service')

exports.createUser = async (req,res) =>{
    try {
        let portal = req.body.portal
        let user = await userService.register(req.body, portal)

        res.status(201).json({
            success: true,
            messages: ["Tạo tài khoản thành công"],
            content: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: error.message === "account_existed" ?
                ["Tài khoản đã tồn tại"] :
                ["Tạo tài khoản không thành công"],
            content: error.message
        })
    }
}

exports.getUserDetail = async ( req, res ) => {
    try {
        let id = req.params.id;
        let user = await userService.getUserDetail( id, req.portal)

        res.status(200).json({
            success: true,
            messages: ["Lấy thông tin cá nhân thành công"],
            content: user
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy thông tin cá nhân không thành công"],
            content: error.message
        });
    }
}

exports.updateUser = async(req, res ) =>{
    let id = req.params.id
    let data = req.body
    let user = await userService.updateUser(id, data)
    try{
        res.status(200).json({
            success: true,
            messages: ["Cập nhật thông tin thành công"],
            content: user
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            messages: ["Cập nhật thông tin không thành công"],
            content: error.message
        });
    }
}

exports.changePassword = async(req, res ) =>{
    let id = req.params.id
    data = req.body
    let user = await userService.changePassword(id, data)
    try{
        res.status(200).json({
            success: true,
            messages: ["Thay đổi mật khẩu thành công"],
            content: user
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            messages: ["Thay đổi thông tin không thành công"],
            content: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await userService.deleteUser(id);

        res.status(201).json({
            success: true,
            messages: ["Xóa tài khoản thành công!"],
            content: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa tài khoản không thành công!"],
            content: error.message
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let query = req.query;
        let allUsers = await userService.getAllUsers(query);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách người dùng thành công!"],
            content: allUsers
        });
    } catch (error) {
        await LogError(req.body.email, "GET_ALL_USERS", req.body.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách người dùng không thành công!"],
            content: error.message
        });
    }
}
