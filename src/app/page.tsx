import Card from './Components/Card';

const cards = ['black', 'blue', 'pink', 'black', 'blue', 'pink'];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-600">
      <div className="relative flex items-center justify-center drop-shadow-2xl">
        {cards.map((card: string, index: number) => {
          return (
            <div key={index} className="absolute" style={{ zIndex: index }}>
              <Card fileName={card} src={`/${card}.png`} alt={card} height={600} width={600} index={index} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
