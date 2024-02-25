function TaskItem({ task }) {
  const {name, notes, dueDate} = task;

  console.log(name, notes, dueDate)

  function handleIsComplete(){

  }

  return (
    <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          <a className="w-8 h-8 rounded-full" onClick={handleIsComplete()}>√</a>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {notes}
            </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          {dueDate}
        </div>
      </div>
    </li>
    )
  }
  
  export default TaskItem;