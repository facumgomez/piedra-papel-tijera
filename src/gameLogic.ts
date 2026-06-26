export type Jugada = 'piedra' | 'papel' | 'tijera';
export type Resultado = 'ganaste' | 'perdiste' | 'empate';

const reglas: Record<Jugada, Jugada> = {
  piedra: 'tijera',
  papel: 'piedra',
  tijera: 'papel',
};

export const determinarGanador = (jugador: Jugada, computadora: Jugada): Resultado => {
  if (jugador === computadora) return 'empate';
  if (reglas[jugador] === computadora) return 'ganaste';
  return 'perdiste';
};

export const jugadaComputadora = (): Jugada => {
  const opciones: Jugada[] = ['piedra', 'papel', 'tijera'];
  const indiceAleatorio = Math.floor(Math.random() * opciones.length);
  return opciones[indiceAleatorio];
};