import api from "../utils/api"

// Get single course by ID
export const getCourse = async (id) => {
    const response = await api.get(`/courses/${id}`)
    // Xử lý response structure ở đây
    return response.data.result || response.data
}

// Get all courses WITH pagination (backend page starts from 1)
export const getCourses = async (page = 1, size = 10, sort = ['name', 'asc']) => {
    const response = await api.get('/courses', {
        params: {
            page,    // Backend expects page starting from 1
            size,
            sort    // Backend expects array like ['name', 'asc']
        }
    })
    return response.data.result || response.data
}

// Create a new course
export const createCourse = async (courseData) => {
    const response = await api.post('/courses', courseData)
    return response.data
}

// Update a course
export const updateCourse = async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData)
    return response.data
}

// Delete a course
export const deleteCourse = async (id) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
}

// Get courses by category ID
export const getCoursesByCategory = async (categoryId, categoryName) => {
    const response = await api.get(`/courses/${categoryName}/${categoryId}`);
    return response.data.courseResponse || response.data.result.courseResponse;
};

// Get my purchased courses (GET /courses/my-course)
export const getMyCourses = async () => {
    try {
        console.log('🔍 Calling GET /courses/my-course...');
        const response = await api.get('/courses/my-course');
        console.log('✅ My courses response:', response.data);
        return response.data.result || response.data;
    } catch (error) {
        console.error('❌ Error fetching my courses:', error);
        console.error('❌ Full error object:', error);
        console.error('❌ Error response data:', error.response?.data);
        console.error('❌ Error status:', error.response?.status);
        console.error('❌ Error message:', error.response?.data?.message);
        console.error('❌ Request URL:', error.config?.url);
        console.error('❌ Request method:', error.config?.method);
        console.error('❌ Request headers:', error.config?.headers);

        alert(`⚠️ Lỗi khi lấy khóa học đã mua:
        
Status: ${error.response?.status}
Message: ${error.response?.data?.message || 'Unknown error'}

Vui lòng kiểm tra:
1. Backend đã restart chưa?
2. Controller path đúng /courses/my-course?
3. Không có @RequestBody trong controller?`);

        throw error;
    }
};