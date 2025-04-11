import HomepageHero from "../components/HomepageHero";

export default function Home() {
  return (
    <main className="p-6 space-y-10">
      <HomepageHero />

      {/* Em breve: seção de produtos em destaque */}
      <section className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Produtos em Destaque</h2>
        <p className="text-gray-600">Em breve você verá aqui os melhores eletrônicos disponíveis!</p>
      </section>
    </main>
  );
}
