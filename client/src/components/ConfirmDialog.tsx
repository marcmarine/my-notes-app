import { ReactNode, useState, MouseEventHandler } from 'react'

type ConfirmDialogType = {
  children: (confirm: (callback: () => void) => void) => ReactNode
}

function ConfirmDialog({ children }: ConfirmDialogType) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [callback, setCallback] = useState<
    MouseEventHandler<HTMLButtonElement> | undefined
  >(undefined)

  function confirm(callback: () => void) {
    setCallback(() => callback)
    setIsOpen(true)
  }

  function cancel() {
    setIsOpen(false)
    setCallback(undefined)
  }

  return (
    <>
      {children(confirm)}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 p-1 w-64 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-4xl shadow-md">
          <h2 className="p-5 mb-5">Please, confirm this action</h2>
          <div className="flex justify-between">
            <button
              onClick={cancel}
              className="w-16 h-16 m-2 grid place-content-center text-center opacity-20 hover:opacity-100 rounded-full transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={callback}
              className="w-16 h-16 m-2 grid place-content-center text-center bg-red-500 text-white rounded-4xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmDialog
