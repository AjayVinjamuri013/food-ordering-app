export default function MenuItem(){
    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-2xl hover:shadow-black/50 transition-all">
          <div className="text-center">
            <img src="/pizza.png" className="max-h-24 block mx-auto" alt="pizza"/>
          </div>
          <h4 className="font-semibold text-xl my-2">Pepperoni Pizza</h4>
          <p className="text-gray-500 text-sm">
            bla bla blaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
          <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
            Add to Cart $11
          </button>
        </div>
    )
}