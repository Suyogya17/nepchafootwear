// src/pages/AdminDashboard.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService, uploadImage, authService } from '../services/api';

type Product = {
  _id: string; name: string; category: string;
  size: string; description: string;
  colors: { name: string; hex: string; image: string }[];
};

const emptyForm = {
  name: '', category: 'Sports', size: '36-40', description: '', colors: [] as { name: string; hex: string; image: string }[],
};

const COLOR_PRESETS: Record<string, string> = {
  Red: '#ef4444', White: '#f9fafb', Blue: '#3b82f6', Black: '#111827',
  Gray: '#6b7280', Navy: '#1e3a5f', Brown: '#92400e', Tan: '#d4a96a',
  Green: '#16a34a', Pink: '#ec4899',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts]   = useState<Product[]>([]);
  const [form, setForm]           = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fetchProducts = () => {
    productService.getAll().then(setProducts);
  };

  useEffect(() => { fetchProducts(); }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // ── Color helpers ──
  const addColor = () => {
    setForm((f) => ({
      ...f,
      colors: [...f.colors, { name: 'Red', hex: '#ef4444', image: '' }],
    }));
  };

  const removeColor = (i: number) => {
    setForm((f) => ({ ...f, colors: f.colors.filter((_, idx) => idx !== i) }));
  };

  const updateColor = (i: number, field: keyof { name: string; hex: string; image: string }, value: string) => {
    setForm((f) => {
      const colors = [...f.colors];
      colors[i] = { ...colors[i], [field]: value };
      if (field === 'name' && COLOR_PRESETS[value]) {
        colors[i].hex = COLOR_PRESETS[value];
      }
      return { ...f, colors };
    });
  };

  const handleImageUpload = async (i: number, file: File) => {
    try {
      const url = await uploadImage(file);
      updateColor(i, 'image', url);
      showMessage('Image uploaded!');
    } catch {
      showMessage('Image upload failed');
    }
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.name) { showMessage('Product name is required'); return; }
    if (form.colors.length === 0) { showMessage('Add at least one color'); return; }
    setLoading(true);
    try {
      if (editingId) {
        await productService.update(editingId, form);
        showMessage('Product updated!');
      } else {
        await productService.create(form);
        showMessage('Product created!');
      }
      setForm(emptyForm);
      setEditingId(null);
      setActiveTab('list');
      fetchProducts();
    } catch {
      showMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ── Edit ──
  const handleEdit = (p: Product) => {
    setForm({
      name: p.name, category: p.category,
      size: p.size, description: p.description, colors: p.colors,
    });
    setEditingId(p._id);
    setActiveTab('form');
  };

  // ── Delete ──
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await productService.delete(id);
    showMessage('Product deleted');
    fetchProducts();
  };

  // ── Logout ──
  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Topbar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-orange-500">Nepcha Admin</h1>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">{products.length} products</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>

      {/* Message toast */}
      {message && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg z-50">
          {message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => { setActiveTab('list'); setEditingId(null); setForm(emptyForm); }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === 'list'
                ? 'bg-orange-500 text-white'
                : 'bg-white border text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === 'form'
                ? 'bg-orange-500 text-white'
                : 'bg-white border text-gray-600 hover:bg-gray-50'
            }`}
          >
            {editingId ? 'Edit Product' : '+ Add Product'}
          </button>
        </div>

        {/* ── PRODUCT LIST ── */}
        {activeTab === 'list' && (
          <div className="grid gap-4">
            {products.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No products yet — click "Add Product" to get started.
              </div>
            )}
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {p.colors[0]?.image ? (
                    <img
                      src={p.colors[0].image.startsWith('http') ? p.colors[0].image : `https://nepcha-server.onrender.com${p.colors[0].image}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                      No img
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.category} · Size {p.size}</p>
                  <div className="flex gap-1.5 mt-1.5">
                    {p.colors.map((c, i) => (
                      <div
                        key={i}
                        title={c.name}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ background: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-4 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-4 py-1.5 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ADD / EDIT FORM ── */}
        {activeTab === 'form' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {editingId ? 'Edit Product' : 'New Product'}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Runner Pro"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option>Sports</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">Size range</label>
              <input
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="36-40"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the shoe..."
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>

            {/* Colors */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">Color variants</label>
                <button
                  onClick={addColor}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  + Add color
                </button>
              </div>

              {form.colors.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4 border border-dashed rounded-lg">
                  No colors yet — click "Add color"
                </p>
              )}

              {form.colors.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 border rounded-xl mb-3"
                >
                  {/* Color swatch preview */}
                  <div
                    className="w-8 h-8 rounded-full border flex-shrink-0"
                    style={{ background: c.hex }}
                  />

                  {/* Color name */}
                  <select
                    value={c.name}
                    onChange={(e) => updateColor(i, 'name', e.target.value)}
                    className="border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {Object.keys(COLOR_PRESETS).map((col) => (
                      <option key={col}>{col}</option>
                    ))}
                  </select>

                  {/* Hex picker */}
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => updateColor(i, 'hex', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                  />

                  {/* Image upload */}
                  <div className="flex-1 flex items-center gap-2">
                    {c.image ? (
                      <img
                        src={c.image.startsWith('http') ? c.image : `https://nepcha-server.onrender.com${c.image}`}
                        className="w-10 h-10 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs border">
                        img
                      </div>
                    )}
                    <button
                      onClick={() => fileRefs.current[i]?.click()}
                      className="text-xs text-blue-500 hover:underline"
                    >
                      {c.image ? 'Change' : 'Upload'}
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileRefs.current[i] = el; }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(i, file);
                      }}
                    />
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeColor(i)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Save button */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Saving...' : editingId ? 'Save Changes' : 'Create Product'}
              </button>
              <button
                onClick={() => { setActiveTab('list'); setEditingId(null); setForm(emptyForm); }}
                className="px-6 py-2.5 border rounded-xl text-gray-600 hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}