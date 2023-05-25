import type {
	CheckboxProps,
	ColorPickerProps,
	DatePickerProps,
	FormItemProps,
	InputNumberProps,
	InputProps,
	RadioProps,
	SelectProps,
	TimeProps
} from "naive-ui";
// @ts-ignore
import type { BasicUploadProps } from "@/components/basic/BasicUpload.vue";

export type BasicFormComponent =
	| "Input"
	| "InputNumber"
	| "Textarea"
	| "Select"
	| "Radio"
	| "Checkbox"
	| "Date"
	| "Time"
	| "Upload"
	| "Color"
	| "Editor"

export type CustomMultipleProps = {
	transform?: boolean
	valueType: "number" | "string"
}

export type SharedSelectProps = SelectProps & CustomMultipleProps
export type SharedCheckboxProps = CheckboxProps & CustomMultipleProps

export type BasicFormComponentPropsBind =
	| InputProps
	| InputNumberProps
	| SharedSelectProps
	| RadioProps
	| SharedCheckboxProps
	| DatePickerProps
	| TimeProps
	| ColorPickerProps
	| BasicUploadProps

export interface SelectOptions {
	label: string;
	value: string | number;
	disabled?: boolean;
}

export interface BasicFormOptions {
	sectionTitle?: string,
	sectionTips?: string,
	bind: FormItemProps & { width?: number; prompt?: string }
	component: BasicFormComponent
	componentProps: {
		bind: BasicFormComponentPropsBind
		options?: SelectOptions[]
	}
}

export type BasicFormValidateRes = {
	values: any
	errors:
		| null
		| {
		message?: string
		fieldValue?: any
		field?: string
	}[][]
}

export interface BasicFormInst {
	validate: () => Promise<BasicFormValidateRes>;
	reset: () => void;
}
