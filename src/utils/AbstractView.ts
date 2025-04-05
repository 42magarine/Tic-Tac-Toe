import { TemplateEngine } from "./TemplateEngine.js"

export default abstract class AbstractView {
	protected params: URLSearchParams;
	protected title: string;
	protected description: string;
	protected templateEngine: TemplateEngine;
	protected props: Record<string, any>;

	constructor(params: URLSearchParams = new URLSearchParams(window.location.search)) {
		this.params = params;
		this.title = 'Transcendence';
		this.description = '';
		this.templateEngine = new TemplateEngine();
		this.props = {};
		this.setTitle(this.title);
		this.setDescription(this.description);
	}

	setTitle(title: string): void {
		document.title = title;
		const metaTitle = document.querySelector('meta[name="title"]');
		if (metaTitle) {
			metaTitle.setAttribute('content', title);
		}
	}

	setDescription(description: string): void {
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute('content', description);
		} else if (description) {
			const meta = document.createElement('meta');
			meta.name = 'description';
			meta.content = description;
			document.head.appendChild(meta);
		}
	}

	async render(template: string, data: any = {}): Promise<string> {
		// Merge props with data
		const mergedData = { ...data, props: this.props };
		return this.templateEngine.render(template, mergedData);
	}

	abstract getHtml(): Promise<string>;

	async afterRender(): Promise<void> { }

	destroy(): void { }
}