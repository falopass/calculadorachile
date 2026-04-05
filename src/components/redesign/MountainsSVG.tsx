export default function MountainsSVG() {
  return (
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
        </linearGradient>
        
        <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
        </linearGradient>
        
        <linearGradient id="mountainGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Capa de montañas más distantes */}
      <path
        d="M0,450 C100,420 200,400 300,420 C400,440 500,400 600,430 C700,460 800,410 900,440 C1000,470 1100,430 1200,460 C1300,490 1400,450 1440,470 L1440,600 L0,600 Z"
        fill="url(#mountainGradient3)"
      />
      
      {/* Capa intermedia de montañas */}
      <path
        d="M0,400 C100,350 200,320 300,340 C400,360 500,310 600,350 C700,390 800,330 900,360 C1000,390 1100,340 1200,370 C1300,400 1400,350 1440,380 L1440,600 L0,600 Z"
        fill="url(#mountainGradient2)"
      />
      
      {/* Silueta principal de montañas chilenas - Los Andes */}
      <path
        d="M0,380 C50,340 100,300 150,320 C200,340 250,280 300,300 C350,320 400,260 450,290 C500,320 550,270 600,300 C650,330 700,270 750,300 C800,330 850,260 900,290 C950,320 1000,260 1050,290 C1100,320 1150,260 1200,290 C1250,320 1300,270 1350,300 C1400,330 1440,280 1440,310 L1440,600 L0,600 Z"
        fill="url(#mountainGradient1)"
      />
      
      {/* Detalles de nieve en cimas más prominentes */}
      <path d="M150,320 L165,300 L180,320 Z" fill="url(#snowGradient)" />
      <path d="M300,300 L315,280 L330,300 Z" fill="url(#snowGradient)" />
      <path d="M450,290 L465,270 L480,290 Z" fill="url(#snowGradient)" />
      <path d="M600,300 L615,280 L630,300 Z" fill="url(#snowGradient)" />
      <path d="M750,300 L765,280 L780,300 Z" fill="url(#snowGradient)" />
      <path d="M900,290 L915,270 L930,290 Z" fill="url(#snowGradient)" />
      <path d="M1050,290 L1065,270 L1080,290 Z" fill="url(#snowGradient)" />
      <path d="M1200,290 L1215,270 L1230,290 Z" fill="url(#snowGradient)" />
      <path d="M1350,300 L1365,280 L1380,300 Z" fill="url(#snowGradient)" />
      
      {/* Efecto de estrellas sutiles */}
      <circle cx="100" cy="50" r="1" fill="#F8FAFC" opacity="0.3" />
      <circle cx="200" cy="80" r="1.5" fill="#F8FAFC" opacity="0.4" />
      <circle cx="350" cy="30" r="1" fill="#F8FAFC" opacity="0.3" />
      <circle cx="500" cy="60" r="1.5" fill="#F8FAFC" opacity="0.5" />
      <circle cx="650" cy="40" r="1" fill="#F8FAFC" opacity="0.3" />
      <circle cx="800" cy="70" r="1.5" fill="#F8FAFC" opacity="0.4" />
      <circle cx="950" cy="25" r="1" fill="#F8FAFC" opacity="0.3" />
      <circle cx="1100" cy="55" r="1.5" fill="#F8FAFC" opacity="0.5" />
      <circle cx="1250" cy="35" r="1" fill="#F8FAFC" opacity="0.3" />
      <circle cx="1400" cy="65" r="1.5" fill="#F8FAFC" opacity="0.4" />
    </svg>
  );
}