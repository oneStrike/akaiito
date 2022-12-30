import {
	ChangeCase,
	defineConfig,
	ExtendedInterface,
} from "yapi-to-typescript";

export default defineConfig([
	{
		serverType: "yapi",
		serverUrl: "https://yapi.pro",
		typesOnly: true,
		target: "typescript",
		reactHooks: {
			enabled: false,
		},
		prodEnvName: "production",
		dataKey: "data",
		projects: [
			{
				token:
					"2d44db9ad41cf8c08cce231db299bd5932a2bfa74f81d2c7fee36cae11b2704c",
				categories: [
					{
						id: [95677, 95686, 95683, 98707, 105156, 106326, 106721],
					},
				],
			},
			{
				token:
					"63d1121ca938c711852dd06cba1fca708f2343ca7f68be8a1ff79add4eb45466",
				categories: [
					{
						id: [77158],
					},
				],
			},
			{
				token:
					"a8e51243c00dc755e86b751f72e353d77042ff113971191919a9498d78e67185",
				categories: [
					{
						id: [112300],
					},
				],
			},
		],
		outputFilePath: (interfaceInfo, changeCase) => {
			const pathArr = interfaceInfo.path.split("/");
			const filePathArr = pathArr.slice(-2);
			const filePath = filePathArr
				.map((item) => changeCase.camelCase(item))
				.join("/");
			return `src/httpTypes/${pathArr[1]}/${filePath}.ts`;
		},
		getRequestDataTypeName: (interfaceInfo, changeCase) => {
			return `${genApiInterfaceName(interfaceInfo, changeCase)}Req`;
		},
		getResponseDataTypeName: (interfaceInfo, changeCase) => {
			return `${genApiInterfaceName(interfaceInfo, changeCase)}Res`;
		},
	},
]);

function genApiInterfaceName(
	interfaceInfo: ExtendedInterface,
	changeCase: ChangeCase
) {
	// 取解析路径dir最尾部的路径作为前缀路径
	const typePath = interfaceInfo.parsedPath.dir.split("/")[1] || "";
	// 拼接前缀路径+文件名称
	return `${changeCase.pascalCase(typePath)}${changeCase.pascalCase(
		interfaceInfo.parsedPath.name
	)}`;
}
