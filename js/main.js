// Function 1: lấy danh sách sinh viên từ backend

let studentList = []

const fetchStudents = () => {
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
        method: 'GET',
    })
        .then((res) => {
            studentList = res.data
            renderStudents()
        })
        .catch((err) => {
            console.log("Không thể lấy danh sách kiểm tra lại đường dẫn", err)

        })
}

// function 2 : hiển thị danh sách ra HTML bằng js

const renderStudents = () => {
    let htmlContent = "";
    for (let student of studentList) {
        htmlContent += `
            <tr>
                <td>${student.MaSV}</td>
                <td>${student.HoTen}</td>
                <td>${student.Email}</td>
                <td>${student.SoDT}</td>
                <td>${student.DiemToan}</td>
                <td>${student.DiemLy}</td>
                <td>${student.DiemHoa}</td>
                <td>
                    <button onclick = "deleteStudent('${student.MaSV}')" class="btn btn-danger">Xóa</button>
                </td>

                <td>
                    <button onclick = "getStudent('${student.MaSV}')" class="btn btn-info">Cập</button>
                </td>

            </tr>`
    }

    document.getElementById("tbodySinhVien").innerHTML = htmlContent;

}

// function 3: Add sinh viên
const addStudent = () => {
    const studentId = document.getElementById("txtMaSV").value;
    const studentName = document.getElementById("txtTenSV").value;
    const studentEmail = document.getElementById("txtEmail").value;
    const studentPhone = document.getElementById("txtPhone").value;
    const studentCard = document.getElementById("txtCard").value;
    const studentMath = document.getElementById("txtDiemToan").value;
    const studentPhysic = document.getElementById("txtDiemLy").value;
    const studentChemistry = document.getElementById("txtDiemHoa").value;

    const newStudent = new Student(studentId, studentName, studentEmail, studentPhone, studentCard, studentMath, studentPhysic, studentChemistry)

    // console.log(studentId,
    //     studentName,
    //     studentEmail,
    //     studentCard,
    //     studentPhone,
    //     studentMath,
    //     studentPhysic,
    //     studentChemistry)

    console.log(newStudent)

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
        method: "POST",
        data: newStudent
    })
        .then((res) => {
            // fetch lại danh sách mới
            fetchStudents()
        })
        .catch((err) => {
            console.log(err)

        })

}

// function 4: Xóa sinh viên

const deleteStudent = (id) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`,
        method: 'DELETE',
    })
        .then((res) => {
            console.log(res);
            fetchStudents()
        })
        .catch((err) => {
            console.log(err)
        })
}

// function 5: lấy thông tin sinh viên để show lên form 

const getStudent = (id) => {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`,
        method: 'GET',
    })
        .then((res) => {
            console.log(res);

            document.getElementById("txtMaSV").value = res.data.MaSV;
            document.getElementById("txtTenSV").value = res.data.HoTen;
            document.getElementById("txtEmail").value = res.data.Email;
            document.getElementById("txtPhone").value = res.data.SoDT;
            document.getElementById("txtCard").value = res.data.CMND;
            document.getElementById("txtDiemToan").value = res.data.DiemToan;
            document.getElementById("txtDiemLy").value = res.data.DiemLy;
            document.getElementById("txtDiemHoa").value = res.data.DiemHoa;

            document.getElementById("txtMaSV").setAttribute("disabled", true)

        })
        .catch((err) => {
            console.log(err)
        })
    document.getElementById("updateBtn").style.display = "inline-block";
}

// function 6: cập nhập sinh viên

const updateStudent = () => {
    const studentId = document.getElementById("txtMaSV").value;
    const studentName = document.getElementById("txtTenSV").value;
    const studentEmail = document.getElementById("txtEmail").value;
    const studentPhone = document.getElementById("txtPhone").value;
    const studentCard = document.getElementById("txtCard").value;
    const studentMath = document.getElementById("txtDiemToan").value;
    const studentPhysic = document.getElementById("txtDiemLy").value;
    const studentChemistry = document.getElementById("txtDiemHoa").value;

    const updatedStudent = new Student(studentId, studentName, studentEmail, studentPhone, studentCard, studentMath, studentPhysic, studentChemistry)

    console.log(studentId,
        studentName,
        studentEmail,
        studentCard,
        studentPhone,
        studentMath,
        studentPhysic,
        studentChemistry)

    axios({
        url: "http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien",
        method: "PUT",
        data: updatedStudent
    })
        .then((res) => {

            // clear form cập nhật đi

            // mở lại ô mã sinh viên
            document.getElementById("txtMaSV").removeAttribute("disabled")


            // fetch lại danh sách mới
            fetchStudents()
        })
        .catch((err) => {
            console.log(err)

        })
    document.getElementById("updateBtn").style.display = "none";
}