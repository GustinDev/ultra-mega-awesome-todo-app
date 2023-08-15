const NoTodoItem = () => {
  return (
    <div className='card w-80 h-80 border-2 border-black p-5'>
      <h1 className='text-xl'>
        No tienes tareas agregadas (con estas características).
      </h1>
      <hr />
      <h1 className='text-xl'>
        Intenta añadiendo tareas o borrando los filtros de búsqueda.
      </h1>
    </div>
  );
};

export default NoTodoItem;
