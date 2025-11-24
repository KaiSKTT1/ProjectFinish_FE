import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../../services/courseService";
import ItemCourse from "../../components/ui/ItemCourse";

const CoursesPage = () => {
    // URL query params
    const [searchParams, setSearchParams] = useSearchParams();

    // Lấy page và size từ URL, nếu không có thì dùng default
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;
    const sizeFromUrl = parseInt(searchParams.get('size')) || 10;

    // States (page starts from 1 for backend)
    const [listCourses, setListCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);
    const [pageSize, setPageSize] = useState(sizeFromUrl);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Sync URL khi page hoặc size thay đổi
    useEffect(() => {
        setSearchParams({ page: currentPage.toString(), size: pageSize.toString() });
    }, [currentPage, pageSize, setSearchParams]);

    // Fetch data khi component mount hoặc page/size thay đổi
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                // Gọi API với pagination (page từ 1)
                const data = await getCourses(currentPage, pageSize);

                console.log("📦 API Response:", data);
                console.log("📚 Content:", data.content);
                console.log("📊 Total Pages:", data.totalPages);

                // Backend trả về Page<CourseResponse> với content, totalPages...
                setListCourses(data.content || []);
                setTotalPages(data.totalPages || 1);
                setTotalElements(data.totalElements || 0);
            } catch (error) {
                console.error("❌ Failed to fetch courses:", error);
                setListCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [currentPage, pageSize]);

    // Pagination handlers (page from 1)
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); // Reset về trang đầu (page 1)
    };

    // Tính toán các số trang cần hiển thị (page from 1)
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // Hiển thị tối đa 5 số trang

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    // Render UI
    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Tất cả khóa học</h2>

                {/* Page Size Selector */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Hiển thị:</label>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-gray-600">khóa học/trang</span>
                </div>
            </div>

            {/* Total info */}
            {!loading && totalElements > 0 && (
                <p className="text-sm text-gray-600 mb-4">
                    Hiển thị {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalElements)} trong tổng số {totalElements} khóa học
                </p>
            )}

            {/* Courses Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {loading ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-xl text-gray-500">Đang tải khóa học...</p>
                    </div>
                ) : listCourses.length > 0 ? (
                    listCourses.map((course, index) => (
                        <ItemCourse
                            key={course.id || course.courseId || course.code || index}
                            course={course}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-12">
                        <p className="text-xl">Không có khóa học nào.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded border ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                            }`}
                    >
                        ← Trước
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageClick(pageNum)}
                            className={`px-4 py-2 rounded border ${pageNum === currentPage
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={currentPage >= totalPages}
                        className={`px-4 py-2 rounded border ${currentPage >= totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                            }`}
                    >
                        Sau →
                    </button>
                </div>
            )}
        </div>
    );
}

export default CoursesPage;