import React, { useEffect, useRef } from "react";
import { insertContentAction, removeContentAction, updateContentAction } from "../../redux/actions/content";
import { useDispatch, useSelector } from "react-redux";
import { getContent } from "../../redux/selectors/content.selector";
import { WebSocketService } from "../../service/network/webSocketService";


export default function Editor() {

    const dispatch = useDispatch();
    const content = useSelector(getContent);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        console.log("on Mount");

        const apiService = WebSocketService.getInstance();

        apiService.onmessage = function (event: MessageEvent) {
            try {
                const incomingChanges = JSON.parse(event.data);
                const cursorPosition = getCurrentCursorPosition();

                if (incomingChanges.type === "INSERT") {
                    dispatch(updateContentAction(incomingChanges.content));
                    console.log(cursorPosition, incomingChanges.index, incomingChanges.changes.length);
                    if (cursorPosition <= incomingChanges.index) {
                        udpateCursorPosition(cursorPosition);
                    } else {
                        udpateCursorPosition(cursorPosition + incomingChanges.changes.length);
                    }
                } else if (incomingChanges.type === "REMOVE") {
                    dispatch(updateContentAction(incomingChanges.content));
                    if (cursorPosition <= incomingChanges.start) {
                        udpateCursorPosition(cursorPosition);
                    } else {
                        udpateCursorPosition(cursorPosition - incomingChanges.length);
                    }
                } else {
                    console.error("Invalid type");
                }

            } catch (err) {
                console.error(err);
            }
        };

        return () => {
            console.log("on UnMount");
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        // console.log(event, value);

        if (!value && content) {
            removeText(0, content.length);
        }

        const {selectionStart, selectionEnd} = event.target;

        // @ts-ignore
        switch (event.nativeEvent.inputType) {
            case "insertFromPaste":
                console.log(selectionStart, selectionEnd);
                break;
            case "insertLineBreak":
                insertText(selectionStart - 1, "\n");
                break;
            case "deleteContentBackward":
                removeText(selectionStart, 1);
                break;
            default:
                // @ts-ignore
                insertText(selectionStart - 1, event.nativeEvent.data);
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        localStorage.setItem("cursorPosition", (textareaRef.current?.selectionStart ?? 0).toString());
    }

    // If any key was pressed when text was selected. Remove that text.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

        // @ts-ignore
        const {selectionStart: start, selectionEnd: end} = event.target;

        // console.log(event, start, end);

        if (end === start) {
            return;
        }

        removeText(start, end - start);

        if (event.key === "Backspace") {
            event.preventDefault();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        // @ts-ignore
        // console.log("handlePaste", event.target.selectionStart, event.clipboardData.getData("text"))
        // @ts-ignore
        insertText(event.target.selectionStart, event.clipboardData.getData("text"));
    }

    const insertText = (index: number, text: string) => {
        // console.warn("Inserting text at", index, text);

        const prevCursorPosition = getCurrentCursorPosition();
        if (prevCursorPosition !== index) {
            console.error("Prev position was ", prevCursorPosition, "but trying to insert at ", index);
            return;
        }

        dispatch(insertContentAction(text, index, true));
        udpateCursorPosition(index + text.length);
    }

    const removeText = (start: number, length: number) => {
        // console.warn("Removing text at", start, length);

        dispatch(removeContentAction(start, length, true));
        udpateCursorPosition(start);
    }

    const setCursorPosition = (cursorPosition: number) => {
        console.log("Setting cursor position", cursorPosition);
        textareaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
    }

    const getCurrentCursorPosition = () => parseInt(localStorage.getItem("cursorPosition") ?? "0");


    const udpateCursorPosition = (cursorPosition: number) => {
        setTimeout(() => {
            console.log("re-setting cursor");
            setCursorPosition(cursorPosition);
        }, 1);

        localStorage.setItem("cursorPosition", (cursorPosition ?? 0).toString());
    }

    const handleClick = () => {
        localStorage.setItem("cursorPosition", (textareaRef.current?.selectionStart ?? 0).toString());
    }

    return (
        <textarea
            ref={textareaRef}
            value={content}
            onPaste={handlePaste}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onClick={handleClick}
            style={{width: "90%", height: "80%", padding: "20px"}}
        />
    );
}
