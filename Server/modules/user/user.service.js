const bcrypt = require('bcryptjs');

const User = require('../../models/user/user.model');

exports.register = async (data, portal) => {
    let { email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('account_existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        ...data, password: hashPassword
    });

    return { user }
}

exports.getUserDetail = async (id, portal) => {

    let user = await User.findById(id);

    if (!user) {
        throw Error('user_is_not_existed');
    }

    return { user }
}

exports.updateUser = async (id, data) => {
    if (!data.avatar) {
        data.avatar = undefined;
    }
    let currentUser = await User.findById(id)
    if (!currentUser) {
        throw Error('user_is_not_existed');
    }
    let user = await User.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { user }
}

exports.changePassword = async (id, data) => {
    const { oldPassword, newPassword } = data;
    let currentUser = await User.findById(id)
    if (!currentUser) {
        throw Error('user_is_not_existed');
    }

    let checkPassword = bcrypt.compareSync(oldPassword, currentUser.password)
    if (!checkPassword) {
        throw Error("Password is invalid")
    }
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(newPassword, salt);

    let user = await User.findByIdAndUpdate(id, { password: hashPassword }, { new: true })
    return { user }
}

exports.deleteUser = async (id) => {

    let user = await User.findByIdAndDelete(id)

    return { user }
}

exports.getAllUsers = async (query, portal) => {
    let { page, limit, name, email, phone, role } = query;
    let option = {};

    //Set query data
    if (name) option.name = new RegExp(name, "i")
    if (email) option.email = new RegExp(email, "i")
    if (phone) option.phone = new RegExp(phone, "i")
    if (role) option.role = role

    if (!page || !limit) {
        let allUsers = await User
            .find(option)
            .sort({ createdAt: 'desc' })

        return { allUsers }
    } else {
        let allUsers = await User.paginate(option, {
            page,
            limit,
            sort: { 'createdAt': 'desc' }
        })

        return { allUsers }
    }
}