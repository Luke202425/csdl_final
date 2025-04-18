const { connectDB, client } = require("./db");

const {
  chiPhiSVTheoThang,
  thongTinDichVuTheoThoiGian,
  thongKeKhachTham,
  doanhThuDichVuTheoThang
} = require("./utils/logic");

async function main() {
  try {
    const db = await connectDB();

    // 1. Thông tin sinh viên + tổng chi phí dịch vụ + phòng mỗi tháng
    const chiPhiSV = await chiPhiSVTheoThang(db);
    console.log("1. Tổng chi phí (Phòng + Dịch vụ) theo tháng của các sinh viên:");
    console.table(chiPhiSV);

    // 2. Thống kê dịch vụ đã sử dụng trong khoảng thời gian cụ thể
    const startDate = new Date("2025-03-01");
    const endDate = new Date("2025-04-30");
    const dvTheoThoiGian = await thongTinDichVuTheoThoiGian(db, startDate, endDate);
    console.log("2. Tổng hợp dịch vụ sinh viên đã sử dụng:");
    console.table(dvTheoThoiGian);

    // 3. Thống kê khách đến chơi có thời gian cụ thể
    const khachThang = await thongKeKhachTham(db, startDate, endDate);
    console.log("3. Thông tin khách đến thăm:");
    console.table(khachThang);

    // 4. Doanh thu dịch vụ theo tháng
    const doanhThu = await doanhThuDichVuTheoThang(db);
    console.log("4. Doanh thu dịch vụ theo tháng:");
    console.table(doanhThu);

  } catch (err) {
    console.error("Lỗi:", err.message);
  } finally {
    await client.close();
  }
}

main();