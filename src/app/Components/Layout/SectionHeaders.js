export default function SectionHeaders({subHeader, mainHeader}){
    return (
      <>
        <h3 className="uppercase text-gray-600 font-semibold">{subHeader}</h3>
        <h2 className="text-primary font-bold text-4xl leading-6 italic">{mainHeader}</h2>
      </>
    )
}