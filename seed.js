const { connectDB, client } = require("./db");

async function seedData() {
  try {
    const db = await connectDB();

    // Xoá dữ liệu cũ
    const collections = [
      "SinhVien", "Phong", "DichVu", "DichVuSuDung",
      "Khach", "XeGui", "VeThang", "LuotGuiLayXe"
    ];
    for (const name of collections) {
      await db.collection(name).deleteMany({});
    }
    console.log("Đã xoá toàn bộ dữ liệu cũ");

    // 1. Phòng
    await db.collection("Phong").insertMany([
      { soPhong: "01", loaiPhong: "High", donGia: 500000, soNguoiToiDa: 3 },
      { soPhong: "02", loaiPhong: "Medium", donGia: 350000, soNguoiToiDa: 2 },
      { soPhong: "03", loaiPhong: "Medium", donGia: 350000, soNguoiToiDa: 2 },
      { soPhong: "04", loaiPhong: "Studio", donGia: 700000, soNguoiToiDa: 5 },
      { soPhong: "05", loaiPhong: "Studio", donGia: 700000, soNguoiToiDa: 5 }
    ]);
    console.log("Đã thêm dữ liệu phòng");

    // 2. Sinh viên
    await db.collection("SinhVien").insertMany([
      {
        maSV: "001",
        hoTen: "Lê Hoàng Hà",
        cmt: "036200001234",
        ngaySinh: new Date("2000-10-10"),
        lop: "CNTT1",
        queQuan: "Phú Thọ",
        Phong: "01"
      },
      {
        maSV: "002",
        hoTen: "Phan Nam",
        cmt: "065391003362",
        ngaySinh: new Date("2002-04-30"),
        lop: "ĐTVT1",
        queQuan: "Hà Nam",
        Phong: "02"
      },
      {
        maSV: "003",
        hoTen: "Trần Quang Anh",
        cmt: "099148164884",
        ngaySinh: new Date("1999-11-24"),
        lop: "CNTT2",
        queQuan: "Quảng Ninh",
        Phong: "01"
      },
      {
        maSV: "005",
        hoTen: "Lê Thanh Bình",
        cmt: "084220048894",
        ngaySinh: new Date("2000-05-19"),
        lop: "ATTT1",
        queQuan: "Hà Nội",
        Phong: "04"
      },
      {
        maSV: "006",
        hoTen: "Phan Gia Hà",
        cmt: "034574754277",
        ngaySinh: new Date("2002-09-14"),
        lop: "ĐTVT3",
        queQuan: "Bắc Cạn",
        Phong: "05"
      },
      {
        maSV: "007",
        hoTen: "Phạm Trung Anh",
        cmt: "002678567562",
        ngaySinh: new Date("2001-02-02"),
        lop: "CNTT1",
        queQuan: "Phú Thọ",
        Phong: "03"
      },
      {
        maSV: "008",
        hoTen: "Trần Xuân Phúc",
        cmt: "032257557907",
        ngaySinh: new Date("2003-02-26"),
        lop: "ATTT2",
        queQuan: "Hà Nội",
        Phong: "05"
      }
    ]);
    console.log("Đã thêm dữ liệu sinh viên");

    // 3. Dịch vụ
    await db.collection("DichVu").insertMany([
      { maDV: "DV001", tenDV: "Giặt là", donGia: 30000 },
      { maDV: "DV002", tenDV: "Trông xe", donGia: 5000 },
      { maDV: "DV003", tenDV: "Cho thuê xe", donGia: 350000 },
      { maDV: "DV003", tenDV: "Mượn sách", donGia: 10000 },
      { maDV: "DV004", tenDV: "Ăn uống", donGia: 50000 }
    ]);
    console.log("Đã thêm dữ liệu dịch vụ");

    // 4. Sử dụng dịch vụ
    await db.collection("DichVuSuDung").insertMany([
      { maSV: "001", maDV: "DV001", soLan: 5, thoiGian: new Date("2025-03-01") },
      { maSV: "001", maDV: "DV004", soLan: 1, thoiGian: new Date("2025-04-13") },
      { maSV: "003", maDV: "DV004", soLan: 2, thoiGian: new Date("2025-02-01") },
      { maSV: "006", maDV: "DV002", soLan: 3, thoiGian: new Date("2025-04-13") },
      { maSV: "002", maDV: "DV002", soLan: 6, thoiGian: new Date("2025-04-11") },
      { maSV: "002", maDV: "DV002", soLan: 2, thoiGian: new Date("2025-01-31") },
      { maSV: "008", maDV: "DV005", soLan: 7, thoiGian: new Date("2025-02-11") },
      { maSV: "005", maDV: "DV003", soLan: 1, thoiGian: new Date("2025-03-03") },
      { maSV: "007", maDV: "DV005", soLan: 4, thoiGian: new Date("2025-03-21") },
      { maSV: "005", maDV: "DV001", soLan: 7, thoiGian: new Date("2025-04-23") },
      { maSV: "005", maDV: "DV002", soLan: 2, thoiGian: new Date("2025-04-12") },
      { maSV: "006", maDV: "DV003", soLan: 5, thoiGian: new Date("2025-02-14") },
      { maSV: "007", maDV: "DV005", soLan: 5, thoiGian: new Date("2025-02-26") },
      { maSV: "008", maDV: "DV002", soLan: 7, thoiGian: new Date("2025-03-17") },
      { maSV: "001", maDV: "DV001", soLan: 3, thoiGian: new Date("2025-01-28") },
      { maSV: "003", maDV: "DV004", soLan: 4, thoiGian: new Date("2025-01-10") },
      { maSV: "002", maDV: "DV005", soLan: 2, thoiGian: new Date("2025-01-05") }
    ]);
    console.log("Đã thêm dữ liệu sử dụng dịch vụ");

    // 5. Khách đến thăm
    await db.collection("Khach").insertMany([
      {
        cmt: "025876691521",
        ten: "Nguyễn Văn An",
        ngaySinh: new Date("1999-10-10"),
        maSV: "001",
        ngayDen: new Date("2025-04-01")
      },
      {
        cmt: "004994867073",
        ten: "Lê Hữu Bình",
        ngaySinh: new Date("1990-08-08"),
        maSV: "006",
        ngayDen: new Date("2025-03-04")
    },
    {
        cmt: "007813344405",
        ten: "Bùi Văn Trang",
        ngaySinh: new Date("2003-10-11"),
        maSV: "005",
        ngayDen: new Date("2025-04-05")
    },
    {
        cmt: "012357975521",
        ten: "Hoàng Minh Nam",
        ngaySinh: new Date("1990-03-02"),
        maSV: "005",
        ngayDen: new Date("2025-01-07")
    },
    {
        cmt: "027617696705",
        ten: "Phạm Hữu Trang",
        ngaySinh: new Date("1991-11-12"),
        maSV: "007",
        ngayDen: new Date("2025-04-23")
    },
    {
        cmt: "035569782480",
        ten: "Bùi Quang Anh",
        ngaySinh: new Date("1996-01-23"),
        maSV: "003",
        ngayDen: new Date("2025-04-12")
    },
    {
        cmt: "004191994698",
        ten: "Trần Thị Bình",
        ngaySinh: new Date("2001-12-08"),
        maSV: "006",
        ngayDen: new Date("2025-02-13")
    }
    ]);
    console.log("Đã thêm dữ liệu khách đến thăm");

    // 6. Xe gửi
    await db.collection("XeGui").insertMany([
      { bienSo: "29A-42408", loaiXe: "xe máy" },
      { bienSo: "18V-21628", loaiXe: "xe máy" },
      { bienSo: "37H-66212", loaiXe: "xe máy" },
      { bienSo: "29G-16811", loaiXe: "xe máy" },
      { bienSo: "29G-99999", loaiXe: "xe máy" },
      { bienSo: "22A-02571", loaiXe: "xe máy" },
      { bienSo: "30D-82163", loaiXe: "xe máy" }
    ]);
    console.log("Đã thêm dữ liệu xe tháng");

    // 7. Vé tháng
    await db.collection("VeThang").insertMany([
      {
        maSV: "001",
        bienSoXe: "29A-12345",
        ngayDangKy: new Date("2025-04-01"),
        donGia: 100000
      },
      { 
        maSV: "001",
        bienSoXe: "29G-16811",
        ngayDangKy: new Date("2025-04-06"),
        donGia: 100000
      },
      { 
        maSV: "002",
        bienSoXe: "22A-02571",
        ngayDangKy: new Date("2025-02-13"),
        donGia: 100000
      },
      { 
        maSV: "008",
        bienSoXe: "29G-99999",
        ngayDangKy: new Date("2025-03-09"),
        donGia: 100000
      },
      { 
        maSV: "005",
        bienSoXe: "37H-66212",
        ngayDangKy: new Date("2025-03-05"),
        donGia: 100000
      },
      { 
        maSV: "008",
        bienSoXe: "29A-42408",
        ngayDangKy: new Date("2025-04-17"),
        donGia: 100000
      }
    ]);
    console.log("Đã thêm dữ liệu vé tháng");

    // 8. Lượt gửi/lấy xe
    await db.collection("LuotGuiLayXe").insertMany([
      {
        maluot: 1, 
        bienSoXe: "29G-16811",
        thoiGian: new Date("2025-04-15T08:00:00"),
        loai: "gửi",
        tinhPhi: false
      },
      {
        maluot: 2, 
        bienSoXe: "29G-16811",
        thoiGian: new Date("2025-04-08T08:00:00"),
        loai: "gửi",
        tinhPhi: false
      },
      {
        maluot: 3, 
        bienSoXe: "29G-16811",
        thoiGian: new Date("2025-04-07T08:00:00"),
        loai: "gửi",
        tinhPhi: true
      },
      {
        maluot: 4, 
        bienSoXe: "29A-12345",
        thoiGian: new Date("2025-04-06T08:00:00"),
        loai: "gửi",
        tinhPhi: false
      },
      {
        maluot: 5, 
        bienSoXe: "29G-16811",
        thoiGian: new Date("2025-04-13T08:00:00"),
        loai: "gửi",
        tinhPhi: true
      },
      {
        maluot: 6, 
        bienSoXe: "22A-02571",
        thoiGian: new Date("2025-04-02T08:00:00"),
        loai: "gửi",
        tinhPhi: true
      },
      {
        maluot: 7, 
        bienSoXe: "29G-16811",
        thoiGian: new Date("2025-04-11T08:00:00"),
        loai: "gửi",
        tinhPhi: true
      },
      {
        maluot: 8, 
        bienSoXe: "29A-42408",
        thoiGian: new Date("2025-04-16T08:00:00"),
        loai: "lấy",
        tinhPhi: true
      },
      {
        maluot: 9, 
        bienSoXe: "22A-02571",
        thoiGian: new Date("2025-04-12T08:00:00"),
        loai: "gửi",
        tinhPhi: true
      },
      {
        maluot: 10, 
        bienSoXe: "29A-42408",
        thoiGian: new Date("2025-04-10T08:00:00"),
        loai: "lấy",
        tinhPhi: true
      }
    ]);
    console.log("Đã thêm dữ liệu lượt gửi/lấy xe");

    console.log("Dữ liệu mẫu đã được thêm thành công!");
  } catch (err) {
    console.error("Lỗi khi thêm dữ liệu mẫu:", err);
  } finally {
    await client.close();
  }
}

seedData();