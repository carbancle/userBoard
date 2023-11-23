import React from 'react'

function Toaster({ toasts }: any) {
  return (
    <>
      {toasts.map((toast: any) =>
        <>
          <div>{toast.text}</div>
          <div>{toast.type}</div>
        </>
      )}
    </>
  )
}

export default Toaster