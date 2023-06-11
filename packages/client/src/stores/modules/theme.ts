import { ColorScheme, FontColorScheme } from "@/typings/store/theme";

export const themeStore = defineStore("theme", {
	state() {
		return {
			colorScheme: {
				primary: "#ff5844",
				light: "#f7dee3",
				success: "#18a058",
				warning: "#f0a020",
				error: "#d03050",
				gray: "#f2f3f5",
				white: "#FFFFFF",
				transparent: "transparent"
			} as ColorScheme,
			fontColorScheme: {
				color1: "#18191C",
				color2: "#61666D",
				color3: "#9499A0"
			} as FontColorScheme
		};
	},

	getters: {},

	actions: {

		setColorScheme(color: ColorScheme) {
			this.colorScheme = color;
		},

		getThemeStyle(type: keyof ColorScheme) {
			let fontColor = "#ffffff";
			if (type === "transparent" || type === "gray" || type === "white") {
				fontColor = this.fontColorScheme.color1;
			}
			return { color: fontColor, backgroundColor: this.colorScheme[type] };
		}
	}
});