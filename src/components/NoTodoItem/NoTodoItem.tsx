const NoTodoItem = () => {
  return (
    <div className='card w-[600px] h-40 border-2 border-black p-5 flex flex-col justify-between items-center'>
      <h1 className='text-xl'>¡Oh no! No tienes tareas agregadas.</h1>
      <hr className='bg-black' />
      <h1 className='text-lg'>
        TIP: Intenta añadiendo tareas o borrando los filtros de búsqueda.
      </h1>
    </div>
  );
};

export default NoTodoItem;
