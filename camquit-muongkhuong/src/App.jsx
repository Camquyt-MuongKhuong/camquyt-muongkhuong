import React, { useState } from "react";

// Cam Quít Mường Khương — Complete single-file React app
// - Tailwind CSS assumed in hosting environment (Vercel/Netlify)
// - Replace placeholder images and contact details as needed

const SITE = {
  name: "Cam Quít Mường Khương - H'Mông Farm",
  short: "Nông sản sạch từ Mường Khương, Lào Cai — cam & quít tươi ngon",
  contactName: "Giàng Seo Páo",
  phone: "0989 123 456",
  email: "lienhe@camquitmuongkhuong.vn",
  address: "Bản Na Pan, Xã Mường Khương, H. Mường Khương, Lào Cai",
  bank: {
    bankName: "Agribank - CN Mường Khương",
    accountName: "Giàng Seo Páo",
    accountNumber: "4500201234567",
  },
  facebook: "https://www.facebook.com/camquitmuongkhuong",
};

const PRODUCTS = [
  {
    id: 1,
    name: "Cam Mường Khương - Hộp 5kg",
    price: 450000,
    short: "Cam vườn chín cây - vỏ mỏng, ngọt, mọng nước.",
    img: "/src/assets/cam.jpg",
    stock: 120,
  },
  {
    id: 2,
    name: "Quít H'Mông - Túi 3kg",
    price: 280000,
    short: "Quít thơm, nhiều múi, bảo quản lâu, thích hợp làm quà.",
    img: "/src/assets/quit.jpg",
    stock: 80,
  },
  {
    id: 3,
    name: "Combo Cam + Quít - 8kg",
    price: 680000,
    short: "Gói quà tươi ngon - phù hợp biếu tặng lễ tết.",
    img: "/src/assets/combo.jpg",
    stock: 45,
  },
];

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " ₫";
}

export default function App() {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank"); // bank or cod
  const [customer, setCustomer] = useState({ name: "", phone: SITE.phone, address: SITE.address, note: "" });

  function addToCart(product) {
    setCart((c) => {
      const found = c.find((x) => x.id === product.id);
      if (found) return c.map((x) => (x.id === product.id ? { ...x, qty: x.qty + 1 } : x));
      return [...c, { ...product, qty: 1 }];
    });
  }

  function updateQty(id, qty) {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  }

  function removeItem(id) {
    setCart((c) => c.filter((x) => x.id !== id));
  }

  function subtotal() {
    return cart.reduce((s, it) => s + it.qty * it.price, 0);
  }

  function buildOrderText() {
    return `${SITE.name} - Đơn hàng\nKhách: ${customer.name}\nSĐT: ${customer.phone}\nĐịa chỉ: ${customer.address}\nGhi chú: ${customer.note}\n\nChi tiết:\n${cart
      .map((it) => `${it.name} - ${it.qty} x ${formatVND(it.price)} = ${formatVND(it.qty * it.price)}`)
      .join("\n")}\n\nTổng: ${formatVND(subtotal())}\nHình thức thanh toán: ${paymentMethod === "bank" ? "Chuyển khoản" : "COD"}`;
  }

  function handleSendOrder() {
    if (cart.length === 0) {
      alert("Giỏ hàng rỗng — vui lòng thêm sản phẩm.");
      return;
    }
    const body = encodeURIComponent(buildOrderText());
    window.location.href = `mailto:${SITE.email}?subject=Đơn hàng từ website - ${customer.name}&body=${body}`;
  }

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 text-gray-800">
      <header className="bg-[#166534] text-white">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="0.8" />
                <path d="M7 12c1.5-3 5-4 7-2" stroke="white" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">{SITE.name}</h1>
              <div className="text-sm opacity-90">{SITE.short}</div>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <input
              className="rounded-md p-2 text-black w-52"
              placeholder="Tìm sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-white text-[#166534] px-3 py-2 rounded-md" onClick={() => setShowCheckout(true)}>
              Giỏ hàng ({cart.reduce((s, i) => s + i.qty, 0)})
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-3">Trái ngọt từ vườn H'mông Mường Khương</h2>
            <p className="mb-4">Chúng tôi — gia đình H'Mông tại bản Na Pan — tự hào mang tới cam và quít tươi, canh tác an toàn, thu hoạch khi chín tới. Giao hàng toàn quốc, COD hỗ trợ khu vực lớn.</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Sản xuất theo phương thức thân thiện môi trường.</li>
              <li>Đóng gói kỹ thuật chống dập vỏ, giao nhanh trong 24-72h (tùy khu vực).</li>
              <li>Hỗ trợ bán buôn cho cửa hàng, quà tặng doanh nghiệp.</li>
            </ul>
            <div className="flex gap-3">
              <a href="#products" className="bg-[#f59e0b] text-white px-4 py-2 rounded-md">Xem sản phẩm</a>
              <a href="#contact" className="border border-[#166534] text-[#166534] px-4 py-2 rounded-md">Liên hệ đặt hàng</a>
            </div>
          </div>
          <div>
            <img src={products[0].img} alt="Cam Mường Khương" className="rounded-lg shadow-lg w-full object-cover h-64" />
          </div>
        </section>

        <section id="products">
          <h3 className="text-2xl font-semibold mb-4">Sản phẩm</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <img src={p.img} alt={p.name} className="h-44 object-cover rounded-md mb-3" />
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{p.short}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="font-bold">{formatVND(p.price)}</div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-[#166534] text-white rounded-md" onClick={() => addToCart(p)}>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 bg-white p-6 rounded-lg shadow" id="about">
          <h3 className="text-xl font-semibold mb-2">Về chúng tôi</h3>
          <p>
            Hộ vườn của gia đình Giàng Seo Páo — người H'Mông, canh tác cam và quít trên sườn đồi cao tại Mường Khương. Chúng tôi tuân thủ nguyên tắc thu hoạch chín cây, chọn lọc kỹ, đóng gói sạch sẽ và giao hàng an toàn.
          </p>
        </section>

        <section className="mt-8" id="contact">
          <h3 className="text-xl font-semibold mb-3">Liên hệ & Đặt hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="mb-2"><strong>Địa chỉ:</strong> {SITE.address}</p>
              <p className="mb-2"><strong>Người liên hệ:</strong> {SITE.contactName}</p>
              <p className="mb-2"><strong>Số điện thoại:</strong> {SITE.phone}</p>
              <p className="mb-2"><strong>Email:</strong> {SITE.email}</p>
              <p className="mb-2"><strong>Tài khoản ngân hàng:</strong></p>
              <div className="ml-4">
                <div>{SITE.bank.bankName}</div>
                <div>Chủ TK: {SITE.bank.accountName}</div>
                <div>Số TK: {SITE.bank.accountNumber}</div>
              </div>
              <div className="mt-4">
                <a href={SITE.facebook} target="_blank" rel="noreferrer" className="underline">Facebook: Trang cửa hàng</a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Form đặt hàng nhanh</h4>
              <div className="flex flex-col gap-2">
                <input className="p-2 border rounded" placeholder="Họ tên" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                <input className="p-2 border rounded" placeholder="Số điện thoại" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                <input className="p-2 border rounded" placeholder="Địa chỉ giao hàng" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                <textarea className="p-2 border rounded" placeholder="Ghi chú" value={customer.note} onChange={(e) => setCustomer({ ...customer, note: e.target.value })} />

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod==='bank'} onChange={()=>setPaymentMethod('bank')} /> Chuyển khoản</label>
                  <label className="flex items-center gap-2"><input type="radio" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} /> COD</label>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-[#166534] text-white px-4 py-2 rounded"
                    onClick={() => {
                      if (cart.length === 0) { alert('Giỏ hàng rỗng — thêm sản phẩm trước khi đặt hàng.'); return; }
                      setShowCheckout(true);
                    }}
                  >
                    Đặt hàng từ giỏ
                  </button>
                  <button
                    className="border px-4 py-2 rounded"
                    onClick={() => {
                      const body = encodeURIComponent(`Đặt hàng nhanh - ${customer.name} - ${customer.phone} - ${customer.address} - Ghi chú: ${customer.note}`);
                      window.location.href = `mailto:${SITE.email}?subject=Đặt hàng nhanh&body=${body}`;
                    }}
                  >
                    Gửi email đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white p-6 rounded-lg shadow" id="shipping">
          <h3 className="text-lg font-semibold mb-2">Vận chuyển & Cam kết</h3>
          <ul className="list-disc ml-6">
            <li>Giao hàng toàn quốc qua đơn vị vận chuyển uy tín (Viettel Post / Giao Hàng Nhanh) — phí theo biểu phí đơn vị vận chuyển.</li>
            <li>Hàng được đóng gói chống dập; đổi trả khi có lỗi do phía người bán.</li>
            <li>Hỗ trợ bán buôn cho cửa hàng — vui lòng liên hệ để có giá tốt.</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 text-white mt-10">
        <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h4 className="font-semibold">{SITE.name}</h4>
            <p className="text-sm">{SITE.short}</p>
          </div>
          <div className="text-sm">
            <div>Liên hệ: {SITE.phone} • {SITE.email}</div>
            <div className="mt-2">© {new Date().getFullYear()} {SITE.name}</div>
          </div>
        </div>
      </footer>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h4 className="text-xl font-semibold mb-3">Xác nhận đơn hàng</h4>
            <div className="mb-3">
              {cart.length === 0 ? (
                <div>Giỏ hàng rỗng.</div>
              ) : (
                <div className="space-y-2">
                  {cart.map((it) => (
                    <div key={it.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-gray-600">{formatVND(it.price)} x {it.qty}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" className="w-20 p-1 border rounded" value={it.qty} onChange={(e) => updateQty(it.id, Number(e.target.value))} />
                        <button className="text-red-600" onClick={() => removeItem(it.id)}>Xóa</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center font-bold mb-4">Tổng: {formatVND(subtotal())}</div>

            <div className="mb-4 p-3 bg-gray-50 rounded">
              <div className="text-sm mb-2"><strong>Thanh toán:</strong> {paymentMethod === 'bank' ? 'Chuyển khoản' : 'COD'}</div>
              {paymentMethod === 'bank' && (
                <div className="text-sm">
                  <div>{SITE.bank.bankName}</div>
                  <div>Chủ TK: {SITE.bank.accountName}</div>
                  <div>Số TK: {SITE.bank.accountNumber}</div>
                  <div className="mt-2">(Quét QR hoặc chuyển khoản — gửi ảnh chuyển khoản vào email sau khi chuyển để xác nhận)</div>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <button className="border px-4 py-2 rounded" onClick={() => setShowCheckout(false)}>Đóng</button>
              <button className="bg-[#166534] text-white px-4 py-2 rounded" onClick={handleSendOrder}>Gửi đơn (Email)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
