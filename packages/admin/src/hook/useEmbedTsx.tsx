/*
 * 和业务逻辑契合
 * */

import {
	type DropdownProps,
	type PopconfirmProps,
	type ButtonProps,
	NDropdown,
	NSpace,
	NPopconfirm,
	NButton
} from "naive-ui";

interface UseTableBasicButtonsOptions<T> {
	text: string;
	fold?: boolean;
	tipField?: keyof T;
	disabled?: boolean;
	btnProps?: ButtonProps;
	foldProps?: DropdownProps;
	poConfirmProps?: PopconfirmProps;
	event?: (params: T) => void | Promise<void>;
	confirm?: (params: T) => void | Promise<void>;
	cancel?: (params: T) => void | Promise<void>;
}

type UseTableBasicButtonsParams<T> = {
	source: T
	options: UseTableBasicButtonsOptions<T>[]
	disabled?: boolean
}

type UseTableBasicButtons = <T>(
	options: UseTableBasicButtonsParams<T>
) => JSX.Element

//表格操作，可以包含按钮、弹窗确认框、下拉菜单
export const useTableBasicButtons: UseTableBasicButtons = ({
																														 source,
																														 options,
																														 disabled
																													 }) => {
	return (
		<NSpace wrap={false} justify={"center"}>
			{{
				default: () =>
					options.map((item) => {
						if (item.fold) {
							return (
								<NDropdown
									{...item.foldProps}
									disabled={item.disabled ?? disabled}
								>
									<span class="cursor_pointer">{item.text}</span>
								</NDropdown>
							);
						} else if (item.tipField) {
							return (
								<NPopconfirm
									{...item.poConfirmProps}
									disabled={item.disabled ?? disabled}
									onPositiveClick={() => item.confirm && item.confirm(source)}
									onNegativeClick={() => item.cancel && item.cancel(source)}
								>
									{{
										trigger: () => (
											<NButton
												type={item.btnProps?.type || "error"}
												size={item.btnProps?.size || "tiny"}
												secondary
												disabled={item.disabled ?? disabled}
											>
												{{ default: () => item.text }}
											</NButton>
										),
										default: () =>
											`是否${item.text}【${source[item.tipField!]}】？`
									}}
								</NPopconfirm>
							);
						} else {
							return (
								<NButton
									{...item.btnProps}
									size={item.btnProps?.size || "tiny"}
									type={item.btnProps?.type || "primary"}
									disabled={item.disabled ?? disabled}
									onClick={useDebounceFn(
										() => item.event && item.event(source)
									)}
								>
									{{ default: () => item.text }}
								</NButton>
							);
						}
					})
			}}
		</NSpace>
	);
};
