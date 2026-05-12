import { type FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";
import {
  Package,
  Zap,
  Crown,
  Check,
  Upload,
  X,
  ImageIcon,
  ChevronRight,
} from "lucide-react";
import HoursEditor from "../components/admin/HoursEditor";
import { CATEGORIES } from "../shared/categories";

type Plan = "basic" | "pro" | "premium";

const PLAN_CONFIG = {
  basic: {
    label: "Basic",
    price: "Gratuito",
    icon: Package,
    color: "border-slate-200 bg-white",
    activeColor: "border-slate-800 bg-slate-900",
    textActive: "text-white",
    badge: "bg-slate-100 text-slate-600",
    perks: [
      "Nome e categoria",
      "Localização",
      "Descrição",
      "WhatsApp",
    ],
    nope: ["Imagem", "Instagram", "Horário", "Destaque"],
    maxImages: 0,
  },
  pro: {
    label: "Pro",
    price: "R$ 97/mês",
    icon: Zap,
    color: "border-violet-200 bg-white",
    activeColor: "border-violet-600 bg-violet-600",
    textActive: "text-white",
    badge: "bg-violet-100 text-violet-600",
    perks: [
      "Nome e categoria",
      "Localização",
      "Descrição",
      "WhatsApp + Instagram",
      "Horário de funcionamento",
      "1 imagem de capa",
    ],
    nope: ["Destaque no portal", "Galeria de imagens"],
    maxImages: 1,
  },
  premium: {
    label: "Premium",
    price: "R$ 197/mês",
    icon: Crown,
    color: "border-amber-200 bg-white",
    activeColor: "border-amber-500 bg-amber-500",
    textActive: "text-white",
    badge: "bg-amber-100 text-amber-600",
    perks: [
      "Nome e categoria",
      "Localização",
      "Descrição",
      "WhatsApp + Instagram",
      "Horário de funcionamento",
      "Até 3 imagens",
      "Destaque no portal",
      "Faixa de preço",
    ],
    nope: [],
    maxImages: 3,
  },
} as const;

type ImageFile = { file: File; preview: string };

export default function AdminCompanyForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"choose-plan" | "form">("choose-plan");
  const [plan, setPlan] = useState<Plan>("basic");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    whatsapp: "",
    instagram: "",
    price_level: "R$",
    status: "active",
    featured: false,
    due_date: "",
    hours_text: "",
  });

  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const config = PLAN_CONFIG[plan];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const remaining = config.maxImages - images.length;
    const toAdd = files.slice(0, remaining).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...toAdd]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function uploadImages(): Promise<string[]> {
    const urls: string[] = [];
    for (const img of images) {
      const ext = img.file.name.split(".").pop();
      const path = `businesses/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("business-images")
        .upload(path, img.file, { upsert: false });
      if (error) throw new Error(`Erro ao enviar imagem: ${error.message}`);
      const { data } = supabase.storage.from("business-images").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setUploading(images.length > 0);
    setErrorMessage("");

    try {
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImages();
      }
      setUploading(false);

      const payload = {
        ...formData,
        plan,
        due_date: formData.due_date || null,
        instagram: plan === "basic" ? null : formData.instagram || null,
        hours_text: plan === "basic" ? null : formData.hours_text || null,
        featured: plan === "premium",
        price_level: plan === "premium" ? formData.price_level : "R$",
        image_url: imageUrls.length > 0
          ? imageUrls.length === 1
            ? imageUrls[0]
            : JSON.stringify(imageUrls)
          : null,
      };

      const { error } = await supabase.from("businesses").insert([payload]);
      if (error) throw new Error("Erro ao salvar empresa.");

      navigate("/admin/empresas");
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Erro inesperado.");
      setUploading(false);
    } finally {
      setLoading(false);
    }
  }

  // ── Step 1: choose plan ───────────────────────────────────────────
  if (step === "choose-plan") {
    return (
      <AdminLayout title="Nova empresa">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Escolha o plano da empresa</h2>
            <p className="mt-2 text-sm text-slate-500">
              O formulário será ajustado de acordo com os recursos do plano selecionado.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(["basic", "pro", "premium"] as Plan[]).map((p) => {
              const c = PLAN_CONFIG[p];
              const Icon = c.icon;
              const selected = plan === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`relative flex flex-col rounded-2xl border-2 p-6 text-left transition ${
                    selected ? c.activeColor + " shadow-lg" : c.color + " hover:border-slate-300"
                  }`}
                >
                  {selected && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                      <Check className={`h-3.5 w-3.5 ${selected ? c.textActive : ""}`} />
                    </span>
                  )}

                  <div className={`mb-4 w-fit rounded-xl p-2.5 ${selected ? "bg-white/20" : c.badge}`}>
                    <Icon className={`h-5 w-5 ${selected ? c.textActive : ""}`} />
                  </div>

                  <p className={`text-lg font-bold ${selected ? c.textActive : "text-slate-900"}`}>{c.label}</p>
                  <p className={`text-sm font-medium ${selected ? "text-white/80" : "text-slate-500"}`}>{c.price}</p>

                  <ul className="mt-4 space-y-1.5">
                    {c.perks.map((perk) => (
                      <li key={perk} className={`flex items-center gap-2 text-xs ${selected ? "text-white/90" : "text-slate-600"}`}>
                        <Check className="h-3 w-3 shrink-0" />
                        {perk}
                      </li>
                    ))}
                    {c.nope.map((item) => (
                      <li key={item} className={`flex items-center gap-2 text-xs line-through ${selected ? "text-white/40" : "text-slate-300"}`}>
                        <X className="h-3 w-3 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Continuar com plano {PLAN_CONFIG[plan].label}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // ── Step 2: form ──────────────────────────────────────────────────
  const Icon = config.icon;

  return (
    <AdminLayout title="Nova empresa">
      <div className="mx-auto max-w-3xl">
        {/* Plan badge */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setStep("choose-plan")}
            className="text-sm text-slate-400 hover:text-brand-500"
          >
            ← Trocar plano
          </button>
          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.badge}`}>
            <Icon className="h-3.5 w-3.5" />
            Plano {config.label} — {config.price}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">

            {/* Nome */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Nome da empresa *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Bistrô da Serra"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                required
              />
            </div>

            {/* Categoria */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Categoria *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                required
              >
                <option value="">Selecione...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Localização */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Localização *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Centro, Gravatá - PE"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                required
              />
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Descrição *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva a empresa, seus produtos e diferenciais..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="5581999999999"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
              />
            </div>

            {/* Instagram — Pro e Premium */}
            {plan !== "basic" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@empresa"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                />
              </div>
            )}

            {/* Horário — Pro e Premium */}
            {plan !== "basic" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Horário de funcionamento</label>
                <HoursEditor
                  value={formData.hours_text}
                  onChange={(json) => setFormData((prev) => ({ ...prev, hours_text: json }))}
                />
              </div>
            )}

            {/* Faixa de preço — apenas Premium */}
            {plan === "premium" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Faixa de preço</label>
                <select
                  name="price_level"
                  value={formData.price_level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
                >
                  <option value="R$">R$ — Econômico</option>
                  <option value="R$$">R$$ — Moderado</option>
                  <option value="R$$$">R$$$ — Sofisticado</option>
                  <option value="R$$$$">R$$$$ — Premium</option>
                </select>
              </div>
            )}

            {/* Status e Vencimento */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
              >
                <option value="active">Ativa</option>
                <option value="inactive">Inativa</option>
                <option value="pending">Pendente</option>
                <option value="expired">Vencida</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Data de vencimento</label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-400"
              />
            </div>

            {/* Imagens — Pro (1) e Premium (3) */}
            {plan !== "basic" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {plan === "pro" ? "Imagem de capa (1 foto)" : "Galeria de imagens (até 3 fotos)"}
                </label>

                {/* Preview grid */}
                {images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200">
                        <img src={img.preview} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                            Capa
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload area */}
                {images.length < config.maxImages && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 px-6 py-8 text-slate-400 transition hover:border-brand-300 hover:text-brand-500"
                  >
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {images.length === 0
                        ? "Clique para escolher imagem do computador"
                        : `Adicionar mais (${images.length}/${config.maxImages})`}
                    </span>
                    <Upload className="h-4 w-4" />
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple={config.maxImages > 1}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Formatos: JPG, PNG, WEBP. Tamanho máximo: 5 MB por imagem.
                  {config.maxImages > 1 && " A primeira imagem será usada como capa."}
                </p>
              </div>
            )}

            {/* Destaque automático no Premium */}
            {plan === "premium" && (
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Destaque incluído automaticamente</p>
                    <p className="text-xs text-amber-600">Empresas Premium já recebem o selo de destaque no portal</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="md:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Actions */}
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Enviando imagens...
                  </>
                ) : loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  "Salvar empresa"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/empresas")}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
