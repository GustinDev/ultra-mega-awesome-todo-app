const NoTodoItem = () => {
  return (
    <div className='card w-full   xl:w-8/12 2xl:w-6/12 h-fit border-2 border-customBlue4 bg-white rounded-lg bg-whi p-5 flex flex-col justify-between items-center'>
      <h1 className='text-2xl font-bold'>
        ¡Oh no! No tienes tareas agregadas.
      </h1>

      <hr className='bg-black' />
      <h1 className='text-lg'>
        <span className='font-bold'>Tip:</span> Intenta añadiendo tareas o
        borrando los filtros de búsqueda.
      </h1>
    </div>
  );
};

export default NoTodoItem;
