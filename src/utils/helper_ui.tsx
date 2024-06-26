import React from "react"
import { ReactNode } from "react"
import { Message, Tooltip, Whisper, toaster } from "rsuite"
import { TypeAttributes } from "rsuite/esm/internals/types"


export const successToast = (msg: string) => {
    toaster.push(<Message showIcon type={"success"} closable>
        {msg}
    </Message>, { placement: "bottomStart", duration: 3000 })
}
export const setError = (msg: string) => {
    toaster.push(<Message showIcon type={"error"} closable>
        {msg}
    </Message>, { placement: "bottomStart", duration: 3000 })
}
export const toolTip = (msg: string, children: ReactNode, placement?: TypeAttributes.Placement | "bottomStart") => (<Whisper placement={placement} followCursor speaker={<Tooltip>{msg}</Tooltip>}>
    <div className="flex justify-center">
        {children}
    </div>
</Whisper>)

