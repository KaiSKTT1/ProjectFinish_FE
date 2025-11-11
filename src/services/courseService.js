import api from "../utils/api"

// Get single course by ID
export const getCourse = async (id) => {
    const response = await api.get(`/courses/${id}`)
    // Xử lý response structure ở đây
    return response.data.result || response.data
}

// Get all courses
export const getCourses = async () => {
    const response = await api.get('/courses')
    // Xử lý response structure ở đây - Component không cần lo
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