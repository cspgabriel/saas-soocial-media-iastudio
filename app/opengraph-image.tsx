import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#020617',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          fontFamily: 'Arial',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 }}>
          <div style={{ width: 70, height: 70, borderRadius: 14, background: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 900 }}>S</div>
          <div style={{ fontSize: 38, fontWeight: 900 }}>SocialOS</div>
        </div>
        <div style={{ fontSize: 76, lineHeight: 0.98, fontWeight: 900, maxWidth: 900 }}>
          A operação que faz o cliente sentir que você vale mais
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: '#CBD5E1', maxWidth: 880 }}>
          Briefing, calendário, IA, aprovação e relatório sem improviso.
        </div>
      </div>
    ),
    { ...size }
  );
}
