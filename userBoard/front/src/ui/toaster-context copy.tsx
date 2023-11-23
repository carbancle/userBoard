import React, { useState } from 'react'
import Toaster from '../components/ui/Toaster'

type ToasterInfo = {
  text: string,
  type: string
}

interface ToasterCtx {
  toasts: ToasterInfo[],
  getToasts: (text: ToasterInfo) => void
}

const ToasterContext = React.createContext<ToasterCtx>({
  toasts: [],
  getToasts: () => { }
})

function ToasterContextProvider(props: any) {
  const [toasts, setToasts] = useState<ToasterInfo[]>([]);

  const getToastHandler = (text: ToasterInfo) => {
    console.log("toast값 확인: " + text.text + " " + text.type);

    setToasts((prevToasts: any) => [text, ...prevToasts]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(0, prevToasts.length - 1))
    }, 3000)
  }

  const contextValue: ToasterCtx = {
    toasts,
    getToasts: getToastHandler
  }

  return (
    <ToasterContext.Provider value={contextValue}>
      <>
        {props.children}
        <Toaster toasts={toasts} />
      </>
    </ToasterContext.Provider>
  )
}

export { ToasterContextProvider }

export default ToasterContext;