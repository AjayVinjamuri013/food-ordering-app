import Header from "./Components/Layout/Header";
import Hero from "./Components/Layout/Hero";
import HomeMenu from "./Components/Layout/HomeMenu";
import SectionHeaders from "./Components/Layout/SectionHeaders";

export default function Home() {
  return (
  <>
    <Header/>
    <Hero />
    <HomeMenu />
    <section className="text-center my-16">
      <SectionHeaders subHeader={"Our story"} mainHeader={"About us"}></SectionHeaders>
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>Bla Bla blaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        <p>Bla Bla blaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>    
    </section>
    <section className="text-center my-8">
      <SectionHeaders subHeader={"Don\'t hesitate"} mainHeader={'Contact us'} />
      <div className="mt-8">
        <a className="text-2xl" href="tel:+1234567890">+1 (234)567-8910</a>
      </div>
    </section>
  </>
  );
}
