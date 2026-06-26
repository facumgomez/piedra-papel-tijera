import { useState } from 'react';
import { type Jugada, type Resultado, determinarGanador, jugadaComputadora } from './gameLogic';

// Íconos de las jugadas
const IconRock = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 3L20 8.5L16 20H7.5L3 13.5L8 4L14.5 3Z" />
  </svg>
);

const IconPaper = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M14 3v4h4M8 10h8M8 14h8M8 18h4" />
  </svg>
);

const IconScissors = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
  </svg>
);

// Íconos para el Modo Claro / Oscuro
const IconSun = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const IconMoon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const getIcon = (jugada: Jugada, className: string) => {
  if (jugada === 'piedra') return <IconRock className={className} />;
  if (jugada === 'papel') return <IconPaper className={className} />;
  return <IconScissors className={className} />;
};

function App() {
  const [eleccionJugador, setEleccionJugador] = useState<Jugada | null>(null);
  const [eleccionPC, setEleccionPC] = useState<Jugada | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [puntaje, setPuntaje] = useState({ jugador: 0, pc: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);

  const jugar = (jugada: Jugada) => {
    const pc = jugadaComputadora();
    const res = determinarGanador(jugada, pc);
    setEleccionJugador(jugada);
    setEleccionPC(pc);
    setResultado(res);
    if (res === 'ganaste') setPuntaje((prev) => ({ ...prev, jugador: prev.jugador + 1 }));
    else if (res === 'perdiste') setPuntaje((prev) => ({ ...prev, pc: prev.pc + 1 }));
  };

  const reiniciarRonda = () => {
    setEleccionJugador(null);
    setEleccionPC(null);
    setResultado(null);
  };

  return (
    // El div principal controla el tema aplicando la clase "dark"
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen font-sans transition-colors duration-300`}>
      {/* Fondo y texto general que responde al tema */}
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 transition-colors duration-300">
        
        <div className="w-full max-w-3xl flex flex-col gap-8">
          
          {/* Header / Marcador */}
          <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
            <div>
              <h1 className="text-xl font-bold tracking-tight">Piedra, Papel o Tijera</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Juego Clásico</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Botón para alternar tema */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
                title="Cambiar tema"
              >
                {isDarkMode ? <IconSun /> : <IconMoon />}
              </button>

              <div className="flex gap-6 text-right border-l border-zinc-200 dark:border-zinc-800 pl-6 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">Tú</span>
                  <span className="text-2xl font-bold leading-none">{puntaje.jugador}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">PC</span>
                  <span className="text-2xl font-bold leading-none">{puntaje.pc}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Zona de Juego Principal */}
          <main className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none rounded-xl p-8 min-h-[320px] flex flex-col justify-center relative transition-colors">
            
            {!eleccionJugador ? (
              <div className="flex flex-col items-center gap-8">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Elige tu jugada:</p>
                <div className="flex gap-4">
                  {(['piedra', 'papel', 'tijera'] as Jugada[]).map((opcion) => (
                    <button
                      key={opcion}
                      onClick={() => jugar(opcion)}
                      className="flex flex-col items-center gap-3 w-28 py-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 rounded-lg transition-all hover:-translate-y-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-sm"
                    >
                      {getIcon(opcion, "w-8 h-8")}
                      <span className="text-xs uppercase tracking-widest font-bold">{opcion}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-200">
                
                <div className="flex w-full justify-between items-center px-4 md:px-12 mb-10">
                  {/* Elección Usuario */}
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">Tú</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                      {getIcon(eleccionJugador, "w-10 h-10 md:w-12 md:h-12")}
                    </div>
                  </div>

                  {/* VS y Resultado */}
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600">VS</span>
                    <span className={`text-lg md:text-xl font-black uppercase tracking-widest ${
                      resultado === 'ganaste' ? 'text-emerald-500' : 
                      resultado === 'perdiste' ? 'text-rose-500' : 'text-amber-500'
                    }`}>
                      {resultado === 'empate' ? 'Empate' : resultado}
                    </span>
                  </div>

                  {/* Elección PC */}
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-bold">PC</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                      {getIcon(eleccionPC!, "w-10 h-10 md:w-12 md:h-12")}
                    </div>
                  </div>
                </div>

                <button
                  onClick={reiniciarRonda}
                  className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors shadow-md"
                >
                  Nueva Ronda
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;