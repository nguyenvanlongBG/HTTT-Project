const ClassesService = require('./classes.service');

exports.createClasses = async (req, res) => {
    try {
        // Lấy user_id từ đối tượng người dùng đã xác thực (nếu có)
        const user_id = req.user ? req.user._id : null;

        const newClasses = await ClassesService.createClass({ ...req.body, user_id });

        res.status(201).json({
            success: true,
            messages: ["Tạo lớp học thành công"],
            content: newClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Tạo lớp học không thành công"],
            content: error.message
        });
    }
}

exports.getClassesById = async (req, res) => {
    try {
        const ClassesData = await ClassesService.getClassById(req.params.ClassesId);
        res.status(200).json({
            success: true,
            messages: ["Lấy thông tin lớp học thành công"],
            content: ClassesData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy thông tin lớp học không thành công"],
            content: error.message
        });
    }
}

exports.updateClasses = async (req, res) => {
    const { ClassesId } = req.params;
    const newData = req.body;

    try {
        const updatedClasses = await ClassesService.updateClass(ClassesId, newData);
        res.status(200).json({
            success: true,
            messages: ["Cập nhật thông tin lớp học thành công"],
            content: updatedClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Cập nhật thông tin lớp học không thành công"],
            content: error.message
        });
    }
}

exports.deleteClasses = async (req, res) => {
    try {
        const { ClassesId } = req.params;
        const deletedClasses = await ClassesService.deleteClass(ClassesId);
        res.status(201).json({
            success: true,
            messages: ["Xóa lớp học thành công"],
            content: deletedClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa lớp học không thành công"],
            content: error.message
        });
    }
}

exports.getClassesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const userClasses = await ClassesService.getClassesByUserId(userId);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách lớp học của người dùng thành công"],
            content: userClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách lớp học của người dùng không thành công"],
            content: error.message
        });
    }
}

exports.addStudentToClasses = async (req, res) => {
    const { ClassesId } = req.params;
    const { emails } = req.body;
    try {
        const updatedClasses = await ClassesService.addStudentToClass(ClassesId, emails);
        res.status(200).json({
            success: true,
            messages: ["Thêm học sinh vào lớp thành công"],
            content: updatedClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thêm học sinh vào lớp không thành công"],
            content: error.message
        });
    }
}

exports.removeStudentFromClasses = async (req, res) => {
    const { ClassesId, studentId } = req.params;
    try {
        const updatedClasses = await ClassesService.removeStudentFromClass(ClassesId, studentId);
        res.status(200).json({
            success: true,
            messages: ["Xóa học sinh khỏi lớp thành công"],
            content: updatedClasses
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Xóa học sinh khỏi lớp không thành công"],
            content: error.message
        });
    }
}

exports.getStudentsInClasses = async (req, res) => {
    try {
        const { ClassesId } = req.params;
        const students = await ClassesService.getStudentsInClass(ClassesId);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách học sinh trong lớp thành công"],
            content: students
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách học sinh trong lớp không thành công"],
            content: error.message
        });
    }
}