"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Icon, type IconName } from "@/components/Icon";

type CategoryId = "food" | "home" | "care" | "paper" | "packaging" | "equipment";
type Panel = "search" | "cart" | "quote" | "catalog" | null;

const categories: Array<{ id: CategoryId; title: string; detail: string; image: string; icon: IconName }> = [
  { id: "food", title: "อาหารและเครื่องดื่ม", detail: "อาหารแห้ง เครื่องดื่ม และของใช้บริโภค", image: "/images/categories/food.svg", icon: "basket" },
  { id: "home", title: "ของใช้ในบ้าน", detail: "ผลิตภัณฑ์ทำความสะอาดและดูแลบ้าน", image: "/images/categories/home.svg", icon: "sparkle" },
  { id: "care", title: "ของใช้ส่วนบุคคล", detail: "ผลิตภัณฑ์สำหรับการดูแลประจำวัน", image: "/images/categories/care.svg", icon: "shield" },
  { id: "paper", title: "กระดาษและผลิตภัณฑ์", detail: "กระดาษทิชชูและของใช้สิ้นเปลือง", image: "/images/categories/paper.svg", icon: "layers" },
  { id: "packaging", title: "บรรจุภัณฑ์และอุปกรณ์", detail: "บรรจุภัณฑ์และวัสดุสำหรับร้านค้า", image: "/images/categories/packaging.svg", icon: "box" },
  { id: "equipment", title: "อุปกรณ์จัดร้าน", detail: "ชั้นวางสินค้าและอุปกรณ์หน้าร้าน", image: "/images/categories/equipment.svg", icon: "store" },
];

const products: Array<{ id: string; name: string; category: CategoryId; detail: string }> = [
  { id: "food-1", name: "เครื่องดื่มและน้ำดื่ม", category: "food", detail: "ตัวอย่างหมวดสินค้าบริโภค" },
  { id: "food-2", name: "อาหารแห้งและเครื่องปรุง", category: "food", detail: "ตัวอย่างหมวดสินค้าบริโภค" },
  { id: "home-1", name: "น้ำยาทำความสะอาด", category: "home", detail: "ตัวอย่างหมวดของใช้ในบ้าน" },
  { id: "home-2", name: "อุปกรณ์ทำความสะอาด", category: "home", detail: "ตัวอย่างหมวดของใช้ในบ้าน" },
  { id: "care-1", name: "สบู่และของใช้ส่วนบุคคล", category: "care", detail: "ตัวอย่างหมวดสินค้าเพื่อการดูแล" },
  { id: "care-2", name: "แชมพูและผลิตภัณฑ์ดูแล", category: "care", detail: "ตัวอย่างหมวดสินค้าเพื่อการดูแล" },
  { id: "paper-1", name: "กระดาษทิชชู", category: "paper", detail: "ตัวอย่างหมวดกระดาษและผลิตภัณฑ์" },
  { id: "paper-2", name: "กระดาษสำหรับร้านค้า", category: "paper", detail: "ตัวอย่างหมวดของใช้สิ้นเปลือง" },
  { id: "packaging-1", name: "กล่องบรรจุภัณฑ์", category: "packaging", detail: "ตัวอย่างหมวดบรรจุภัณฑ์" },
  { id: "packaging-2", name: "วัสดุและอุปกรณ์แพ็กสินค้า", category: "packaging", detail: "ตัวอย่างหมวดบรรจุภัณฑ์" },
  { id: "equipment-1", name: "ชั้นวางสินค้า", category: "equipment", detail: "ตัวอย่างหมวดอุปกรณ์จัดร้าน" },
  { id: "equipment-2", name: "อุปกรณ์จัดพื้นที่หน้าร้าน", category: "equipment", detail: "ตัวอย่างหมวดอุปกรณ์ร้านค้า" },
];

const navLinks = [
  ["หน้าแรก", "#home"], ["เกี่ยวกับเรา", "#about"], ["บริการของเรา", "#services"],
  ["สินค้า", "#categories"], ["ขั้นตอนสั่งซื้อ", "#how-it-works"], ["ติดต่อเรา", "#contact"],
] as const;

const serviceCards: Array<{ key: string; number: string; english: string; title: string; copy: string; icon: IconName; style: string; photo: string }> = [
  { key: "retail", number: "01", english: "RETAIL", title: "จำหน่ายสินค้าปลีก", copy: "สินค้าอุปโภคบริโภคหลากหลายหมวดหมู่ สำหรับลูกค้าทั่วไป", icon: "cart", style: "retail", photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80" },
  { key: "wholesale", number: "02", english: "WHOLESALE", title: "จำหน่ายสินค้าส่ง", copy: "จัดหาสินค้าสำหรับร้านค้า ผู้ประกอบการ และธุรกิจองค์กร", icon: "box", style: "wholesale", photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80" },
  { key: "store", number: "03", english: "STOREFRONT SERVICES", title: "บริการจัดร้านค้า", copy: "คำปรึกษาด้านรูปแบบร้าน การจัดวางสินค้าและอุปกรณ์หน้าร้าน", icon: "store", style: "storefront", photo: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=900&q=80" },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className={`brand ${compact ? "brand-small" : ""}`} aria-label="SUPHALAK 1985 หน้าแรก">
      <span className="brand-seal"><Image src="/images/lion.webp" width={52} height={52} alt="ตราสัญลักษณ์สิงโตมงกุฎ SUPHALAK 1985" priority /></span>
      <span className="brand-copy"><strong>บริษัท ศุภลักษณ์ 1985 จำกัด</strong><small>SUPHALAK 1985 CO., LTD.</small></span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, detail, center = false }: { eyebrow: string; title: string; detail?: string; center?: boolean }) {
  return <div className={`section-title ${center ? "center" : ""}`}><span className="eyebrow-dark">{eyebrow}</span><h2>{title}</h2>{detail && <p>{detail}</p>}<i aria-hidden="true" className="gold-underline" /></div>;
}

export default function Home() {
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [quoteName, setQuoteName] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteItems, setQuoteItems] = useState("");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("suphalak1985-inquiry-items");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const valid: Record<string, number> = {};
          for (const [id, value] of Object.entries(parsed)) {
            if (products.some((p) => p.id === id) && typeof value === "number" && Number.isInteger(value) && value > 0 && value < 1000) valid[id] = value;
          }
          setCart(valid);
        }
      }
    } catch { /* Storage may be disabled in private browsing. */ }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) { try { window.localStorage.setItem("suphalak1985-inquiry-items", JSON.stringify(cart)); } catch { /* Ignore storage errors. */ } } }, [cart, hydrated]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setPanel(null); setMobileMenu(false); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => { document.body.style.overflow = panel || mobileMenu ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [panel, mobileMenu]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2900); return () => window.clearTimeout(timer); }, [toast]);

  const count = Object.values(cart).reduce((total, qty) => total + qty, 0);
  const filtered = useMemo(() => products.filter((p) =>
    (selectedCategory === "all" || p.category === selectedCategory) &&
    (`${p.name} ${categories.find((c) => c.id === p.category)?.title ?? ""}`).toLowerCase().includes(query.trim().toLowerCase())
  ), [selectedCategory, query]);
  const cartEntries = products.filter((p) => cart[p.id] > 0);

  function addItem(id: string) { setCart((old) => ({ ...old, [id]: Math.min((old[id] || 0) + 1, 999) })); setToast("เพิ่มสินค้าลงรายการสอบถามแล้ว"); }
  function adjustItem(id: string, diff: number) { setCart((old) => { const next = { ...old }; const qty = (next[id] || 0) + diff; if (qty > 0) next[id] = qty; else delete next[id]; return next; }); }
  function openCatalog(id: CategoryId | "all" = "all") { setSelectedCategory(id); setQuery(""); setPanel("catalog"); setMobileMenu(false); }
  async function copyText(value: string) {
    try { await navigator.clipboard.writeText(value); setToast("คัดลอกข้อความเรียบร้อย"); }
    catch { setToast("คัดลอกอัตโนมัติไม่ได้ กรุณาใช้เบราว์เซอร์ที่รองรับ HTTPS"); }
  }
  async function copyCart() {
    const text = ["สอบถามรายการสินค้า — บริษัท ศุภลักษณ์ 1985 จำกัด", "", ...cartEntries.map((item, i) => `${i + 1}. ${item.name} จำนวน ${cart[item.id]}`), "", "กรุณายืนยันราคา ความพร้อมจำหน่าย และเงื่อนไขการจัดส่ง"].join("\n");
    await copyText(text);
  }
  async function submitQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = ["เรียน บริษัท ศุภลักษณ์ 1985 จำกัด", "เรื่อง ขอสอบถามสินค้าและใบเสนอราคา", "", `ผู้ติดต่อ: ${quoteName.trim()}`, `โทรศัพท์: ${quotePhone.trim()}`, `ชื่อร้านหรือกิจการ: ${quoteCompany.trim() || "ไม่ระบุ"}`, "", "รายการที่ต้องการ:", quoteItems.trim(), "", "รบกวนแจ้งราคาจำหน่าย ขั้นต่ำการสั่งซื้อ และเงื่อนไขการจัดส่ง"].join("\n");
    await copyText(text); setPanel(null);
  }

  return <>
    <div className="announcement"><div className="container announcement-inner"><span>GROCERY RETAIL <b> | </b> WHOLESALE <b> | </b> STOREFRONT SERVICES</span><span className="announcement-thai">ค้าปลีก · ค้าส่ง · บริการจัดร้านครบวงจร</span></div></div>
    <header className="site-header">
      <div className="container header-content">
        <Logo />
        <nav className={`main-nav ${mobileMenu ? "show" : ""}`} aria-label="เมนูหลัก">
          {navLinks.map(([name, href]) => <a href={href} key={href} onClick={() => setMobileMenu(false)}>{name}</a>)}
          <button type="button" className="mobile-partner" onClick={() => { setMobileMenu(false); setPanel("quote"); }}>สำหรับคู่ค้า <Icon name="arrow" size={16}/></button>
        </nav>
        <div className="header-actions">
          <button className="icon-btn search-btn" aria-label="ค้นหาสินค้า" title="ค้นหาสินค้า" onClick={() => setPanel("search")}><Icon name="search" size={19}/></button>
          <button className="icon-btn" aria-label={`รายการสอบถามสินค้า ${count} รายการ`} title="รายการสอบถามสินค้า" onClick={() => setPanel("cart")}><Icon name="cart" size={19}/><span className="count-indicator">{count}</span></button>
          <button className="partner-btn" type="button" onClick={() => setPanel("quote")}><Icon name="user" size={16}/> สำหรับคู่ค้า</button>
          <button className="icon-btn menu-btn" aria-label={mobileMenu ? "ปิดเมนู" : "เปิดเมนู"} aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}><Icon name={mobileMenu ? "close" : "menu"} size={23}/></button>
        </div>
      </div>
    </header>
    {mobileMenu && <button className="mobile-backdrop" aria-label="ปิดเมนู" onClick={() => setMobileMenu(false)} />}
    <main>
      <section id="home" className="hero">
        <div className="hero-supermarket" aria-hidden="true" />
        <div className="hero-arc hero-arc-one" aria-hidden="true" /><div className="hero-arc hero-arc-two" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-content">
            <div className="hero-eyebrow"><span /> EVERYDAY ESSENTIALS FOR PEOPLE & BUSINESSES</div>
            <h1 className="desktop-hero-headline">บริษัท ศุภลักษณ์ <em>1985</em> จำกัด<span className="english-heading">SUPHALAK 1985 CO., LTD.</span></h1>
            <h1 className="mobile-hero-headline">ศุภลักษณ์ <em>1985</em><br/>ครบทุกความต้องการ<br/><span>สินค้าร้านค้าและค้าส่ง</span><br/>ในที่เดียว</h1>
            <h2>ครบทุกความต้องการสินค้าอุปโภคบริโภค<br/>ทั้งค้าปลีก ค้าส่ง และบริการจัดร้านค้าในที่เดียว</h2>
            <p>พันธมิตรด้านสินค้าอุปโภคบริโภคสำหรับทุกความต้องการ ครอบคลุมการจัดหา กระจายสินค้า และบริการจัดร้านอย่างมืออาชีพ เพื่อสนับสนุนธุรกิจของคุณ</p>
            <div className="hero-buttons">
              <button type="button" className="btn btn-gold" onClick={() => openCatalog()}>เลือกดูสินค้าและหมวดหมู่ <Icon name="chevron" size={17}/></button>
              <button type="button" className="btn btn-outline" onClick={() => setPanel("quote")}>ติดต่อขอใบเสนอราคา <Icon name="chevron" size={17}/></button>
            </div>
            <div className="hero-highlights"><span><Icon name="truck" size={18}/> สินค้าหลากหลาย</span><span><Icon name="award" size={18}/> รองรับงานขายส่ง</span><span><Icon name="handshake" size={18}/> บริการสำหรับร้านค้า</span></div>
          </div>
          <div className="hero-art" aria-label="โลโก้สิงโตมงกุฎของบริษัท">
            <div className="hero-ring ring1"/><div className="hero-ring ring2"/><div className="hero-ring ring3"/>
            <div className="hero-logo-disc"><Image src="/images/lion.webp" alt="ตราสัญลักษณ์สิงโตสวมมงกุฎ SUPHALAK 1985" width={360} height={360} priority /></div>
            <div className="hero-logo-name"><strong>SUPHALAK 1985</strong><small>RETAIL · WHOLESALE · STOREFRONT</small></div>
          </div>
        </div>
      </section>
      <section className="usp-strip" aria-label="จุดเด่นของบริการ"><div className="container usp-grid">
        {[
          { icon: "basket" as IconName, title: "สินค้าที่ตอบโจทย์", desc: "ทั้งลูกค้าทั่วไปและธุรกิจ" },
          { icon: "box" as IconName, title: "ครบครันทุกหมวดหมู่", desc: "ของใช้และสินค้าอุปโภคบริโภค" },
          { icon: "store" as IconName, title: "บริการจัดร้านครบวงจร", desc: "ให้คำแนะนำและจัดหาอุปกรณ์" },
          { icon: "shield" as IconName, title: "มุ่งเน้นความเชื่อมั่น", desc: "บริการด้วยความใส่ใจในคุณภาพ" },
        ].map((p) => <div key={p.title} className="usp-item"><div className="usp-icon"><Icon name={p.icon} size={25}/></div><div><strong>{p.title}</strong><small>{p.desc}</small></div></div>)}
      </div></section>
      <section id="services" className="services-section section-space"><div className="container services-layout">
        <div className="services-intro"><SectionTitle eyebrow="OUR BUSINESS SERVICES" title="บริการที่ตอบโจทย์ ทั้งลูกค้าทั่วไปและร้านค้า" detail="ธุรกิจค้าปลีก ค้าส่ง และบริการสำหรับร้านค้า เพื่อรองรับความต้องการในทุกด้าน" /></div>
        {serviceCards.map((card) => <article key={card.key} className={`service-card ${card.style}`}>
          <div className="service-photo" style={{ backgroundImage: `url('${card.photo}')` }} aria-hidden="true" />
          <div className="service-content"><div className="service-card-top"><div className="service-icon"><Icon name={card.icon} size={27}/></div><span>{card.number} / {card.english}</span></div><div className="service-body"><h3>{card.title}</h3><p>{card.copy}</p><button type="button" onClick={() => card.key === "wholesale" ? setPanel("quote") : card.key === "store" ? document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}) : openCatalog()} className="text-link">ดูรายละเอียด <Icon name="chevron" size={15}/></button></div></div>
        </article>)}
      </div></section>
      <section id="categories" className="categories-section"><div className="container">
        <div className="categories-head"><SectionTitle eyebrow="PRODUCT CATEGORIES" title="หมวดสินค้าแนะนำ" detail="สินค้าอุปโภคบริโภคและอุปกรณ์ที่คัดสรรให้ครอบคลุมความต้องการ"/><button className="all-categories" onClick={() => openCatalog()}>ดูสินค้าทั้งหมด <Icon name="arrow" size={17}/></button></div>
        <div className="categories-grid">{categories.map((c) => <button type="button" key={c.id} className="category-card" onClick={() => openCatalog(c.id)} aria-label={`เปิดหมวด ${c.title}`}><div className="category-art"><Image src={c.image} alt="" width={240} height={155} /></div><span className="category-caption">{c.title}<Icon name="chevron" size={15}/></span></button>)}</div>
      </div></section>
      <section className="mobile-trust" aria-label="ทำไมต้องเลือก ศุภลักษณ์ 1985">
        <div className="container">
          <h2>ทำไมต้องเลือก <span>ศุภลักษณ์ 1985</span></h2>
          <div className="mobile-trust-grid">
            {[
              { icon:"award" as IconName, title:"ประสบการณ์", detail:"ความน่าเชื่อถือ" },
              { icon:"shield" as IconName, title:"สินค้าคุณภาพ", detail:"ครบทุกหมวดหมู่" },
              { icon:"user" as IconName, title:"ดูแลลูกค้า", detail:"อย่างมืออาชีพ" },
              { icon:"handshake" as IconName, title:"พันธมิตร", detail:"ธุรกิจของคุณ" }
            ].map((item)=><div className="mobile-trust-item" key={item.title}><Icon name={item.icon} size={25}/><strong>{item.title}</strong><small>{item.detail}</small></div>)}
          </div>
        </div>
      </section>
      <section className="work-section" id="how-it-works"><div className="container work-grid">
        <div className="work-intro"><SectionTitle eyebrow="HOW IT WORKS" title="ติดต่อสั่งสินค้าได้ใน 3 ขั้นตอน" detail="ขั้นตอนง่าย ๆ สำหรับลูกค้าทั่วไป ผู้ประกอบการ และร้านค้า"/></div>
        {[
          { no: "01", icon: "cart" as IconName, title: "เลือกสินค้าและจำนวน", desc: "เลือกหมวดสินค้าหรือแจ้งรายการที่ต้องการ" },
          { no: "02", icon: "file" as IconName, title: "รับใบเสนอราคา", desc: "ติดต่อสอบถามและรับการยืนยันราคา" },
          { no: "03", icon: "truck" as IconName, title: "ยืนยันการสั่งซื้อและจัดส่ง", desc: "ตกลงรายละเอียดการสั่งซื้อกับเจ้าหน้าที่" },
        ].map((s) => <div key={s.no} className="step-card"><span className="step-icon"><Icon name={s.icon} size={32}/></span><div><b>{s.no}</b><strong>{s.title}</strong><small>{s.desc}</small></div><Icon name="chevron" size={16} className="step-chevron"/></div>)}
      </div></section>
      <section id="about" className="about-band"><div className="container about-content"><div className="about-heading"><span className="micro-gold">ABOUT OUR COMPANY</span><h2>บริษัท ศุภลักษณ์ 1985 จำกัด</h2><strong>SUPHALAK 1985 CO., LTD.</strong></div><p>เรามุ่งเน้นการจัดจำหน่ายสินค้าอุปโภคบริโภค ทั้งค้าปลีก ค้าส่ง และบริการด้านการจัดร้านค้า เพื่อเป็นส่วนหนึ่งในการสนับสนุนธุรกิจของคู่ค้าให้เติบโต</p><a href="#contact" className="btn btn-gold">รู้จักบริษัทของเรา <Icon name="chevron" size={17}/></a><div className="about-watermark"><Image src="/images/lion.webp" width={170} height={170} alt=""/></div></div></section>
      <section className="contact-section"><div className="container contact-grid"><div><SectionTitle eyebrow="CONTACT OUR TEAM" title="ติดต่อสอบถามข้อมูล" detail="สนใจสินค้า ค้าส่ง หรือบริการจัดร้านค้า สามารถจัดรายการเพื่อสอบถามได้ผ่านเว็บไซต์ต้นแบบนี้"/><div className="contact-note"><Icon name="shield" size={18}/><span>โปรดใช้ช่องทางติดต่อของบริษัทที่ได้รับการยืนยันก่อนส่งข้อมูลส่วนบุคคลหรือชำระเงิน</span></div></div><div className="contact-card"><span className="micro-gold">BUSINESS INQUIRY</span><h3>สอบถามรายการสินค้า / ขอใบเสนอราคา</h3><p>เลือกสินค้าไว้ในรายการ หรือกรอกรายละเอียดเพื่อจัดเตรียมข้อความสอบถาม</p><button className="btn btn-navy btn-wide" onClick={() => setPanel("quote")}>กรอกข้อมูลขอใบเสนอราคา <Icon name="arrow" size={17}/></button><small>แบบฟอร์มต้นแบบจะคัดลอกข้อความเท่านั้น ไม่มีการส่งข้อมูลเข้าเซิร์ฟเวอร์</small></div></div></section>
    </main>
    <footer id="contact" className="footer"><div className="container footer-grid"><div className="footer-brand"><Logo compact/><p>สินค้าอุปโภคบริโภค ค้าปลีก ค้าส่ง และบริการจัดร้านค้า</p></div><div className="footer-col"><strong>เมนูหลัก</strong><a href="#home">หน้าแรก</a><a href="#about">เกี่ยวกับเรา</a><a href="#services">บริการของเรา</a><a href="#contact">ติดต่อเรา</a></div><div className="footer-col"><strong>หมวดสินค้า</strong><button onClick={() => openCatalog("food")}>อาหารและเครื่องดื่ม</button><button onClick={() => openCatalog("home")}>ของใช้ในบ้าน</button><button onClick={() => openCatalog("care")}>ของใช้ส่วนบุคคล</button><button onClick={() => openCatalog("equipment")}>อุปกรณ์จัดร้าน</button></div><div className="footer-col"><strong>สำหรับคู่ค้า</strong><button onClick={() => setPanel("quote")}>ขอใบเสนอราคา</button><button onClick={() => setPanel("cart")}>รายการสอบถามสินค้า</button><a href="#how-it-works">ขั้นตอนติดต่อสั่งซื้อ</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SUPHALAK 1985 CO., LTD. | Website Design Preview</span><span>เว็บไซต์ต้นแบบ — ข้อมูลสินค้าและเงื่อนไขต้องได้รับการยืนยันก่อนเผยแพร่จริง</span></div></footer>

    {panel && <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setPanel(null); }} role="presentation">
      <section className={`dialog ${panel === "cart" ? "drawer" : ""} ${panel === "catalog" ? "catalog-dialog" : ""}`} role="dialog" aria-modal="true" aria-label={panel === "quote" ? "แบบฟอร์มขอใบเสนอราคา" : panel === "cart" ? "รายการสอบถามสินค้า" : "ค้นหาสินค้า"}>
        <div className="dialog-header"><div><span className="micro-gold">SUPHALAK 1985</span><h2>{panel === "cart" ? `รายการสอบถามสินค้า (${count})` : panel === "quote" ? "ติดต่อขอใบเสนอราคา" : panel === "search" ? "ค้นหาสินค้า" : "หมวดหมู่และรายการสินค้า"}</h2></div><button className="dialog-close" aria-label="ปิดหน้าต่าง" onClick={() => setPanel(null)}><Icon name="close" size={22}/></button></div>
        {panel === "quote" && <form className="quote-form" onSubmit={submitQuote}>
          <p>กรอกข้อมูลเพื่อสร้างข้อความขอใบเสนอราคา จากนั้นนำข้อความไปส่งผ่านช่องทางติดต่อที่ได้รับการยืนยันจากบริษัท</p>
          <label>ชื่อผู้ติดต่อ <b>*</b><input required minLength={2} maxLength={120} autoComplete="name" value={quoteName} onChange={(e) => setQuoteName(e.target.value)} placeholder="ชื่อ-นามสกุล"/></label>
          <label>เบอร์โทรศัพท์ <b>*</b><input required type="tel" minLength={8} maxLength={25} autoComplete="tel" value={quotePhone} onChange={(e) => setQuotePhone(e.target.value)} placeholder="หมายเลขที่สามารถติดต่อได้"/></label>
          <label>ชื่อร้าน / บริษัท<input maxLength={160} value={quoteCompany} onChange={(e) => setQuoteCompany(e.target.value)} placeholder="ระบุชื่อกิจการ (ถ้ามี)"/></label>
          <label>รายการและจำนวนสินค้า <b>*</b><textarea required rows={4} maxLength={2500} value={quoteItems} onChange={(e) => setQuoteItems(e.target.value)} placeholder="เช่น น้ำดื่ม 20 แพ็ก, ข้าวสาร 10 ถุง"/></label>
          <div className="form-note"><Icon name="shield" size={17}/> ข้อมูลนี้จะไม่ถูกส่งหรือบันทึกในระบบออนไลน์</div>
          <button type="submit" className="btn btn-gold btn-wide">คัดลอกข้อความสอบถาม <Icon name="copy" size={18}/></button>
        </form>}
        {(panel === "catalog" || panel === "search") && <div className="catalog-content">
          <div className="catalog-search"><Icon name="search" size={19}/><input aria-label="ค้นหาจากชื่อหรือหมวดสินค้า" autoFocus placeholder="ค้นหาสินค้าที่สนใจ..." value={query} onChange={(e) => setQuery(e.target.value)}/></div>
          <div className="catalog-filters"><button className={selectedCategory === "all" ? "active" : ""} onClick={() => setSelectedCategory("all")}>ทั้งหมด</button>{categories.map((c) => <button key={c.id} className={selectedCategory === c.id ? "active" : ""} onClick={() => setSelectedCategory(c.id)}>{c.title}</button>)}</div>
          <p className="catalog-disclaimer">รายการด้านล่างเป็นตัวอย่างประเภทสินค้า ไม่ใช่รายการสต๊อกหรือราคาที่ได้รับการยืนยัน</p>
          {filtered.length ? <div className="catalog-products">{filtered.map((p) => { const c = categories.find((x) => x.id === p.category)!; return <div key={p.id} className="catalog-product"><div className="catalog-product-icon"><Icon name={c.icon} size={27}/></div><div><span>{c.title}</span><strong>{p.name}</strong><small>{p.detail} · สอบถามราคา</small></div><button onClick={() => addItem(p.id)} aria-label={`เพิ่ม ${p.name} ลงรายการสอบถาม`}><Icon name="plus" size={21}/></button></div>; })}</div> : <p className="no-results">ไม่พบรายการที่ตรงกับคำค้นหา</p>}
          <button className="btn btn-navy btn-wide" onClick={() => setPanel("cart")}>ดูรายการสอบถาม ({count}) <Icon name="cart" size={18}/></button>
        </div>}
        {panel === "cart" && <><div className="cart-content">{cartEntries.length ? cartEntries.map((p) => { const c = categories.find((x) => x.id === p.category)!; return <div className="cart-entry" key={p.id}><div className="cart-icon"><Icon name={c.icon} size={25}/></div><div className="cart-info"><strong>{p.name}</strong><small>{c.title}</small><div className="quantity"><button aria-label={`ลดจำนวน ${p.name}`} onClick={() => adjustItem(p.id, -1)}><Icon name="minus" size={16}/></button><span>{cart[p.id]}</span><button aria-label={`เพิ่มจำนวน ${p.name}`} onClick={() => adjustItem(p.id, 1)}><Icon name="plus" size={16}/></button></div></div><button className="remove-cart" aria-label={`ลบ ${p.name}`} onClick={() => adjustItem(p.id, -cart[p.id])}><Icon name="trash" size={17}/></button></div>; }) : <div className="empty-cart"><Icon name="cart" size={52}/><h3>ยังไม่มีรายการที่เลือก</h3><p>เลือกสินค้าจากหมวดหมู่เพื่อเตรียมรายการสอบถาม</p><button className="btn btn-navy" onClick={() => openCatalog()}>เลือกสินค้า <Icon name="arrow" size={17}/></button></div>}</div>{cartEntries.length > 0 && <div className="cart-footer"><div className="cart-total"><span>จำนวนสินค้ารวม</span><strong>{count} รายการ</strong></div><button className="btn btn-gold btn-wide" onClick={copyCart}>คัดลอกรายการเพื่อสอบถาม <Icon name="copy" size={17}/></button><small>การเพิ่มสินค้าเป็นเพียงการจัดรายการ ไม่ใช่การสั่งซื้อหรือชำระเงินจริง</small></div>}</>}
      </section>
    </div>}
    {toast && <div className="toast" role="status"><Icon name="check" size={17}/>{toast}</div>}
  </>;
}
