// utils/logic.js

const { ObjectId } = require("mongodb");

function formatDateVN(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Tổng chi phí mỗi SV mỗi tháng (dịch vụ + phòng)
async function chiPhiSVTheoThang(db) {
  const raw = await db.collection("SinhVien").aggregate([
    {
      $lookup: {
        from: "Phong",
        localField: "Phong",
        foreignField: "soPhong",
        as: "phongInfo"
      }
    },
    { $unwind: "$phongInfo" },
    {
      $lookup: {
        from: "DichVuSuDung",
        localField: "maSV",
        foreignField: "maSV",
        as: "dichVuDaDung"
      }
    },
    {
      $unwind: {
        path: "$dichVuDaDung",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "DichVu",
        localField: "dichVuDaDung.maDV",
        foreignField: "maDV",
        as: "thongTinDV"
      }
    },
    { $unwind: { path: "$thongTinDV", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        tienDichVu: {
          $multiply: ["$dichVuDaDung.soLan", "$thongTinDV.donGia"]
        },
        thang: { $month: "$dichVuDaDung.thoiGian" },
        nam: { $year: "$dichVuDaDung.thoiGian" }
      }
    },
    {
      $group: {
        _id: { maSV: "$maSV", thang: "$thang", nam: "$nam" },
        hoSo: { $first: "$$ROOT" },
        tongTienDV: { $sum: "$tienDichVu" }
      }
    },
    {
      $project: {
        _id: 0,
        maSV: "$_id.maSV",
        thang: "$_id.thang",
        nam: "$_id.nam",
        hoTen: "$hoSo.hoTen",
        lop: "$hoSo.lop",
        Phong: "$hoSo.phongInfo.soPhong",
        tienPhong: "$hoSo.phongInfo.donGia",
        tongTienDV: 1,
        tongTienPhaiTra: { $add: ["$tongTienDV", "$hoSo.phongInfo.donGia"] }
      }
    }
  ]).toArray();

  return raw.map((r, i) => ({ stt: i + 1, ...r }));
}

async function thongTinDichVuTheoThoiGian(db, startDate, endDate) {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const raw = await db.collection("DichVuSuDung").aggregate([
    {
      $match: {
        thoiGian: { $gte: start, $lte: end }
      }
    },
    {
      $lookup: {
        from: "SinhVien",
        localField: "maSV",
        foreignField: "maSV",
        as: "sv"
      }
    },
    { $unwind: "$sv" },
    {
      $lookup: {
        from: "DichVu",
        localField: "maDV",
        foreignField: "maDV",
        as: "dv"
      }
    },
    { $unwind: "$dv" },
    {
      $project: {
        maSV: 1,
        tenSV: "$sv.hoTen",
        tenDV: "$dv.tenDV",
        soLan: 1,
        donGia: "$dv.donGia",
        tongGia: { $multiply: ["$soLan", "$dv.donGia"] },
        thoiGian: 1
      }
    },
    {
      $sort: { thoiGian: 1 }
    }
  ]).toArray();

  return raw.map((r, i) => ({
    stt: i + 1,
    maSV: r.maSV,
    soLan: r.soLan,
    thoiGian: formatDateVN(r.thoiGian),
    tenSV: r.tenSV,
    tenDV: r.tenDV,
    donGia: r.donGia,
    tongGia: r.tongGia
  }));
}

async function thongKeKhachTham(db, startDate, endDate) {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const Khach = await db.collection("Khach").aggregate([
    {
      $match: {
        ngayDen: { $gte: start, $lte: end }
      }
    },
    {
      $lookup: {
        from: "SinhVien",
        localField: "maSV",
        foreignField: "maSV",
        as: "sv"
      }
    },
    { $unwind: "$sv" },
    {
      $project: {
        tenKhach: "$ten",
        cmt: "$cmt",
        ngaySinh: 1,
        maSV: 1,
        hoTenSV: "$sv.hoTen",
        ngayDen: 1
      }
    },
    {
      $sort: { ngayDen: 1 }
    }
  ]).toArray();

  return Khach.map((k, i) => ({
    stt: i + 1,
    tenKhach: k.tenKhach,
    cmt: k.cmt,
    ngaySinh: formatDateVN(k.ngaySinh),
    maSVTham: k.maSV,
    hoTenSV: k.hoTenSV,
    ngayDen: formatDateVN(k.ngayDen)
  }));
}

async function doanhThuDichVuTheoThang(db) {
  const raw = await db.collection("DichVuSuDung").aggregate([
    {
      $lookup: {
        from: "DichVu",
        localField: "maDV",
        foreignField: "maDV",
        as: "dv"
      }
    },
    { $unwind: "$dv" },
    {
      $group: {
        _id: {
          maDV: "$maDV",
          tenDV: "$dv.tenDV",
          thang: { $month: "$thoiGian" },
          nam: { $year: "$thoiGian" }
        },
        doanhThu: { $sum: { $multiply: ["$soLan", "$dv.donGia"] } }
      }
    },
    {
      $project: {
        tenDV: "$_id.tenDV",
        thang: "$_id.thang",
        nam: "$_id.nam",
        doanhThu: 1,
        _id: 0
      }
    }
  ]).toArray();

  return raw.map((r, i) => ({ stt: i + 1, ...r }));
}


module.exports = {
  chiPhiSVTheoThang,
  thongTinDichVuTheoThoiGian,
  thongKeKhachTham,
  doanhThuDichVuTheoThang
};