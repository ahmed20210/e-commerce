<ul className="my-5 md:my-0 md:w-9/12 flex flex-wrap justify-evenly gap-4 text-gray-700">
  {cart.cartItems.products.map((item, index) => (
    <li
      key={index}
      className="border py-3 lg:w-3/13 sm:w-5/13 rounded-md flex gap-4 flex-col justify-center items-center"
    >
      <div className="">
        <Image
          src={item.product.image}
          className="border"
          width={80}
          height={80}
          layout="fixed"
          alt={item.product.name}
        />
      </div>
      <div className="text-sm">
        <span>{item.product.name}</span>
      </div>
      <div className="w-10/12">
        <div className="flex justify-between w-full">
          <span> price:</span>
          <span> ${item.product.price}.00</span>
        </div>
        <div className="flex justify-between">
          <span>subtotal: </span>
          <span>${item.price}.00</span>
        </div>
      </div>

      <div className="mx-1">
        <button
          onClick={() => {
            dispatch(removeFromCart(item.product._id));
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 mx-2 rounded-full"
        >
          <AiFillDelete />
        </button>
        <input
          type=""
          className="w-9 mx-2 focus:outline-none border px-2 py-1 rounded-md"
          placeholder={item.quantity}
        />
        <input
          className=" text-white bg-primary border px-2 py-1 rounded-md"
          onClick={(e) => {
            e.preventDefault();
            const val = parseInt(e.target.parentElement.children[0].value);
            val > 0 || val.toString() != "NaN"
              ? dispatch(changeCart({ id: item.product._id, quantity: val }))
              : null;
          }}
          type="submit"
          value={"update cart"}
        />
      </div>
    </li>
  ))}
</ul>;
