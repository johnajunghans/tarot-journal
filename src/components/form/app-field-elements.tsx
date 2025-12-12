import { ReactElement, ReactNode, forwardRef, useState } from "react"
import * as React from "react"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ControllerFieldState } from "react-hook-form"


export function FieldElementWrapper({
    id,
    children,
    label,
    description,
    error=null,
    className,
    fieldState
}: {
    id: string
    children: ReactElement
    label: string
    description?: string
    error?: string | null,
    className?: string,
    fieldState: ControllerFieldState
}) {
    return (
        <Field
            id={`${id}-container`}
            className={`
                relative text-foreground/50 border-foreground/15 focus-within:border-foreground/30 data-[invalid=true]:border-destructive/50 focus-within:text-foreground has-data-[state=open]:text-foreground
                ${className}
                `}
            data-invalid={fieldState.invalid || error}
        >
            <FieldLabel
                htmlFor={id}
                className="absolute left-4 -top-2 text-inherit bg-background w-auto inline-block !w-fit px-1 text-xs"    
            >{label.toUpperCase()}</FieldLabel>
            {  children }
            {description && <FieldDescription>{description}</FieldDescription>}
            {error && <FieldError >{error}</FieldError>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field> 
    )
}

export const AppInput = forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input"> & {
        label: string
        charLimit?: number
        fieldState: ControllerFieldState
    }
>(({
    id,
    value,
    label,
    charLimit,
    className,
    fieldState,
    ...inputProps
}, ref) => {
    const [error, setError] = useState<string | null>(null)
    const valueLength = typeof value === 'string' ? value.length : 0
    
    if (charLimit && typeof value === 'string' && (value.length > charLimit)) {
        if (!error) setError("Character length exceeded")
    } else {
        if (error) setError(null)
    }

    return (
        <FieldElementWrapper
            id={id || ''}
            label={label}
            error={error}
            fieldState={fieldState}
        >
            <>
            <Input 
                ref={ref}
                id={id} 
                value={value}
                className={`border border-inherit rounded-sm h-14 text-foreground !text-lg font-mono focus-within:shadow-sm ${className || ""}`}
                {...inputProps}
            />
            {charLimit && <span className="absolute right-4 top-[47px] px-1 text-xs bg-background !w-fit">{`${valueLength}/${charLimit}`}</span>}
            </>
        </FieldElementWrapper>
    )
})

AppInput.displayName = "AppInput"

export const AppTextarea = forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<"textarea"> & {
        label: string
        charLimit?: number
        fieldState: ControllerFieldState
    }
>(({
    id,
    value,
    label,
    charLimit,
    className,
    fieldState,
    ...textareaProps
}, ref) => {
    const [error, setError] = useState<string | null>(null)
    const valueLength = typeof value === 'string' ? value.length : 0
    
    if (charLimit && typeof value === 'string' && (value.length > charLimit)) {
        if (!error) setError("Character length exceeded")
    } else {
        if (error) setError(null)
    }

    return (
        <FieldElementWrapper
            id={id || ''}
            label={label}
            error={error}
            fieldState={fieldState}
        >
            <>
            <Textarea
                ref={ref}
                id={id} 
                value={value}
                className={`border border-inherit rounded-sm min-h-48 text-foreground font-mono focus-within:shadow-sm ${className || ""}`}
                {...textareaProps}
            />
            {charLimit && <span className={`absolute right-4 ${error ? "bottom-[25px]" : "-bottom-[7px]"} px-1 text-xs bg-background !w-fit`}>{`${valueLength}/${charLimit}`}</span>}
            </>
        </FieldElementWrapper>
    ) 
})

AppTextarea.displayName = "AppTextarea"

export const AppSelect = forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    React.ComponentProps<typeof SelectPrimitive.Root> & {
        id: string
        label: string
        fieldState: ControllerFieldState
        children: ReactNode
        triggerStyles?: string
        placeholder?: string
    }
>(({
    id,
    value,
    onValueChange,
    children,
    label,
    fieldState,
    triggerStyles,
    placeholder = "Select an option",
    ...selectProps
}, ref) => {
    return (
        <FieldElementWrapper
            id={id}
            label={label}
            fieldState={fieldState}
        >
            <Select
                value={value}
                onValueChange={onValueChange}
                {...selectProps}
            >
                <SelectTrigger 
                    ref={ref}
                    id={id} 
                    className={`peer focus-within:shadow-sm border border-inherit data-[state=open]:shadow-sm data-[state=open]:text-foreground data-[state=open]:border-foreground/30 shadow-none ${triggerStyles || ""}`}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    { children }
                </SelectContent>
            </Select>
        </FieldElementWrapper>
    )
})

AppSelect.displayName = "AppSelect"