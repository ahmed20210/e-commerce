import React from 'react'

function Errorc({ error }) {
  return (
    <div>
      <p className={`bg-red-200 rounded-2xl px-3 py-1 font-medium`}>
        <span className="bg-white px-2 pb-1 mr-3 text-red-700  rounded-full">
          x
        </span>
        {error}
      </p>
    </div>
  );
}

export default Errorc