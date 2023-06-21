function Home() {
    const list = [
        { content: 'Đăng nhập', complate: true, complate: false },
        { content: 'Thêm user', complate: true },
        { content: 'Sửa user', complate: true },
        { content: 'Xóa user', complate: true },
        { content: 'Hiển thị tất cả các user', complate: true },
        { content: 'Tìm kiếm user theo id', complate: false },
        { content: 'Sắp xếp thẻ FirstName', complate: true },
        { content: 'Import User từ file .csv ( excel )', complate: true },
        { content: 'Export User ta file .csv', complate: true },
    ];
    return (
        <div className="container">
            Yêu cầu:
            <br />
            • Sử dụng api từ web https://reqres.in/ để tạo website
            <br />
            • Sử dụng ReactJS để tạo một màn hình website cơ bản bao gồm các chức năng:
            <br />
            <ul>
                {list.map((item, index) => (
                    <li key={index} style={item.complate ? { backgroundColor: '#5bc4e7' } : null}>
                        {index + 1}. {item.content}
                    </li>
                ))}
            </ul>
            • Tự chỉnh html/css để có 1 web site nhẹ nhàng, đẹp.
            <br /> • Commit và đẩy source code lên github public
            <br /> • Triển khai web site lên Heroku để demo
        </div>
    );
}

export default Home;
