import React, { useState } from 'react';

// مكتبة الأيقونات والأسهم المتحركة الفخمة للوضعين
const Icons = {
Speaker: () => (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
</svg>
),
ArrowLeft: () => (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
<line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
</svg>
),
ArrowRightAnim: () => (
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="moving-arrow">
<line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
</svg>
),
User: () => (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
</svg>
),
Lock: () => (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
),
Eye: () => (
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
)
};

export default function App() {
const [theme, setTheme] = useState<'dark' | 'light'>('dark');
const [screen, setScreen] = useState<'login' | 'main' | 'care_menu' | 'blind_ai' | 'elderly_dashboard' | 'everyone_dashboard' | 'bank_operation' | 'everyone_bank_operation'>('login');
// الاحتفاظ بكامل البيانات والحقول المعتمدة سابقاً دون تغيير
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [activeTab, setActiveTab] = useState<'analysis' | 'bills' | 'codes'>('bills');
const [everyoneActiveTab, setEveryoneActiveTab] = useState<'analysis' | 'bills' | 'codes'>('bills');
const [selectedBank, setSelectedBank] = useState<{ id: string; name: string; balance: string } | null>(null);

const [recipientName, setRecipientName] = useState('');
const [transferAmount, setTransferAmount] = useState('');
const [generatedCode, setGeneratedCode] = useState<string | null>(null);
const [aiText, setAiText] = useState('مرحباً بك في نظام أثير الصامت للمكفوفين. انقر على الكرة المتوهجة وسأسمعك فوراً...');

// تشغيل الصوت حصرياً لكبار السن بشكل صامت واختياري
const speakForElderly = (text: string) => {
if ('speechSynthesis' in window && screen === 'elderly_dashboard') {
window.speechSynthesis.cancel();
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'ar-SA';
utterance.rate = 0.9;
window.speechSynthesis.speak(utterance);
}
};

const localBanks = [
{ id: 'rajhi', name: 'مصرف الراجحي', balance: '14,500 ر.س' },
{ id: 'snb', name: 'الأهلي SNB', balance: '6,200 ر.س' },
{ id: 'alinma', name: 'مصرف الإنماء', balance: '4,100 ر.س' },
{ id: 'sabb', name: 'الأول SABB', balance: '8,300 ر.س' }
];

// الألوان البصرية المحسنة فائدة التوهج والجمال
const currentTheme = theme === 'dark' ? {
bg: 'linear-gradient(180deg, #15092d 0%, #05020c 100%)',
containerBg: '#090416',
cardBg: 'rgba(255, 255, 255, 0.03)',
cardBorder: '1px solid rgba(168, 85, 247, 0.4)',
glow: '0 0 25px rgba(168, 85, 247, 0.45)',
textMain: '#ffffff',
textSub: '#cbd5e1',
buttonBg: 'linear-gradient(135deg, #b55fe6 0%, #5046e5 100%)',
inputBg: 'rgba(255, 255, 255, 0.05)',
inputBorder: '1px solid rgba(168, 85, 247, 0.25)'
} : {
bg: 'linear-gradient(180deg, #f3e8ff 0%, #ffffff 100%)',
containerBg: '#f8fafc',
cardBg: '#ffffff',
cardBorder: '1px solid #d8b4fe',
glow: '0 10px 30px rgba(168, 85, 247, 0.15)',
textMain: '#1e1b4b',
textSub: '#6b7280',
buttonBg: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 100%)',
inputBg: '#ffffff',
inputBorder: '1px solid #e9d5ff'
};

return (
<div style={{ ...styles.container, backgroundColor: currentTheme.containerBg }}>
{styles.animationStyles}

<button style={styles.themeToggleFab} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
{theme === 'dark' ? '☀️ تشغيل الوضع الفاتح المبهج' : '🌙 تشغيل الوضع الغامق المشع'}
</button>

<div style={{ ...styles.phoneFrame, background: currentTheme.bg, borderColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.35)' : '#e9d5ff', boxShadow: currentTheme.glow }}>

<div style={styles.phoneHeader}>
<span style={{ fontSize: '13px', fontWeight: 600, color: currentTheme.textMain }}>9:41</span>
<div style={styles.notch}></div>
<div style={{ display: 'flex', gap: '4px', color: currentTheme.textMain }}>📶 🔋</div>
</div>

{/* 0. صفحة تسجيل الدخول */}
{screen === 'login' && (
<div style={styles.screenWrapper}>
<div style={styles.logoSection}>
<div style={{ ...styles.logoBox, boxShadow: currentTheme.glow }}><span style={styles.logoTextEn}>NAWAA</span></div>
<h1 style={{ ...styles.logoTitleAr, color: currentTheme.textMain }}>منصة نواء</h1>
<p style={{ ...styles.logoSubTitle, color: currentTheme.textSub }}>بوابتك المالية المستدامة والمبتكرة</p>
</div>

<div style={styles.formSection}>
<div style={styles.inputWrapper}>
<input type="text" placeholder="اسم المستخدم" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={username} onChange={(e) => setUsername(e.target.value)} />
<span style={{ ...styles.inputIcon, color: currentTheme.textSub }}><Icons.User /></span>
</div>
<div style={styles.inputWrapper}>
<input type="password" placeholder="الرمز السري" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={password} onChange={(e) => setPassword(e.target.value)} />
<span style={{ ...styles.inputIcon, color: currentTheme.textSub }}><Icons.Lock /></span>
<span style={{ ...styles.eyeIcon, color: currentTheme.textSub }}><Icons.Eye /></span>
</div>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.primaryButton, background: currentTheme.buttonBg }} onClick={() => setScreen('main')}>
📥 التحقق وفتح المحفظة
</button>
</div>
</div>
)}

{/* 1. الشاشة الرئيسية */}
{screen === 'main' && (
<div style={styles.screenWrapper}>
<div style={styles.logoSection}>
<div style={{ ...styles.logoBox, boxShadow: currentTheme.glow }}><span style={styles.logoTextEn}>NAWAA</span></div>
<h1 style={{ ...styles.logoTitleAr, color: currentTheme.textMain }}>منصة نواء</h1>
</div>

<div style={{ ...styles.formSection, marginTop: '40px' }}>
<button className="btn-active-effect glow-btn-anim interactive-arrow-btn" style={{ ...styles.primaryButton, background: currentTheme.buttonBg }} onClick={() => setScreen('care_menu')}>
<span>الدخول إلى نَوَاءْ الرعاية</span>
<Icons.ArrowRightAnim />
</button>

<button className="btn-active-effect glow-btn-anim interactive-arrow-btn" style={{ ...styles.primaryButton, background: currentTheme.buttonBg, marginTop: '8px' }} onClick={() => setScreen('everyone_dashboard')}>
<span>الدخول إلى نَوَاءْ الجميع</span>
<Icons.ArrowRightAnim />
</button>
</div>
</div>
)}

{/* 2. قائمة نواء الرعاية */}
{screen === 'care_menu' && (
<div style={styles.screenWrapper}>
<div style={styles.headerBar}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => setScreen('main')}><Icons.ArrowLeft /> رجوع</button>
</div>

<div style={{ ...styles.formSection, gap: '24px', marginTop: '40px' }}>
<button className="btn-active-effect text-glow-card glow-btn-anim" style={{ ...styles.kpiCardInteractive, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }} onClick={() => setScreen('blind_ai')}>
<div style={{ textAlign: 'right', flex: 1 }}>
<div style={{ fontWeight: '950', color: currentTheme.textMain, fontSize: '20px' }}>بوابة للمكفوفين</div>
<div style={{ fontSize: '13px', color: currentTheme.textSub, marginTop: '6px' }}>محادثة ذكاء اصطناعي تفاعلية مع كرة صوتية بنفسجية متوهجة</div>
</div>
</button>

<button className="btn-active-effect text-glow-card glow-btn-anim" style={{ ...styles.kpiCardInteractive, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }} onClick={() => setScreen('elderly_dashboard')}>
<div style={{ textAlign: 'right', flex: 1 }}>
<div style={{ fontWeight: '950', color: currentTheme.textMain, fontSize: '20px' }}>لكبار السن</div>
<div style={{ fontSize: '13px', color: currentTheme.textSub, marginTop: '6px' }}>الترتيب الشبكي المنظم للعمليات والتحليلات والفواتير</div>
</div>
</button>
</div>
</div>
)}

{/* 3. بوابة المكفوفين */}
{screen === 'blind_ai' && (
<div style={styles.screenWrapper}>
<div style={styles.headerBar}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => setScreen('care_menu')}><Icons.ArrowLeft /> رجوع</button>
</div>
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
<div style={styles.aiOrbWrapper}>
<div style={{ ...styles.radarPulse, borderColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.5)' : '#ec4899' }}></div>
<div style={{ ...styles.glowingAiOrb, background: 'radial-gradient(circle, #c084fc 0%, #6366f1 100%)', boxShadow: currentTheme.glow }}>
<div style={styles.orbInnerCore}></div>
</div>
</div>
<div style={{ ...styles.aiResponseBox, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder }}>
<p style={{ color: currentTheme.textMain, fontSize: '14px', margin: 0, lineHeight: '1.6', textAlign: 'center' }}>{aiText}</p>
</div>
<div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.suggestionBadge, color: currentTheme.textMain, borderColor: currentTheme.cardBorder }} onClick={() => setAiText("رصيدك الحالي في حساب الراجحي هو 14,500 ريال سعودي.")}>💬 "كم بحسابي في بنك الراجحي؟"</button>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.suggestionBadge, color: currentTheme.textMain, borderColor: currentTheme.cardBorder }} onClick={() => setAiText("جاري إنشاء أمر تحويل سريع وتأكيد البيانات لإرسالها لصديقك المعتمد.")}>💬 "أبي أحول لصديقي"</button>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.suggestionBadge, color: currentTheme.textMain, borderColor: currentTheme.cardBorder }} onClick={() => setAiText("إجمالي أرصدتك المجمعة في جميع حساباتك المحلية هو 33,100 ريال سعودي.")}>💬 "كم رصيدي الإجمالي؟"</button>
</div>
</div>
</div>
)}

{/* 4. بوابة كبار السن */}
{screen === 'elderly_dashboard' && (
<div style={styles.screenWrapper}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => setScreen('care_menu')}><Icons.ArrowLeft /> عودة</button>
<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
<span style={{ color: currentTheme.textMain, fontSize: '18px', fontWeight: '900' }}>مرحباً، {username || 'حصة'} 👋</span>
<button style={{ ...styles.rowSpeakerBtn, color: theme === 'dark' ? '#c084fc' : '#ec4899' }} onClick={() => speakForElderly(`مرحباً بك يا ${username || 'حصة'}، رصيدك المجمع ثلاثة وثلاثون ألف ومائة ريال سعودي`)}><Icons.Speaker /></button>
</div>
</div>

<div style={{ ...styles.balanceCardHeaderBox, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }}>
<div style={{ display: 'flex', justifyContent: 'space-between', color: currentTheme.textSub, fontSize: '13px' }}>
<span>الرصيد الإجمالي الموحد</span>
<button style={{ ...styles.rowSpeakerBtn, color: '#c084fc' }} onClick={() => speakForElderly("الرصيد الإجمالي الموحد هو ثلاثة وثلاثون ألف ومائة ريال سعودي")}><Icons.Speaker /></button>
</div>
<div style={{ fontSize: '32px', fontWeight: '950', color: currentTheme.textMain, textAlign: 'center', marginTop: '6px' }}>33,100 ر.س</div>
</div>

<div style={styles.banksGrid}>
{localBanks.map(bank => (
<div key={bank.id} className="btn-active-effect glow-btn-anim" style={{ ...styles.bankGridCard, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }} onClick={() => { setSelectedBank(bank); setScreen('bank_operation'); }}>
<div style={styles.bankGridHeader}>
<span style={{ color: theme === 'dark' ? '#38bdf8' : '#a855f7', fontWeight: '900' }}>{bank.name}</span>
<button style={{ ...styles.rowSpeakerBtn, color: '#c084fc' }} onClick={(e) => { e.stopPropagation(); speakForElderly(`حساب ${bank.name} رصيده المتاح ${bank.balance}`); }}><Icons.Speaker /></button>
</div>
<div style={{ color: currentTheme.textMain, fontSize: '18px', fontWeight: '900', marginTop: '4px' }}>{bank.balance}</div>
</div>
))}
</div>

<div style={styles.tabsMenuBar}>
<button style={{ ...styles.menuTabBtn, background: activeTab === 'analysis' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: activeTab === 'analysis' ? '#ffffff' : currentTheme.textSub }} onClick={() => setActiveTab('analysis')}>📊 التحليل</button>
<button style={{ ...styles.menuTabBtn, background: activeTab === 'bills' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: activeTab === 'bills' ? '#ffffff' : currentTheme.textSub }} onClick={() => setActiveTab('bills')}>📑 الفواتير</button>
<button style={{ ...styles.menuTabBtn, background: activeTab === 'codes' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: activeTab === 'codes' ? '#ffffff' : currentTheme.textSub }} onClick={() => setActiveTab('codes')}>🔑 الأكواد</button>
</div>

<div style={{ ...styles.detailsContentBox, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }}>
{activeTab === 'bills' && (
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800' }}>الفواتير المستحقة والسداد التلقائي:</span>
<button style={styles.rowSpeakerBtn} onClick={() => speakForElderly("لديك فواتير مستحقة بقيمة تسعمائة وعشرون ريال، اضغط لتفويض السداد")}><Icons.Speaker /></button>
</div>
<div style={{ fontSize: '11px', color: currentTheme.textSub, marginBottom: '8px' }}>شركة المياه: 350 ر.س | شركة الكهرباء: 420 ر.س | الاتصالات: 150 ر.س</div>
<button className="btn-active-effect glow-btn-anim" style={styles.greenAuthorizeBtn} onClick={() => alert("تم سداد الفواتير تفويضياً")}>تفويض الوكيل الذكي والسداد فوراً</button>
</div>
)}

{activeTab === 'analysis' && (
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800' }}>تحليل ميزانية الراتب والمصروفات:</span>
<button style={styles.rowSpeakerBtn} onClick={() => speakForElderly("الإيجار يستهلك خمسون بالمائة والمصاريف ثلاثون بالمائة")}><Icons.Speaker /></button>
</div>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: currentTheme.textSub }}><span>🏠 السكن والإيجار (50%)</span><span>2,500 ر.س</span></div>
<div style={styles.barBg}><div style={{ ...styles.barFill, width: '50%', background: '#a855f7' }}></div></div>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: currentTheme.textSub }}><span>🛒 مصاريف المعيشة (30%)</span><span>1,500 ر.س</span></div>
<div style={styles.barBg}><div style={{ ...styles.barFill, width: '30%', background: '#f472b6' }}></div></div>
</div>
</div>
)}

{activeTab === 'codes' && (
<div>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800' }}>توليد أكواد السحب للأبناء:</span>
<button style={styles.rowSpeakerBtn} onClick={() => speakForElderly("انقر لتوليد كود سحب فوري للأبناء بمبلغ ثلاثمائة ريال")}><Icons.Speaker /></button>
</div>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, width: '100%', background: currentTheme.buttonBg }} onClick={() => setGeneratedCode("NW-98842")}>🆕 توليد كود سحب مؤقت (إرسال للأبناء)</button>
{generatedCode && <div style={styles.resultCodeBox}>كود السحب النشط: {generatedCode}</div>}
</div>
)}
</div>
</div>
)}

{/* 5. شاشة العمليات المستقلة لكبار السن */}
{screen === 'bank_operation' && selectedBank && (
<div style={styles.screenWrapper}>
<div style={styles.headerBar}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => { setScreen('elderly_dashboard'); setGeneratedCode(null); setTransferAmount(''); setRecipientName(''); }}><Icons.ArrowLeft /> رجوع للوحة</button>
</div>

<div style={{ ...styles.balanceCardHeaderBox, background: currentTheme.cardBg, borderColor: '#a855f7', boxShadow: currentTheme.glow }}>
<span style={{ fontSize: '12px', color: currentTheme.textSub }}>الحساب النشط لإجراء العمليات</span>
<div style={{ fontSize: '20px', fontWeight: '900', color: currentTheme.textMain, marginTop: '4px' }}>{selectedBank.name}</div>
<div style={{ fontSize: '24px', fontWeight: '950', color: '#22c55e', marginTop: '6px' }}>{selectedBank.balance}</div>
</div>

<div style={{ ...styles.formSection, marginTop: '16px' }}>
<div style={styles.inputWrapper}>
<input type="number" placeholder="أدخل مبلغ العملية (ر.س)" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
</div>
<div style={styles.inputWrapper}>
<input type="text" placeholder="اسم المستفيد / المحول له" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
</div>

<div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }} onClick={() => alert("تمت العملية بنجاح!")}>✈️ تحويل دولي فوري</button>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={() => setGeneratedCode(`NW-${Math.floor(100000 + Math.random() * 900000)}`)}>🔑 رمز الصراف الذكي</button>
</div>

{generatedCode && (
<div style={styles.generatedCodeDisplay}>
<span style={{ fontSize: '11px', color: '#94a3b8' }}>تم توليد الكود بنجاح:</span>
<div style={styles.codeText}>{generatedCode}</div>
</div>
)}
</div>
</div>
)}

{/* 6. بوابة نَوَاءْ الجميع */}
{screen === 'everyone_dashboard' && (
<div style={styles.screenWrapper}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => setScreen('main')}><Icons.ArrowLeft /> عودة</button>
<span style={{ color: currentTheme.textMain, fontSize: '18px', fontWeight: '900' }}>مرحباً، {username || 'حصة'} 👋</span>
</div>

<div style={{ ...styles.balanceCardHeaderBox, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }}>
<div style={{ color: currentTheme.textSub, fontSize: '13px', textAlign: 'right' }}>الرصيد الإجمالي الموحد</div>
<div style={{ fontSize: '32px', fontWeight: '950', color: currentTheme.textMain, textAlign: 'center', marginTop: '6px' }}>33,100 ر.س</div>
</div>

<div style={styles.banksGrid}>
{localBanks.map(bank => (
<div key={bank.id} className="btn-active-effect glow-btn-anim" style={{ ...styles.bankGridCard, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }} onClick={() => { setSelectedBank(bank); setScreen('everyone_bank_operation'); }}>
<div style={styles.bankGridHeader}>
<span style={{ color: theme === 'dark' ? '#38bdf8' : '#a855f7', fontWeight: '900' }}>{bank.name}</span>
</div>
<div style={{ color: currentTheme.textMain, fontSize: '18px', fontWeight: '900', marginTop: '4px' }}>{bank.balance}</div>
</div>
))}
</div>

<div style={styles.tabsMenuBar}>
<button style={{ ...styles.menuTabBtn, background: everyoneActiveTab === 'analysis' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: everyoneActiveTab === 'analysis' ? '#ffffff' : currentTheme.textSub }} onClick={() => setEveryoneActiveTab('analysis')}>📊 التحليل</button>
<button style={{ ...styles.menuTabBtn, background: everyoneActiveTab === 'bills' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: everyoneActiveTab === 'bills' ? '#ffffff' : currentTheme.textSub }} onClick={() => setEveryoneActiveTab('bills')}>📑 الفواتير</button>
<button style={{ ...styles.menuTabBtn, background: everyoneActiveTab === 'codes' ? (theme === 'dark' ? '#6366f1' : '#a855f7') : 'transparent', color: everyoneActiveTab === 'codes' ? '#ffffff' : currentTheme.textSub }} onClick={() => setEveryoneActiveTab('codes')}>🔑 الأكواد</button>
</div>

<div style={{ ...styles.detailsContentBox, background: currentTheme.cardBg, borderColor: currentTheme.cardBorder, boxShadow: currentTheme.glow }}>
{everyoneActiveTab === 'bills' && (
<div>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800', display: 'block', marginBottom: '6px' }}>الفواتير المستحقة والسداد التلقائي:</span>
<div style={{ fontSize: '11px', color: currentTheme.textSub, marginBottom: '10px' }}>شركة المياه: 350 ر.س | شركة الكهرباء: 420 ر.س | الاتصالات: 150 ر.س</div>
<button className="btn-active-effect glow-btn-anim" style={styles.greenAuthorizeBtn} onClick={() => alert("تم تفعيل تفويض الوكيل وسداد فواتير منصة الجميع بنجاح!")}>تفويض الوكيل الذكي والسداد فوراً</button>
</div>
)}

{everyoneActiveTab === 'analysis' && (
<div>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800', display: 'block', marginBottom: '6px' }}>تحليل ميزانية الراتب والمصروفات:</span>
<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: currentTheme.textSub }}><span>🏠 السكن والإيجار (50%)</span><span>2,500 ر.س</span></div>
<div style={styles.barBg}><div style={{ ...styles.barFill, width: '50%', background: '#a855f7' }}></div></div>
<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: currentTheme.textSub }}><span>🛒 مصاريف المعيشة (30%)</span><span>1,500 ر.س</span></div>
<div style={styles.barBg}><div style={{ ...styles.barFill, width: '30%', background: '#f472b6' }}></div></div>
</div>
</div>
)}

{everyoneActiveTab === 'codes' && (
<div>
<span style={{ fontSize: '13px', color: currentTheme.textMain, fontWeight: '800', display: 'block', marginBottom: '8px' }}>توليد وإدارة الأكواد الذكية الفورية:</span>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, width: '100%', background: currentTheme.buttonBg }} onClick={() => setGeneratedCode(`NW-${Math.floor(100000 + Math.random() * 900000)}`)}>🆕 إنشاء كود سحب / إيداع فوري جديد</button>
{generatedCode && <div style={styles.resultCodeBox}>كود الصراف النشط للجميع: {generatedCode}</div>}
</div>
)}
</div>
</div>
)}

{/* 7. شاشة العمليات المستقلة لـ نَوَاءْ الجميع */}
{screen === 'everyone_bank_operation' && selectedBank && (
<div style={styles.screenWrapper}>
<div style={styles.headerBar}>
<button style={{ ...styles.backIconBtn, color: currentTheme.textMain }} onClick={() => { setScreen('everyone_dashboard'); setGeneratedCode(null); setTransferAmount(''); setRecipientName(''); }}><Icons.ArrowLeft /> رجوع لنَوَاء الجميع</button>
</div>

<div style={{ ...styles.balanceCardHeaderBox, background: currentTheme.cardBg, borderColor: '#a855f7', boxShadow: currentTheme.glow }}>
<span style={{ fontSize: '12px', color: currentTheme.textSub }}>الحساب النشط لإجراء العمليات</span>
<div style={{ fontSize: '20px', fontWeight: '900', color: currentTheme.textMain, marginTop: '4px' }}>{selectedBank.name}</div>
<div style={{ fontSize: '24px', fontWeight: '950', color: '#22c55e', marginTop: '6px' }}>{selectedBank.balance}</div>
</div>

<div style={{ ...styles.formSection, marginTop: '16px' }}>
<div style={styles.inputWrapper}>
<input type="number" placeholder="أدخل مبلغ العملية (ر.س)" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
</div>
<div style={styles.inputWrapper}>
<input type="text" placeholder="اسم المستخدم / المحول له" style={{ ...styles.inputField, background: currentTheme.inputBg, borderColor: currentTheme.inputBorder, color: currentTheme.textMain }} value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
</div>

<div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' }} onClick={() => {
if (!transferAmount || !recipientName) { alert("الرجاء تعبئة الحقول"); return; }
alert(`تمت الحوالة الدولية بمبلغ ${transferAmount} ر.س إلى ${recipientName}`);
}}>✈️ تحويل دولي سريع</button>

<button className="btn-active-effect glow-btn-anim" style={{ ...styles.panelActionBtn, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={() => setGeneratedCode(`NW-${Math.floor(100000 + Math.random() * 900000)}`)}>🔑 كود سحب / إيداع</button>
</div>

{generatedCode && (
<div style={styles.generatedCodeDisplay}>
<span style={{ fontSize: '11px', color: '#94a3b8' }}>تم توليد كود العملية المشع:</span>
<div style={styles.codeText}>{generatedCode}</div>
</div>
)}
</div>
</div>
)}

</div>
</div>
);
}

// التنسيقات المتوهجة بالمليمتر
const styles: Record<string, any> = {
container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', transition: 'all 0.3s ease', direction: 'rtl' },
themeToggleFab: { position: 'absolute', top: '20px', right: '20px', padding: '12px 20px', borderRadius: '30px', border: 'none', background: '#7c3aed', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)', zIndex: 100 },
phoneFrame: { position: 'relative', width: '395px', height: '844px', borderRadius: '44px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', border: '1px solid' },
phoneHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px 8px', zIndex: 30 },
notch: { width: '110px', height: '26px', background: '#000000', borderRadius: '18px' },
screenWrapper: { flex: 1, padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' },
headerBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', width: '100%' },
backIconBtn: { background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700 },
rowSpeakerBtn: { background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' },
logoSection: { alignItems: 'center', display: 'flex', flexDirection: 'column', margin: '50px 0 30px', textAlign: 'center' },
logoBox: { padding: '14px 32px', borderRadius: '24px', background: '#120721', border: '2px solid #a855f7', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotate(-4deg)', animation: 'floatLogo 4s infinite ease-in-out' },
logoTextEn: { color: '#ffffff', fontSize: '22px', fontWeight: '900', fontFamily: 'sans-serif', letterSpacing: '1.5px' },
logoTitleAr: { fontSize: '32px', fontWeight: '900', marginTop: '16px', marginBottom: 0 },
logoSubTitle: { fontSize: '12px', marginTop: '6px', fontWeight: 500 },
formSection: { display: 'flex', flexDirection: 'column', gap: '14px' },
inputWrapper: { position: 'relative', width: '100%' },
inputField: { width: '100%', padding: '16px 44px 16px 16px', borderRadius: '16px', fontSize: '14px', outline: 'none', textAlign: 'right', transition: 'all 0.3s ease' },
inputIcon: { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex' },
eyeIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex', cursor: 'pointer' },
primaryButton: { width: '100%', padding: '18px', border: 'none', borderRadius: '18px', color: '#ffffff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.2s ease' },
kpiCardInteractive: { borderRadius: '24px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', width: '100%', outline: 'none', transition: 'all 0.3s ease' },

balanceCardHeaderBox: { borderRadius: '24px', border: '1px solid', padding: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column' },
banksGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' },
bankGridCard: { borderRadius: '16px', border: '1px solid', padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer', transition: 'all 0.3s ease' },
bankGridHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' },

tabsMenuBar: { display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', padding: '4px', gap: '4px', marginBottom: '16px' },
menuTabBtn: { flex: 1, padding: '10px', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' },
detailsContentBox: { borderRadius: '22px', padding: '18px', border: '1px solid' },
greenAuthorizeBtn: { width: '100%', padding: '14px', background: '#22c55e', border: 'none', borderRadius: '14px', color: '#ffffff', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 6px 20px rgba(34, 197, 94, 0.3)', marginTop: '10px' },
panelActionBtn: { flex: 1, padding: '12px', borderRadius: '12px', border: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease' },
barBg: { width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' },
barFill: { height: '100%', borderRadius: '3px' },
resultCodeBox: { marginTop: '12px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '10px', color: '#38bdf8', fontSize: '14px', fontWeight: '900', textAlign: 'center', border: '1px solid rgba(56,189,248,0.3)' },

aiOrbWrapper: { position: 'relative', width: '140px', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
glowingAiOrb: { width: '100px', height: '100px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 5, animation: 'orbPulse 3s infinite ease-in-out' },
orbInnerCore: { width: '35px', height: '35px', borderRadius: '50%', background: '#ffffff', opacity: 0.35, filter: 'blur(3px)' },
radarPulse: { position: 'absolute', width: '140px', height: '140px', borderRadius: '50%', border: '2px solid', animation: 'radarPulse 2s infinite ease-out' },
aiResponseBox: { width: '100%', padding: '18px', borderRadius: '20px', border: '1px solid' },
suggestionBadge: { width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', fontSize: '13px', textAlign: 'right', cursor: 'pointer' },

featureListCard: { borderRadius: '20px', padding: '16px', border: '1px solid', display: 'flex', flexDirection: 'column' },
bulletList: { listStyleType: 'none', padding: 0, margin: 0, fontSize: '13px', fontWeight: '700', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' },
generatedCodeDisplay: { marginTop: '10px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(168, 85, 247, 0.25)', animation: 'fadeIn 0.25s ease' },
codeText: { fontSize: '20px', fontWeight: '950', color: '#c084fc', margin: '4px 0', letterSpacing: '2px' },

animationStyles: (
<style>{`
@keyframes floatLogo { 0%, 100% { transform: rotate(-4deg) translateY(0px); } 50% { transform: rotate(-2deg) translateY(-5px); } }
@keyframes orbPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.08); filter: brightness(1.25); } }
@keyframes radarPulse { 0% { transform: scale(0.8); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
/* تأثير الحركة والتوهج الخيالي لجميع الأزرار والبطاقات بلا استثناء */
.glow-btn-anim { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important; }
.glow-btn-anim:hover { transform: translateY(-3px) scale(1.02); filter: brightness(1.2) drop-shadow(0 0 12px rgba(168, 85, 247, 0.6)); }
.glow-btn-anim:active { transform: scale(0.96); }

.interactive-arrow-btn:hover .moving-arrow { transform: translateX(-6px); }
.moving-arrow { transition: transform 0.2s ease; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
`}</style>
)
};
