export interface PanelTemplateParams {
	right: number;
	left: number;
	top: number;
	midLeft: number;
}

export class AnimationHelper {
	public static getPanelTemplateParams(
		isWidthOver: boolean
	): PanelTemplateParams {
		return isWidthOver
			? { right: 5, left: 60, midLeft: 40, top: 0 }
			: { right: 0, left: 0, midLeft: 0, top: 1 };
	}
}
