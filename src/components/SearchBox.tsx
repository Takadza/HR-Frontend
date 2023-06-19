export function SearchBox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="m-[2px] flex flex-row items-center border-b-2 border-b-blue-600">
      <div className="pointer-events-none flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        className={`text-black grow rounded-none bg-transparent px-3 py-2 font-semibold focus:outline-none`}
        {...props}
      />
    </div>
  );
}
