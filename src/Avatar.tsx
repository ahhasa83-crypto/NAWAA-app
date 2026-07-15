import React from 'react';

interface AvatarProps {
  isSpeaking: boolean;
}

export default function Avatar({ isSpeaking }: AvatarProps) {
  return (
    <div style={styles.floatingContainer}>
      <div style={styles.avatarWrapper}>
        {/* هالة الضوء الدائرية خلف المرشد */}
        <div
          style={{
            ...styles.glowingRing,
            boxShadow: isSpeaking
              ? '0 0 25px rgba(6, 182, 212, 0.8), inset 0 0 15px rgba(6, 182, 212, 0.4)'
              : '0 0 15px rgba(139, 92, 246, 0.4)',
          }}
        ></div>

        {/* جسم الأفاتار الذكي المضيء */}
        <div
          style={{
            ...styles.avatarBody,
            animation: isSpeaking
              ? 'pulseSpeak 0.5s infinite alternate'
              : 'hoverIdle 4s infinite ease-in-out',
          }}
        >
          {/* تصميم العينين التفاعلي */}
          <div style={styles.eyesRow}>
            <div style={styles.eye}>
              <div style={styles.pupil}></div>
            </div>
            <div style={styles.eye}>
              <div style={styles.pupil}></div>
            </div>
          </div>
          {/* تصميم الفم المتفاعل والناطق مع إشارة الصوت الفعلي */}
          <div
            style={{
              ...styles.mouth,
              height: isSpeaking ? '14px' : '3px',
              borderRadius: isSpeaking ? '50%' : '2px',
              background: isSpeaking ? '#06b6d4' : '#a78bfa',
            }}
          ></div>
        </div>
      </div>
      <span style={styles.tooltipText}>
        {isSpeaking ? 'أنا أتحدث...' : 'مرحباً بك'}
      </span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  floatingContainer: {
    position: 'absolute',
    bottom: '30px',
    left: '25px', // مثبت في الزاوية السفلى بشكل مستقل وجذاب
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 100,
    cursor: 'pointer',
  },
  avatarWrapper: {
    position: 'relative',
    width: '65px',
    height: '65px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowingRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'rgba(15, 10, 30, 0.6)',
    border: '1.5px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.3s ease',
  },
  avatarBody: {
    position: 'relative',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
    border: '2px solid #06b6d4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
  },
  eyesRow: {
    display: 'flex',
    gap: '8px',
  },
  eye: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pupil: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#06b6d4',
  },
  mouth: {
    width: '12px',
    transition: 'all 0.1s ease',
  },
  tooltipText: {
    fontSize: '10px',
    color: '#a78bfa',
    marginTop: '6px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
};

// إضافة الحركات الانسيابية بالـ CSS داخل الملف
const injectGlobalStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
@keyframes hoverIdle {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-6px); }
}
@keyframes pulseSpeak {
0% { transform: scale(1); }
100% { transform: scale(1.08); }
}
@keyframes float {
0% { transform: translate(0, 0) scale(1); }
100% { transform: translate(15px, -15px) scale(1.05); }
}
`;
  document.head.appendChild(style);
};
injectGlobalStyles();
